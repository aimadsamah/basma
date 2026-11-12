import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
const pages = ["", "/about", "/programs", "/register", "/contact"];
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((l) => pages.map((p) => ({
    url: `${siteConfig.url}/${l}${p}`, lastModified: new Date(),
    alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x, `${siteConfig.url}/${x}${p}`])) },
  })));
}
