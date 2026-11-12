export const siteConfig = {
  name: { ar: "بصمة", fr: "Basma" },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  phone: "06 76 78 05 80",
  email: "basma18@gmail.com",
  address: {
    ar: "شارع أحمية بوخميس، بلدية الأمير عبد القادر",
    fr: "Rue Ahmia Boukhemisse, l'Emir Abdelkader",
  },
  wilaya: { ar: "جيجل", fr: "Jijel" },
  facebook: "https://www.facebook.com/profile.php?id=61593750791181",
  instagram: "https://www.instagram.com/bas_ma1681/",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d199.79627595301335!2d5.845172470314048!3d36.75280146731181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sdz!4v1794502275476!5m2!1sfr!2sdz", // Google Maps embed src URL
} as const;
