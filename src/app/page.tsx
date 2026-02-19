import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DestinationsSection from "@/components/sections/DestinationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
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
