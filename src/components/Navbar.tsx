"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Languages } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

const links = [["/", "home"], ["/about", "about"], ["/programs", "programs"], ["/register", "register"], ["/contact", "contact"]] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "ar" ? "fr" : "ar";
  const iconBtn = "grid size-10 place-items-center border border-line hover:border-gold transition";
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-baseline gap-2 text-2xl font-bold" onClick={() => setOpen(false)}>
          <span className="text-gold">◈</span>{siteConfig.name[locale]}
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm" aria-label="Main">
          {links.map(([href, key]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
              className={`py-1 border-b-2 transition ${pathname === href ? "border-gold" : "border-transparent text-muted hover:text-ink"}`}>{t(key)}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className={iconBtn} aria-label={t("lang")} onClick={() => router.replace(pathname, { locale: other })}>
            <span className="sr-only">{t("lang")}</span><Languages className="size-4" /><span className="sr-only">{other}</span>
          </button>
          <button className={iconBtn} aria-label={t("theme")} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            <Sun className="size-4 hidden dark:block" /><Moon className="size-4 dark:hidden" />
          </button>
          <button className={`${iconBtn} md:hidden`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-line bg-bg px-5 py-4 flex flex-col" aria-label="Mobile">
          {links.map(([href, key]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`py-3 border-b border-line text-lg ${pathname === href ? "text-gold" : ""}`}>{t(key)}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
