import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  GraduationCap,
  Heart,
  Layers,
  Compass,
  TrendingUp,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button, Section, H2 } from "@/components/ui";
import { ContactBlock } from "@/components/ContactBlock";
type Item = { t: string; d: string };

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const c = await getTranslations("common");
  const why = t.raw("why") as Item[],
    steps = t.raw("steps") as string[];
  const icons = [Heart, Layers, Compass, TrendingUp, Users];
  return (
    <>
      <div className="geo relative overflow-hidden bg-[#0B3D2E] text-[#F3EEDF]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/90 to-[#0B3D2E]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-5 md:py-36">
          <Reveal className="md:col-span-3">
            <h1 className="text-5xl font-bold leading-[1.15] md:text-7xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#F3EEDF]/80">
              {t("heroSub")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/programs" variant="outline">
                {c("discover")}
              </Button>
              <Button href="/register" variant="gold">
                {c("registerNow")}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2} className=" hidden md:col-span-2 md:block">
            <div className="relative mx-auto aspect-square w-full max-w-sm border border-gold/60 p-3">
              <div className="geo grid h-full place-items-center border border-gold/40 bg-[#064E3B]">
                <span className="text-8xl font-bold text-gold md:text-9xl">
                  {locale === "ar" ? "بصمة" : "B"}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <H2>{t("introTitle")}</H2>
            <p className="mt-5 text-muted">{t("introText")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-s-4 border-gold ps-6">
              <h3 className="text-xl font-bold">{t("missionTitle")}</h3>
              <p className="mt-3 text-muted">{t("missionText")}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <H2>{t("programsTitle")}</H2>
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {(["quran", "academic"] as const).map((k, i) => {
            const Icon = i === 0 ? BookOpen : GraduationCap;
            const items = t.raw(`${k}.items`) as string[];
            return (
              <Reveal
                key={k}
                delay={i * 0.1}
                className={`p-8 md:p-12 ${i === 0 ? "bg-primary text-onprimary" : "bg-card"}`}
              >
                <Icon className="size-9 text-gold" aria-hidden />
                <h3 className="mt-6 text-2xl font-bold">{t(`${k}.title`)}</h3>
                <p
                  className={`mt-3 ${i === 0 ? "text-onprimary/80" : "text-muted"}`}
                >
                  {t(`${k}.text`)}
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {items.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="text-gold">◆</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/programs" variant={i === 0 ? "gold" : "solid"}>
                    {c("discover")}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <H2>{t("whyTitle")}</H2>
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {why.map((w, i) => {
            const I = icons[i % icons.length];
            return (
              <Reveal
                key={w.t}
                delay={(i % 2) * 0.08}
                className="flex gap-4 border-t border-line pt-6"
              >
                <I className="mt-1 size-6 shrink-0 text-gold" aria-hidden />
                <div>
                  <h3 className="font-bold">{w.t}</h3>
                  <p className="mt-1 text-muted">{w.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="surface">
        <H2>{t("stepsTitle")}</H2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 0.1}>
              <li className="list-none">
                <span className="text-5xl font-bold text-gold">{i + 1}</span>
                <p className="mt-3 text-lg">{s}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="geo -mx-5 px-5 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[#F3EEDF]/80">
              {t("ctaText")}
            </p>
            <div className="mt-8">
              <Button href="/register" variant="gold">
                {c("registerNow")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <H2>{t("contactTitle")}</H2>
        <div className="mt-10">
          <ContactBlock />
        </div>
      </Section>
    </>
  );
}
