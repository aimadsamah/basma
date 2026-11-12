import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
export function Button({ href, children, variant = "solid" }: { href: string; children: ReactNode; variant?: "solid" | "outline" | "gold" }) {
  const v = {
    solid: "bg-primary text-onprimary hover:brightness-110",
    gold: "bg-gold text-[#0B3D2E] hover:brightness-105",
    outline: "border border-gold/70 text-ink hover:bg-gold/10",
  }[variant];
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition active:scale-[.98] ${v}`}>
      {children}
      <ArrowRight className="size-4 rtl:hidden transition group-hover:translate-x-1" aria-hidden />
      <ArrowLeft className="size-4 ltr:hidden transition group-hover:-translate-x-1" aria-hidden />
    </Link>
  );
}
export function Section({ children, tone = "bg", className = "" }: { children: ReactNode; tone?: "bg" | "surface" | "dark"; className?: string }) {
  const t = { bg: "bg-bg", surface: "bg-surface", dark: "bg-[#0B3D2E] text-[#F3EEDF]" }[tone];
  return <section className={`${t} ${className}`}><div className="mx-auto max-w-6xl px-5 py-20 md:py-28">{children}</div></section>;
}
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl">{children}</h2>;
}
export function PageHead({ title, text }: { title: string; text: string }) {
  return (
    <div className="geo relative bg-[#0B3D2E] text-[#F3EEDF]">
      <div className="absolute inset-0 bg-[#0B3D2E]/92" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-[#F3EEDF]/80">{text}</p>
      </div>
    </div>
  );
}
