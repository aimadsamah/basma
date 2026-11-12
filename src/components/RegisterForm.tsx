"use client";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Program = "quran" | "academic";
type Values = Record<string, string>;
const OPTS = {
  age: ["child", "teen", "adult", "senior"],
  level: ["beginner", "intermediate", "advanced"],
  goal: ["reading", "memorization", "tajweed", "other"],
  stage: ["primary", "middle", "high"],
} as const;

export function RegisterForm() {
  const t = useTranslations("register");
  const [program, setProgram] = useState<Program>("quran");
  const [errors, setErrors] = useState<Values>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "fail">("idle");

  const required: string[] = program === "quran"
    ? ["fullName", "phone", "wilaya", "age", "level", "goal"]
    : ["studentName", "parentName", "phone", "wilaya", "stage", "grade"];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const v: Values = Object.fromEntries(Object.entries(raw).map(([k, x]) => [k, String(x).trim()]));
    const errs: Values = {};
    required.forEach((k) => { if (!v[k]) errs[k] = t("errRequired"); });
    if (v.phone && !/^[+0-9 ()-]{8,18}$/.test(v.phone)) errs.phone = t("errPhone");
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errs.email = t("errEmail");
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!sid || !tid || !key) { setStatus("fail"); return; }
    const common = ["fullName", "studentName", "phone", "email", "wilaya"];
    const details = Object.entries(v).filter(([k, x]) => !common.includes(k) && x)
      .map(([k, x]) => `${k}: ${OPTS[k as keyof typeof OPTS] ? t(`opt.${x}`) : x}`).join("\n");
    setStatus("loading");
    try {
      await emailjs.send(sid, tid, {
        registration_type: program === "quran" ? "Quran" : "Academic support",
        program: t(`program.${program}`),
        full_name: v.fullName || v.studentName, phone: v.phone, email: v.email || "—", wilaya: v.wilaya,
        details, submitted_at: new Date().toISOString(),
      }, { publicKey: key });
      setStatus("ok");
    } catch { setStatus("fail"); }
  }

  const cls = "w-full border border-line bg-card px-4 py-3 text-base focus:border-gold outline-none";
  const field = (name: string, label: string, opts?: { type?: string; optional?: boolean; area?: boolean; dir?: string }) => (
    <div key={name}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">{label}{opts?.optional && <span className="text-muted"> ({t("optional")})</span>}</label>
      {opts?.area ? <textarea id={name} name={name} rows={3} className={cls} /> :
        <input id={name} name={name} type={opts?.type ?? "text"} dir={opts?.dir} autoComplete="off" className={cls}
          aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-e` : undefined} />}
      {errors[name] && <p id={`${name}-e`} className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name]}</p>}
    </div>
  );
  const select = (name: keyof typeof OPTS, label: string) => (
    <div key={name}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">{label}</label>
      <select id={name} name={name} defaultValue="" className={cls} aria-invalid={!!errors[name]}>
        <option value="" disabled>{t("choose")}</option>
        {OPTS[name].map((o) => <option key={o} value={o}>{t(`opt.${o}`)}</option>)}
      </select>
      {errors[name] && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name]}</p>}
    </div>
  );

  if (status === "ok") return (
    <div role="status" className="border border-gold bg-card p-10 text-center">
      <CheckCircle2 className="mx-auto size-10 text-gold" /><h2 className="mt-4 text-2xl font-bold">{t("okTitle")}</h2>
      <p className="mt-2 text-muted">{t("okText")}</p>
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate key={program} className="space-y-5">
      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="mb-2 text-sm font-medium">{t("selected")}</legend>
        {(["quran", "academic"] as const).map((p) => (
          <button type="button" key={p} aria-pressed={program === p} onClick={() => { setProgram(p); setErrors({}); }}
            className={`border px-4 py-4 text-start font-semibold transition ${program === p ? "border-gold bg-primary text-onprimary" : "border-line bg-card hover:border-gold"}`}>
            {t(`program.${p}`)}
          </button>))}
      </fieldset>
      <div className="grid gap-5 md:grid-cols-2">
        {program === "quran" ? <>
          {field("fullName", t("fullName"))}{field("phone", t("phone"), { type: "tel", dir: "ltr" })}
          {field("email", t("email"), { type: "email", optional: true, dir: "ltr" })}{field("wilaya", t("wilaya"))}
          {select("age", t("age"))}{select("level", t("level"))}{select("goal", t("goal"))}
        </> : <>
          {field("studentName", t("studentName"))}{field("parentName", t("parentName"))}
          {field("phone", t("phone"), { type: "tel", dir: "ltr" })}{field("email", t("email"), { type: "email", optional: true, dir: "ltr" })}
          {field("wilaya", t("wilaya"))}{select("stage", t("stage"))}{field("grade", t("grade"))}
          {field("subjects", t("subjects"), { optional: true })}
        </>}
      </div>
      {program === "academic" && field("notes", t("notes"), { optional: true, area: true })}
      {status === "fail" && <p role="alert" className="flex items-center gap-2 border border-red-500/50 p-3 text-sm text-red-700 dark:text-red-300"><AlertCircle className="size-4 shrink-0" />{t("fail")}</p>}
      <button disabled={status === "loading"} className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 font-semibold text-onprimary transition hover:brightness-110 disabled:opacity-60">
        {status === "loading" && <Loader2 className="size-4 animate-spin" />}{status === "loading" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
