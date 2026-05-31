import { useEffect } from "react";

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Update Title
    const baseTitle = "Cachaça Kethy Rios | E-commerce Premium";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      description || 
      "Descubra as cachaças premium artesanais Cachaça Kethy Rios. Envelhecidas em Amburana, Carvalho Americano, Jequitibá Rosa e Bálsamo. Tradição e sofisticação engarrafadas em Santa Catarina."
    );

    // Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title ? `${title} | Cachaça Kethy Rios` : baseTitle);

    // OpenGraph Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", description || "Cachaça artesanal de alambique envelhecida em madeiras nobres. Conheça nossa destilaria.");

  }, [title, description, keywords]);

  return null;
}
