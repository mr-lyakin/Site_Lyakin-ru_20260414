import crypto from "crypto";
import { cookies, headers } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/**
 * Cookie с флагом Secure не работает по HTTP: браузер не сохранит/не отправит её.
 * В production за nginx нужен X-Forwarded-Proto (обычно уже есть).
 * Явно: ADMIN_COOKIE_SECURE=1 или ADMIN_COOKIE_INSECURE=1.
 */
async function shouldUseSecureSessionCookie(): Promise<boolean> {
  if (process.env.ADMIN_COOKIE_INSECURE === "1") return false;
  if (process.env.ADMIN_COOKIE_SECURE === "1") return true;

  const h = await headers();
  const forwarded = h.get("x-forwarded-proto");
  if (forwarded) {
    return forwarded.split(",")[0].trim().toLowerCase() === "https";
  }

  if (process.env.NODE_ENV !== "production") return false;

  // Прод без прокси-заголовка (например прямой HTTP на IP) — только не-Secure cookie
  return false;
}

type SessionPayload = {
  sub: "admin";
  exp: number;
};

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function encode(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
}

function decode(tokenPart: string): SessionPayload | null {
  try {
    const raw = Buffer.from(tokenPart, "base64url").toString("utf-8");
    return JSON.parse(raw) as SessionPayload;
  } catch {
    return null;
  }
}

export function isSessionConfigValid() {
  return getSessionSecret().length >= 24;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const secret = getSessionSecret();
  const payload: SessionPayload = {
    sub: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const payloadEncoded = encode(payload);
  const signature = sign(payloadEncoded, secret);
  const token = `${payloadEncoded}.${signature}`;

  const secure = await shouldUseSecureSessionCookie();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function verifySessionToken(token: string | undefined) {
  const secret = getSessionSecret();
  if (!token || !secret) return false;

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) return false;

  const expectedSig = sign(payloadEncoded, secret);
  if (!safeEqual(signature, expectedSig)) return false;

  const payload = decode(payloadEncoded);
  if (!payload || payload.sub !== "admin") return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;

  return true;
}
