import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami — Dzawani Tour Bandung",
  description:
    "Kenali lebih dekat Dzawani Tour, travel agent terpercaya dari Bandung yang telah melayani ribuan wisatawan ke berbagai destinasi domestik dan internasional sejak 2018. Profesional, amanah, dan berkesan.",
  keywords: [
    "tentang dzawani tour",
    "profil dzawani tour",
    "travel agent Bandung terpercaya",
    "sejarah dzawani tour",
    "tim dzawani tour",
  ],
  alternates: {
    canonical: "https://dzawanitour.com/tentang",
  },
  openGraph: {
    title: "Tentang Kami — Dzawani Tour Bandung",
    description:
      "Travel agent terpercaya dari Bandung yang telah melayani ribuan wisatawan ke berbagai destinasi impian.",
    url: "https://dzawanitour.com/tentang",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Tentang Dzawani Tour" }],
  },
};

export default function TentangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
