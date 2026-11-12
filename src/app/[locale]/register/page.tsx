import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHead, Section } from "@/components/ui";
import { RegisterForm } from "@/components/RegisterForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "register" });
  return { title: t("title"), description: t("intro") };
}
export default async function Register({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("register");
  return (<><PageHead title={t("title")} text={t("intro")} />
    <Section><div className="mx-auto max-w-3xl"><RegisterForm /></div></Section></>);
}
