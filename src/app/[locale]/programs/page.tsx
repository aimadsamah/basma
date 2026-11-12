import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHead, Section, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
type Item = { t: string; d: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "programs" });
  return { title: t("title"), description: t("intro") };
}
export default async function Programs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("programs"); const c = await getTranslations("common");
  return (<>
    <PageHead title={t("title")} text={t("intro")} />
    {(["quran", "academic"] as const).map((k, i) => (
      <Section key={k} tone={i === 0 ? "bg" : "surface"}>
        <div className="grid gap-10 md:grid-cols-3">
          <Reveal><h2 className="text-3xl font-bold">{t(`${k}Title`)}</h2><p className="mt-4 text-muted">{t(`${k}Text`)}</p>
            <div className="mt-8"><Button href="/register">{c("registerNow")}</Button></div></Reveal>
          <div className="grid gap-6 md:col-span-2 sm:grid-cols-2">
            {(t.raw(`${k}Items`) as Item[]).map((x, j) => (
              <Reveal key={x.t} delay={j * 0.06}><div className="h-full border border-line bg-card p-6"><h3 className="font-bold">{x.t}</h3><p className="mt-2 text-sm text-muted">{x.d}</p></div></Reveal>))}
          </div>
        </div>
      </Section>))}
    <Section tone="dark"><div className="mx-auto max-w-2xl text-center"><p className="text-lg">{t("note")}</p>
      <div className="mt-6"><Button href="/contact" variant="gold">{c("contactUs")}</Button></div></div></Section>
  </>);
}
