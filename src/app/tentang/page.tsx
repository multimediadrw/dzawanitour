import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Award, Heart, Users, MapPin, Star, CheckCircle } from "lucide-react";

const teamMembers = [
  {
    name: "Ahmad Dzawani",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Lebih dari 15 tahun berpengalaman di industri pariwisata Indonesia dan internasional.",
  },
  {
    name: "Siti Rahmawati",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Memastikan setiap perjalanan berjalan sempurna dengan standar layanan tertinggi.",
  },
  {
    name: "Budi Santoso",
    role: "Senior Tour Guide",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Guide berpengalaman dengan pengetahuan mendalam tentang 30+ destinasi wisata.",
  },
  {
    name: "Dewi Kusuma",
    role: "Customer Relations Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Berdedikasi untuk memastikan kepuasan setiap pelanggan Dzawani Tour.",
  },
];

const milestones = [
  { year: "2013", title: "Dzawani Tour Didirikan", desc: "Memulai perjalanan sebagai agen perjalanan lokal di Jakarta." },
  { year: "2015", title: "Ekspansi Nasional", desc: "Membuka cabang di Surabaya, Bali, dan Yogyakarta." },
  { year: "2017", title: "Penghargaan Pertama", desc: "Meraih penghargaan Best Travel Agency dari Kemenparekraf." },
  { year: "2019", title: "10.000 Wisatawan", desc: "Berhasil melayani lebih dari 10.000 wisatawan puas." },
  { year: "2021", title: "Layanan Digital", desc: "Meluncurkan platform digital untuk kemudahan pemesanan online." },
  { year: "2023", title: "15.000+ Wisatawan", desc: "Terus berkembang dengan lebih dari 15.000 wisatawan yang telah kami layani." },
];

const values = [
  { icon: Heart, title: "Passion", desc: "Kami mencintai dunia perjalanan dan berkomitmen untuk berbagi keindahan itu kepada setiap wisatawan.", color: "text-magenta", bg: "bg-pink-50" },
  { icon: Shield, title: "Kepercayaan", desc: "Transparansi dan kejujuran adalah fondasi hubungan kami dengan setiap pelanggan.", color: "text-ocean", bg: "bg-sky-50" },
  { icon: Star, title: "Kualitas", desc: "Standar layanan tertinggi di setiap aspek perjalanan, dari pemesanan hingga kepulangan.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Users, title: "Kebersamaan", desc: "Membangun komunitas wisatawan yang saling mendukung dan berbagi pengalaman.", color: "text-purple", bg: "bg-purple-50" },
];

export default function TentangPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            Tentang Dzawani Tour
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Lebih dari sekedar agen perjalanan — kami adalah mitra perjalanan impian Anda
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
                  <p className="font-bold text-2xl text-gray-800 font-poppins">10+</p>
                  <p className="text-gray-500 font-inter text-sm">Tahun Pengalaman</p>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
                Kisah Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins leading-tight mb-5">
                Bermula dari Sebuah{" "}
                <span className="text-magenta">Mimpi</span> tentang Perjalanan
              </h2>
              <p className="text-gray-500 font-inter leading-relaxed mb-4">
                Dzawani Tour lahir pada tahun 2013 dari kecintaan mendalam terhadap keindahan Indonesia dan dunia. Berawal dari sebuah kantor kecil di Jakarta, kami memulai perjalanan kami dengan satu tekad: memberikan pengalaman wisata terbaik yang terjangkau untuk semua kalangan.
              </p>
              <p className="text-gray-500 font-inter leading-relaxed mb-6">
                Selama lebih dari satu dekade, kami telah melayani lebih dari 15.000 wisatawan, membawa mereka ke lebih dari 50 destinasi indah di seluruh Indonesia dan mancanegara. Setiap perjalanan adalah cerita baru, dan kami bangga menjadi bagian dari cerita tersebut.
              </p>
              <div className="flex flex-wrap gap-3">
                {["ASITA Member", "IATA Certified", "Kemenag Terdaftar", "ISO 9001:2015"].map((cert) => (
                  <span key={cert} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full font-inter">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "15K+", label: "Wisatawan Puas", icon: Users, color: "text-magenta" },
              { value: "50+", label: "Destinasi Wisata", icon: MapPin, color: "text-ocean" },
              { value: "10+", label: "Tahun Pengalaman", icon: Award, color: "text-purple" },
              { value: "4.9", label: "Rating Kepuasan", icon: Star, color: "text-amber-500" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <p className={`text-4xl font-bold font-poppins ${stat.color}`}>{stat.value}</p>
                  <p className="text-gray-500 font-inter text-sm mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Nilai Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins">
              Yang Kami Pegang Teguh
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 ${val.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 ${val.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-800 font-poppins text-lg mb-2">{val.title}</h3>
                  <p className="text-gray-500 font-inter text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins">
              Milestone Dzawani Tour
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1">
                    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                      <p className="text-magenta font-bold font-poppins text-sm mb-1">{m.year}</p>
                      <p className="font-bold text-gray-800 font-poppins">{m.title}</p>
                      <p className="text-gray-500 font-inter text-sm mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-magenta rounded-full border-4 border-white shadow-md flex-shrink-0 z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Tim Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins">
              Orang-Orang di Balik Dzawani Tour
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 font-poppins">{member.name}</h3>
                  <p className="text-magenta font-semibold font-inter text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 font-inter text-sm leading-relaxed">{member.bio}</p>
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
