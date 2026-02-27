import { Metadata } from "next";

const BASE_URL = "https://dzawanitour.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: "Dzawani Tour",
    locale: "id_ID",
    type: "website",
  },
};

export function generatePageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  image = "/og-image.jpg",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    keywords: [
      "dzawani tour",
      "paket wisata",
      "travel agent Bandung",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Dzawani Tour",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Schema markup untuk TravelAgency (halaman beranda)
export const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Dzawani Tour",
  description:
    "Dzawani Tour menawarkan paket Open Trip dan Private Trip ke destinasi domestik dan internasional terbaik.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-icon.png`,
  telephone: "+628112222254",
  email: "dzawani.marketing@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Leuwisari Raya No.IV, Kb. Lega, Bojongloa Kidul",
    addressLocality: "Bandung",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  sameAs: [
    "https://wa.me/628112222254",
  ],
  priceRange: "Rp1.800.000 - Rp65.000.000",
  openingHours: "Mo-Su 08:00-21:00",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, Bank Transfer",
  areaServed: "Indonesia",
};

// Schema markup untuk halaman Open Trip
export const openTripSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Paket Open Trip Dzawani Tour",
  description:
    "Daftar paket Open Trip wisata domestik dan internasional dari Dzawani Tour",
  url: `${BASE_URL}/open-trip`,
  numberOfItems: 12,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Open Trip Bali",
      url: `${BASE_URL}/open-trip`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Open Trip Labuan Bajo",
      url: `${BASE_URL}/open-trip`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Open Trip Turki",
      url: `${BASE_URL}/open-trip?kategori=internasional`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Open Trip Jepang",
      url: `${BASE_URL}/open-trip?kategori=internasional`,
    },
  ],
};

// Schema markup untuk halaman FAQ
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
