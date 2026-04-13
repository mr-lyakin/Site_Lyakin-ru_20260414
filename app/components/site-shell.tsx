import Link from "next/link";

const menuItems = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/services", label: "Обучение и консалтинг" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/blog", label: "Блог" },
  { href: "/calendar-gallery", label: "Календарь-Галерея" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight sm:text-lg">
            Андрей Юрьевич Лякин
          </Link>
          <nav className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-medium text-slate-700 lg:flex">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-slate-600 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Андрей Юрьевич Лякин. Эксперт по управлению.
        </div>
      </footer>
    </div>
  );
}
