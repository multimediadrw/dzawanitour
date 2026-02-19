import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Award, Heart, Target } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Kepercayaan",
    description: "Kami membangun kepercayaan melalui transparansi, kejujuran, dan komitmen penuh terhadap setiap pelanggan.",
    color: "text-ocean",
    bg: "bg-ocean-50",
  },
  {
    icon: Heart,
    title: "Pelayanan Tulus",
    description: "Setiap perjalanan diperlakukan dengan penuh kasih sayang dan dedikasi, karena kepuasan Anda adalah kebanggaan kami.",
    color: "text-magenta",
    bg: "bg-magenta-50",
  },
  {
    icon: Award,
    title: "Kualitas Terbaik",
    description: "Kami tidak berkompromi dengan kualitas. Setiap detail perjalanan dipersiapkan dengan standar tertinggi.",
    color: "text-purple",
    bg: "bg-purple-50",
  },
  {
    icon: Target,
    title: "Inovasi",
    description: "Terus berinovasi untuk menghadirkan pengalaman perjalanan yang lebih baik, lebih mudah, dan lebih berkesan.",
    color: "text-sunset",
    bg: "bg-orange-50",
  },
];

const milestones = [
  { year: "2014", title: "Dzawani Tour Berdiri", description: "Didirikan dengan visi menjadi travel agency terpercaya di Indonesia." },
  { year: "2016", title: "Ekspansi Paket Umrah", description: "Meluncurkan layanan umrah pertama dengan muthawwif berpengalaman." },
  { year: "2018", title: "1000 Wisatawan Puas", description: "Mencapai milestone 1000 wisatawan yang telah mempercayakan perjalanan mereka." },
  { year: "2020", title: "Penghargaan Nasional", description: "Meraih penghargaan sebagai Travel Agency Terbaik dari ASITA." },
  { year: "2022", title: "Platform Digital", description: "Meluncurkan platform digital untuk kemudahan pemesanan online." },
  { year: "2024", title: "15.000+ Wisatawan", description: "Berhasil melayani lebih dari 15.000 wisatawan dari seluruh Indonesia." },
];

export default function TentangPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            Tentang Dzawani Tour
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Lebih dari sekedar travel agency — kami adalah mitra perjalanan impian Anda
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
                Kisah Kami
              </span>
              <h2 className="section-title mb-6">
                Berawal dari Passion, Berkembang dengan Kepercayaan
              </h2>
              <div className="space-y-4 text-gray-600 font-inter leading-relaxed">
                <p>
                  Dzawani Tour lahir pada tahun 2014 dari sebuah passion yang sederhana: membuat setiap orang bisa menikmati keindahan dunia tanpa kerumitan. Berawal dari tim kecil yang berdedikasi, kami kini telah berkembang menjadi salah satu travel agency terpercaya di Indonesia.
                </p>
                <p>
                  Nama &ldquo;Dzawani&rdquo; terinspirasi dari kata Arab yang berarti &ldquo;pemilik cahaya&rdquo; — mencerminkan visi kami untuk menerangi setiap perjalanan dengan pengalaman yang bermakna dan penuh warna.
                </p>
                <p>
                  Selama lebih dari 10 tahun, kami telah membantu lebih dari 15.000 wisatawan mewujudkan impian perjalanan mereka — dari liburan keluarga ke Bali, petualangan ke Raja Ampat, hingga perjalanan spiritual umrah ke Tanah Suci.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-magenta-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-magenta font-poppins">15K+</p>
                <p className="text-gray-600 font-inter mt-1">Wisatawan Puas</p>
              </div>
              <div className="bg-ocean-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-ocean font-poppins">50+</p>
                <p className="text-gray-600 font-inter mt-1">Destinasi</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-purple font-poppins">10+</p>
                <p className="text-gray-600 font-inter mt-1">Tahun Pengalaman</p>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-sunset font-poppins">25+</p>
                <p className="text-gray-600 font-inter mt-1">Penghargaan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Nilai Kami
            </span>
            <h2 className="section-title mb-4">Prinsip yang Kami Pegang</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`w-14 h-14 ${value.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-800 font-poppins mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm font-inter leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Perjalanan Kami
            </span>
            <h2 className="section-title mb-4">Milestone Dzawani Tour</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? "md:ml-auto md:mr-8" : "md:mr-auto md:ml-8"} max-w-sm`}>
                      <h3 className="font-bold text-gray-800 font-poppins mb-1">{milestone.title}</h3>
                      <p className="text-gray-500 text-sm font-inter">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-magenta rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <span className="text-white font-bold text-xs font-poppins">{milestone.year}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
