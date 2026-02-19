import { Shield, Award, Headphones, Users, MapPin, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Terjamin & Terpercaya",
    description: "Terdaftar resmi di ASITA, IATA, dan Kementerian Agama. Perjalanan Anda dijamin aman dan terpercaya.",
    color: "text-ocean",
    bg: "bg-ocean-50",
  },
  {
    icon: Award,
    title: "Penghargaan Terbaik",
    description: "Meraih lebih dari 25 penghargaan sebagai travel agency terbaik di Indonesia selama 10 tahun berturut-turut.",
    color: "text-magenta",
    bg: "bg-magenta-50",
  },
  {
    icon: Headphones,
    title: "Layanan 24/7",
    description: "Tim customer service kami siap membantu Anda kapan saja, bahkan saat Anda sedang dalam perjalanan.",
    color: "text-purple",
    bg: "bg-purple-50",
  },
  {
    icon: Users,
    title: "Guide Profesional",
    description: "Dipandu oleh guide berpengalaman yang menguasai bahasa lokal dan pengetahuan mendalam tentang destinasi.",
    color: "text-sunset",
    bg: "bg-orange-50",
  },
  {
    icon: MapPin,
    title: "Destinasi Lengkap",
    description: "Lebih dari 50 destinasi pilihan, dari wisata domestik terbaik hingga destinasi internasional impian Anda.",
    color: "text-mint",
    bg: "bg-green-50",
  },
  {
    icon: CreditCard,
    title: "Harga Terbaik",
    description: "Dapatkan harga terbaik dengan jaminan harga terendah. Cicilan 0% tersedia untuk semua paket tour.",
    color: "text-ocean",
    bg: "bg-ocean-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Mengapa Dzawani Tour?
            </span>
            <h2 className="section-title mb-6">
              Kami Hadir untuk Membuat Perjalanan Anda{" "}
              <span className="text-magenta">Tak Terlupakan</span>
            </h2>
            <p className="text-gray-500 font-inter leading-relaxed mb-8">
              Dengan lebih dari 10 tahun pengalaman di industri pariwisata, Dzawani Tour telah membantu lebih dari 15.000 wisatawan mewujudkan impian perjalanan mereka. Kami tidak hanya menjual paket tour — kami menciptakan kenangan indah yang akan Anda ceritakan seumur hidup.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "15K+", label: "Wisatawan Puas", color: "text-magenta" },
                { value: "50+", label: "Destinasi", color: "text-ocean" },
                { value: "10+", label: "Tahun Pengalaman", color: "text-purple" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-3xl font-bold font-poppins ${stat.color}`}>{stat.value}</p>
                  <p className="text-gray-500 text-sm font-inter mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
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
      </div>
    </section>
  );
}
