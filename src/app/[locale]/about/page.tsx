import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHead, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("intro") };
}
export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("about");
  const values = t.raw("values") as { t: string; d: string }[];
  return (<>
    <PageHead title={t("title")} text={t("intro")} />
    <Section><div className="grid gap-10 md:grid-cols-3">
      {(["mission", "vision", "philosophy"] as const).map((k, i) => (
        <Reveal key={k} delay={i * 0.08}><div className="border-t-2 border-gold pt-5"><h2 className="text-2xl font-bold">{t(`${k}Title`)}</h2><p className="mt-3 text-muted">{t(k)}</p></div></Reveal>))}
    </div></Section>
    <Section tone="surface"><h2 className="text-3xl font-bold">{t("valuesTitle")}</h2>
      <dl className="mt-10 grid gap-8 md:grid-cols-2">{values.map((v) => (<div key={v.t} className="border-s-2 border-gold ps-5"><dt className="text-lg font-bold">{v.t}</dt><dd className="mt-1 text-muted">{v.d}</dd></div>))}</dl>
    </Section>
  </>);
}
