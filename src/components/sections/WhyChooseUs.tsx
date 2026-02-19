"use client";

import { Shield, Award, Headphones, Users, MapPin, CreditCard } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function WhyChooseUs() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: language === "en" ? "Certified & Trusted" : "Terjamin & Terpercaya",
      description: language === "en"
        ? "Officially registered with ASITA, IATA, and Ministry of Religious Affairs. Your journey is guaranteed safe and trusted."
        : "Terdaftar resmi di ASITA, IATA, dan Kementerian Agama. Perjalanan Anda dijamin aman dan terpercaya.",
      color: "text-ocean",
      bg: "bg-ocean-50",
    },
    {
      icon: Award,
      title: language === "en" ? "Best Awards" : "Penghargaan Terbaik",
      description: language === "en"
        ? "Won more than 25 awards as the best travel agency in Indonesia for 10 consecutive years."
        : "Meraih lebih dari 25 penghargaan sebagai travel agency terbaik di Indonesia selama 10 tahun berturut-turut.",
      color: "text-magenta",
      bg: "bg-magenta-50",
    },
    {
      icon: Headphones,
      title: language === "en" ? "24/7 Service" : "Layanan 24/7",
      description: language === "en"
        ? "Our customer service team is ready to help you anytime, even while you are on your trip."
        : "Tim customer service kami siap membantu Anda kapan saja, bahkan saat Anda sedang dalam perjalanan.",
      color: "text-purple",
      bg: "bg-purple-50",
    },
    {
      icon: Users,
      title: language === "en" ? "Professional Guides" : "Guide Profesional",
      description: language === "en"
        ? "Guided by experienced guides who master the local language and have deep knowledge of the destination."
        : "Dipandu oleh guide berpengalaman yang menguasai bahasa lokal dan pengetahuan mendalam tentang destinasi.",
      color: "text-sunset",
      bg: "bg-orange-50",
    },
    {
      icon: MapPin,
      title: language === "en" ? "Complete Destinations" : "Destinasi Lengkap",
      description: language === "en"
        ? "More than 50 destination choices, from the best domestic tours to your dream international destinations."
        : "Lebih dari 50 destinasi pilihan, dari wisata domestik terbaik hingga destinasi internasional impian Anda.",
      color: "text-mint",
      bg: "bg-green-50",
    },
    {
      icon: CreditCard,
      title: language === "en" ? "Best Price" : "Harga Terbaik",
      description: language === "en"
        ? "Get the best price with a lowest price guarantee. 0% installment available for all tour packages."
        : "Dapatkan harga terbaik dengan jaminan harga terendah. Cicilan 0% tersedia untuk semua paket tour.",
      color: "text-ocean",
      bg: "bg-ocean-50",
    },
  ];

  const stats = [
    { value: "15K+", label: language === "en" ? "Happy Travelers" : "Wisatawan Puas", color: "text-magenta" },
    { value: "50+", label: language === "en" ? "Destinations" : "Destinasi", color: "text-ocean" },
    { value: "10+", label: language === "en" ? "Years Experience" : "Tahun Pengalaman", color: "text-purple" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* ── BAGIAN ATAS: Foto kiri + Teks kanan ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Foto */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=85"
                alt={language === "en" ? "Journey with Dzawani Tour" : "Perjalanan bersama Dzawani Tour"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple/50 via-transparent to-transparent" />
            </div>
            {/* Badge bawah kanan */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-magenta rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 font-poppins">25+ {language === "en" ? "Awards" : "Penghargaan"}</p>
                <p className="text-gray-500 font-inter text-xs">{language === "en" ? "Best Travel Agency" : "Travel Agency Terbaik"}</p>
              </div>
            </div>
            {/* Badge atas kiri */}
            <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5">
              <div className="w-10 h-10 bg-ocean rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 font-poppins text-sm">ASITA & IATA</p>
                <p className="text-gray-500 font-inter text-xs">{language === "en" ? "Official & Licensed" : "Resmi & Berlisensi"}</p>
              </div>
            </div>
          </div>

          {/* Teks */}
          <div>
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              {language === "en" ? "Why Dzawani Tour?" : "Mengapa Dzawani Tour?"}
            </span>
            <h2 className="section-title mb-5">
              {language === "en"
                ? "We Are Here to Make Your Journey "
                : "Kami Hadir untuk Membuat Perjalanan Anda "}
              <span className="text-magenta">{language === "en" ? "Unforgettable" : "Tak Terlupakan"}</span>
            </h2>
            <p className="text-gray-500 font-inter leading-relaxed mb-8">
              {language === "en"
                ? "With more than 10 years of experience in the tourism industry, Dzawani Tour has helped more than 15,000 travelers realize their travel dreams. We don't just sell tour packages — we create beautiful memories you'll tell for a lifetime."
                : "Dengan lebih dari 10 tahun pengalaman di industri pariwisata, Dzawani Tour telah membantu lebih dari 15.000 wisatawan mewujudkan impian perjalanan mereka. Kami tidak hanya menjual paket tour — kami menciptakan kenangan indah yang akan Anda ceritakan seumur hidup."}
            </p>

            {/* Stats sebaris */}
            <div className="flex flex-wrap gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className={`text-4xl font-bold font-poppins ${stat.color}`}>{stat.value}</p>
                  <p className="text-gray-500 text-sm font-inter mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BAGIAN BAWAH: 6 Kartu Fitur 3 Kolom ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group bg-white"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-gray-800 font-poppins mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-inter leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
