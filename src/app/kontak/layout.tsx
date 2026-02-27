import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami — Dzawani Tour",
  description:
    "Hubungi Dzawani Tour untuk informasi paket wisata, konsultasi perjalanan, atau pemesanan. Tersedia via WhatsApp, email, dan kunjungan langsung ke kantor kami di Bandung.",
  keywords: [
    "kontak dzawani tour",
    "hubungi dzawani tour",
    "WhatsApp dzawani tour",
    "alamat dzawani tour",
    "pesan paket wisata",
  ],
  alternates: {
    canonical: "https://dzawanitour.com/kontak",
  },
  openGraph: {
    title: "Hubungi Kami — Dzawani Tour",
    description:
      "Hubungi kami via WhatsApp, email, atau kunjungi kantor kami di Bandung untuk konsultasi paket wisata.",
    url: "https://dzawanitour.com/kontak",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kontak Dzawani Tour" }],
  },
};

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
