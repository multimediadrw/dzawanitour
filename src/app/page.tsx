import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DestinationsSection from "@/components/sections/DestinationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { travelAgencySchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Dzawani Tour — Paket Wisata Open Trip & Private Trip Terbaik",
  description:
    "Dzawani Tour hadir dengan paket Open Trip dan Private Trip ke destinasi domestik (Bali, Labuan Bajo, Raja Ampat) dan internasional (Turki, Jepang, Korea). Harga terjangkau, pelayanan profesional dari Bandung.",
  keywords: [
    "open trip Bali",
    "open trip Turki",
    "private trip Jepang",
    "wisata Bandung",
    "paket tour murah",
    "travel agent terpercaya",
  ],
  alternates: {
    canonical: "https://dzawanitour.com",
  },
  openGraph: {
    title: "Dzawani Tour — Paket Wisata Open Trip & Private Trip Terbaik",
    description:
      "Temukan paket wisata terbaik ke Bali, Labuan Bajo, Turki, Jepang, dan banyak destinasi lainnya bersama Dzawani Tour.",
    url: "https://dzawanitour.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dzawani Tour" }],
  },
};

export default function Home() {
  return (
    <main>
      {/* Schema Markup: TravelAgency */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />
      <Navbar />
      <HeroSection />
      <FeaturedPackages />
      <WhyChooseUs />
      <DestinationsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
