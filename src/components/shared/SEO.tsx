import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  schema?: Record<string, any>;
}

const SITE_NAME = "Find The Others";
const DOMAIN = "https://findtheothers.world";

function upsertMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function SEO({
  title,
  description,
  image = "/og-image.jpg",
  url,
  type = "website",
  keywords = [],
  schema,
}: SEOProps) {
  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${DOMAIN}${url}`
    : DOMAIN;
  const fullImage = image.startsWith("http") ? image : `${DOMAIN}${image}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    // Page title
    document.title = fullTitle;

    // Standard meta
    upsertMeta("name", "description", description);
    if (keywords.length > 0) {
      upsertMeta("name", "keywords", keywords.join(", "));
    }

    // Open Graph
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", fullUrl);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", fullImage);
    upsertMeta("property", "og:site_name", SITE_NAME);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:url", fullUrl);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", fullImage);

    // Canonical link
    let link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", fullUrl);

    // JSON-LD structured data
    const existingScript = document.querySelector("script[data-seo-ld]");
    if (existingScript) existingScript.remove();
    if (schema) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const ldScript = document.querySelector("script[data-seo-ld]");
      if (ldScript) ldScript.remove();
    };
  }, [fullTitle, description, fullUrl, fullImage, type, keywords, schema]);

  // This component renders nothing — it only manages <head> side-effects
  return null;
}
