import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan yang Sering Ditanyakan | Dzawani Tour",
  description:
    "Temukan jawaban atas pertanyaan yang sering ditanyakan seputar paket wisata, cara pemesanan, pembayaran, pembatalan, dan layanan Dzawani Tour lainnya.",
  keywords: [
    "FAQ dzawani tour",
    "pertanyaan wisata",
    "cara pesan paket tour",
    "syarat booking tour",
    "refund tour",
    "informasi wisata",
  ],
  alternates: {
    canonical: "https://dzawanitour.com/faq",
  },
  openGraph: {
    title: "FAQ — Pertanyaan yang Sering Ditanyakan | Dzawani Tour",
    description:
      "Temukan jawaban lengkap seputar paket wisata, pemesanan, pembayaran, dan layanan Dzawani Tour.",
    url: "https://dzawanitour.com/faq",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FAQ Dzawani Tour" }],
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
