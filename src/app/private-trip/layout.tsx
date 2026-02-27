import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Trip Eksklusif Domestik & Internasional — Dzawani Tour",
  description:
    "Nikmati perjalanan eksklusif bersama rombongan dengan Private Trip Dzawani Tour. Jadwal fleksibel, itinerary kustom, guide private. Destinasi: Bali, Lombok, Raja Ampat, Turki, Jepang, Korea, Eropa, dan lainnya.",
  keywords: [
    "private trip Bali",
    "private trip Turki",
    "private trip Jepang",
    "private trip Eropa",
    "wisata private",
    "tour eksklusif",
    "perjalanan rombongan",
    "honeymoon tour",
    "family trip",
  ],
  alternates: {
    canonical: "https://dzawanitour.com/private-trip",
  },
  openGraph: {
    title: "Private Trip Eksklusif Domestik & Internasional — Dzawani Tour",
    description:
      "Perjalanan eksklusif hanya untuk Anda dan rombongan. Jadwal fleksibel, itinerary kustom, harga terjangkau.",
    url: "https://dzawanitour.com/private-trip",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Private Trip Dzawani Tour" }],
  },
};

export default function PrivateTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
