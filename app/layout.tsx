import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteJsonLd } from "./components/site-json-ld";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const defaultTitle = "Андрей Юрьевич Лякин — эксперт по управлению";
const defaultDescription =
  "Консалтинг, обучение руководителей, проектный офис и системное развитие организаций. Статьи, календарь мероприятий и контакты.";

export const metadata: Metadata = {
  metadataBase: new URL("/", siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Андрей Лякин",
  },
  description: defaultDescription,
  keywords: [
    "управление проектами",
    "консалтинг",
    "обучение руководителей",
    "проектный офис",
    "государственный сектор",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Андрей Юрьевич Лякин",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
