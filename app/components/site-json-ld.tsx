import { getSiteUrl } from "@/lib/site-url";

export function SiteJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Андрей Юрьевич Лякин",
        url: siteUrl,
        inLanguage: "ru-RU",
      },
      {
        "@type": "Person",
        name: "Андрей Юрьевич Лякин",
        url: siteUrl,
        jobTitle: "Эксперт по управлению",
        email: "a@lyakin.ru",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
