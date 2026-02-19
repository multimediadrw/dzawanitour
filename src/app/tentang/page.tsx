"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Award, Heart, Users, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function TentangPage() {
  const { language } = useLanguage();

  const teamMembers = [
    {
      name: "Ahmad Dzawani",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: language === "en"
        ? "Over 15 years of experience in the Indonesian and international tourism industry."
        : "Lebih dari 15 tahun berpengalaman di industri pariwisata Indonesia dan internasional.",
    },
    {
      name: "Siti Rahmawati",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio: language === "en"
        ? "Ensures every trip runs perfectly with the highest service standards."
        : "Memastikan setiap perjalanan berjalan sempurna dengan standar layanan tertinggi.",
    },
    {
      name: "Budi Santoso",
      role: "Senior Tour Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      bio: language === "en"
        ? "Experienced guide with in-depth knowledge of 30+ tourist destinations."
        : "Guide berpengalaman dengan pengetahuan mendalam tentang 30+ destinasi wisata.",
    },
    {
      name: "Dewi Kusuma",
      role: "Customer Relations Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      bio: language === "en"
        ? "Dedicated to ensuring the satisfaction of every Dzawani Tour customer."
        : "Berdedikasi untuk memastikan kepuasan setiap pelanggan Dzawani Tour.",
    },
  ];

  const milestones = [
    {
      year: "2013",
      title: language === "en" ? "Dzawani Tour Founded" : "Dzawani Tour Didirikan",
      desc: language === "en" ? "Started the journey as a local travel agency in Jakarta." : "Memulai perjalanan sebagai agen perjalanan lokal di Jakarta.",
    },
    {
      year: "2015",
      title: language === "en" ? "National Expansion" : "Ekspansi Nasional",
      desc: language === "en" ? "Opened branches in Surabaya, Bali, and Yogyakarta." : "Membuka cabang di Surabaya, Bali, dan Yogyakarta.",
    },
    {
      year: "2017",
      title: language === "en" ? "First Award" : "Penghargaan Pertama",
      desc: language === "en" ? "Received Best Travel Agency award from Kemenparekraf." : "Meraih penghargaan Best Travel Agency dari Kemenparekraf.",
    },
    {
      year: "2019",
      title: language === "en" ? "10,000 Travelers" : "10.000 Wisatawan",
      desc: language === "en" ? "Successfully served more than 10,000 satisfied travelers." : "Berhasil melayani lebih dari 10.000 wisatawan puas.",
    },
    {
      year: "2021",
      title: language === "en" ? "Digital Services" : "Layanan Digital",
      desc: language === "en" ? "Launched a digital platform for easy online booking." : "Meluncurkan platform digital untuk kemudahan pemesanan online.",
    },
    {
      year: "2023",
      title: language === "en" ? "15,000+ Travelers" : "15.000+ Wisatawan",
      desc: language === "en" ? "Continuing to grow with more than 15,000 travelers served." : "Terus berkembang dengan lebih dari 15.000 wisatawan yang telah kami layani.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: language === "en" ? "Passion" : "Passion",
      desc: language === "en"
        ? "We love the world of travel and are committed to sharing that beauty with every traveler."
        : "Kami mencintai dunia perjalanan dan berkomitmen untuk berbagi keindahan itu kepada setiap wisatawan.",
      color: "text-magenta", bg: "bg-pink-50",
    },
    {
      icon: Shield,
      title: language === "en" ? "Trust" : "Kepercayaan",
      desc: language === "en"
        ? "Transparency and honesty are the foundation of our relationship with every customer."
        : "Transparansi dan kejujuran adalah fondasi hubungan kami dengan setiap pelanggan.",
      color: "text-ocean", bg: "bg-sky-50",
    },
    {
      icon: Star,
      title: language === "en" ? "Quality" : "Kualitas",
      desc: language === "en"
        ? "The highest service standards in every aspect of travel, from booking to return."
        : "Standar layanan tertinggi di setiap aspek perjalanan, dari pemesanan hingga kepulangan.",
      color: "text-amber-500", bg: "bg-amber-50",
    },
    {
      icon: Users,
      title: language === "en" ? "Togetherness" : "Kebersamaan",
      desc: language === "en"
        ? "Building a community of travelers who support each other and share experiences."
        : "Membangun komunitas wisatawan yang saling mendukung dan berbagi pengalaman.",
      color: "text-purple", bg: "bg-purple-50",
    },
  ];

  const stats = [
    { value: "15K+", label: language === "en" ? "Happy Travelers" : "Wisatawan Puas" },
    { value: "50+", label: language === "en" ? "Destinations" : "Destinasi" },
    { value: "10+", label: language === "en" ? "Years Experience" : "Tahun Pengalaman" },
    { value: "4.9", label: language === "en" ? "Rating" : "Rating" },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            {language === "en" ? "About Dzawani Tour" : "Tentang Dzawani Tour"}
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "More than just a travel agency — we are your dream travel partner"
              : "Lebih dari sekedar agen perjalanan — kami adalah mitra perjalanan impian Anda"}
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-[450px]">
                <img
                  src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&q=85"
                  alt="Dzawani Tour Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-magenta rounded-2xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 font-poppins">
                    {language === "en" ? "Best Travel Agency" : "Best Travel Agency"}
                  </p>
                  <p className="text-sm text-gray-500 font-inter">
                    {language === "en" ? "Kemenparekraf 2017" : "Kemenparekraf 2017"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-magenta font-semibold font-inter text-sm uppercase tracking-wider">
                {language === "en" ? "Our Story" : "Kisah Kami"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins mt-2 mb-6">
                {language === "en"
                  ? "10 Years of Creating Unforgettable Journeys"
                  : "10 Tahun Menciptakan Perjalanan Tak Terlupakan"}
              </h2>
              <div className="space-y-4 text-gray-600 font-inter leading-relaxed">
                <p>
                  {language === "en"
                    ? "Dzawani Tour was founded in 2013 with a simple vision: to make quality travel accessible to everyone. Starting from a small office in South Jakarta, we have grown into one of Indonesia's most trusted travel agencies."
                    : "Dzawani Tour didirikan pada tahun 2013 dengan visi sederhana: membuat perjalanan berkualitas dapat dijangkau oleh semua orang. Dimulai dari kantor kecil di Jakarta Selatan, kami telah berkembang menjadi salah satu agen perjalanan terpercaya di Indonesia."}
                </p>
                <p>
                  {language === "en"
                    ? "With a team of experienced professionals and a deep love for travel, we have served more than 15,000 happy travelers to various domestic and international destinations."
                    : "Dengan tim profesional berpengalaman dan kecintaan mendalam terhadap dunia perjalanan, kami telah melayani lebih dari 15.000 wisatawan bahagia ke berbagai destinasi domestik dan internasional."}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl p-4 text-center">
                    <p className="text-3xl font-bold text-magenta font-poppins">{stat.value}</p>
                    <p className="text-gray-500 text-sm font-inter mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-magenta font-semibold font-inter text-sm uppercase tracking-wider">
              {language === "en" ? "Our Values" : "Nilai Kami"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins mt-2">
              {language === "en" ? "What Drives Us" : "Yang Menggerakkan Kami"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${val.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${val.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-800 font-poppins mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-sm font-inter leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-magenta font-semibold font-inter text-sm uppercase tracking-wider">
              {language === "en" ? "Our Journey" : "Perjalanan Kami"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins mt-2">
              {language === "en" ? "Milestones" : "Tonggak Pencapaian"}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm inline-block max-w-xs">
                      <p className="text-magenta font-bold font-poppins text-lg">{m.year}</p>
                      <p className="font-semibold text-gray-800 font-poppins mt-1">{m.title}</p>
                      <p className="text-gray-500 text-sm font-inter mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-magenta rounded-full border-4 border-white shadow-md flex-shrink-0 z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-magenta font-semibold font-inter text-sm uppercase tracking-wider">
              {language === "en" ? "Our Team" : "Tim Kami"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins mt-2">
              {language === "en" ? "The People Behind Dzawani Tour" : "Orang-Orang di Balik Dzawani Tour"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 font-poppins">{member.name}</h3>
                  <p className="text-magenta text-sm font-inter font-medium mt-0.5">{member.role}</p>
                  <p className="text-gray-500 text-sm font-inter mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
