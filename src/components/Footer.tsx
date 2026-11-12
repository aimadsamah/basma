import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const t = await getTranslations("footer");
  const n = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  const social = [["Facebook", siteConfig.facebook], ["Instagram", siteConfig.instagram]] as const;
  const h = "font-semibold text-gold mb-4";
  return (
    <footer className="geo relative bg-[#0B3D2E] text-[#F3EEDF]">
      <div className="absolute inset-0 bg-[#0B3D2E]/95" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-3xl font-bold">{siteConfig.name[locale]}</p>
          <p className="mt-3 text-sm text-[#F3EEDF]/75">{t("about")}</p>
        </div>
        <div><p className={h}>{t("links")}</p><ul className="space-y-2 text-sm">
          {([["/", "home"], ["/about", "about"], ["/register", "register"], ["/contact", "contact"]] as const).map(([href, k]) => (
            <li key={href}><Link href={href} className="hover:text-gold">{n(k)}</Link></li>))}
        </ul></div>
        <div><p className={h}>{n("programs")}</p><ul className="space-y-2 text-sm">
          <li><Link href="/programs" className="hover:text-gold">{t("quran")}</Link></li>
          <li><Link href="/programs" className="hover:text-gold">{t("academic")}</Link></li>
        </ul></div>
        <div><p className={h}>{n("contact")}</p><ul className="space-y-2 text-sm">
          <li dir="ltr" className="text-start">{siteConfig.phone || t("soon")}</li>
          <li>{siteConfig.email || t("soon")}</li>
          <li className="flex gap-4 pt-2">{social.map(([name, url]) => url
            ? <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{name}</a>
            : <span key={name} className="opacity-50">{name}</span>)}</li>
        </ul></div>
      </div>
      <p className="relative border-t border-white/10 py-5 text-center text-xs text-[#F3EEDF]/60">© {new Date().getFullYear()} {siteConfig.name[locale]} — {t("rights")}</p>
    </footer>
  );
}
