import { getLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { Button } from "./ui";

export async function ContactBlock({ map = false }: { map?: boolean }) {
  const t = await getTranslations("contact");
  const l = (await getLocale()) as Locale;
  const addr = [siteConfig.address[l], siteConfig.wilaya[l]].filter(Boolean).join(" — ");
  const rows = [
    [Phone, t("phone"), siteConfig.phone, true], [Mail, t("email"), siteConfig.email, true], [MapPin, t("address"), addr, false],
  ] as const;
  return (
    <div className={`grid gap-8 ${map ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      <div className="space-y-6">
        {rows.map(([I, label, val, ltr]) => (
          <div key={label} className="flex gap-4"><I className="mt-1 size-5 text-gold" aria-hidden />
            <div><p className="text-sm text-muted">{label}</p><p dir={ltr ? "ltr" : undefined} className="text-start font-medium">{val || t("soon")}</p></div></div>))}
        <div className="flex gap-4 text-sm">{([["Facebook", siteConfig.facebook], ["Instagram", siteConfig.instagram]] as const).map(([n, u]) =>
          u ? <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">{n}</a> : <span key={n} className="text-muted">{n}: {t("soon")}</span>)}</div>
        <Button href="/register" variant="solid">{t("cta")}</Button>
      </div>
      {map && (siteConfig.mapEmbedUrl
        ? <iframe title={t("mapTitle")} src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border border-line md:h-full md:min-h-96" />
        : <div className="geo grid min-h-72 place-items-center border border-line bg-surface p-6 text-center text-muted">{t("mapSoon")}</div>)}
    </div>
  );
}
