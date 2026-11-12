import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHead, Section } from "@/components/ui";
import { ContactBlock } from "@/components/ContactBlock";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("intro") };
}
export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (<><PageHead title={t("title")} text={t("intro")} /><Section><ContactBlock map /></Section></>);
}
