import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dzawani-gradient opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
        <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full font-inter mb-6">
          Siap Memulai Petualangan?
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-6 max-w-3xl mx-auto leading-tight">
          Wujudkan Perjalanan Impian Anda Bersama Dzawani Tour
        </h2>
        <p className="text-white/80 text-lg font-inter mb-10 max-w-2xl mx-auto">
          Konsultasikan rencana perjalanan Anda dengan tim kami secara gratis. Kami siap membantu merencanakan perjalanan yang sesuai dengan kebutuhan dan anggaran Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/open-trip"
            className="bg-white text-purple font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 font-poppins inline-flex items-center gap-2"
          >
            Lihat Open Trip
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Dzawani%20Tour%2C%20saya%20ingin%20konsultasi%20paket%20tour"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 font-poppins inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat WhatsApp
          </a>
          <a
            href="tel:+6281234567890"
            className="btn-outline-white py-4 px-8 inline-flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Hubungi Kami
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-10 border-t border-white/20">
          {[
            { label: "Garansi Keberangkatan", icon: "✓" },
            { label: "Harga Terbaik", icon: "✓" },
            { label: "Cicilan 0%", icon: "✓" },
            { label: "Layanan 24/7", icon: "✓" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/80">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {item.icon}
              </span>
              <span className="text-sm font-inter">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
