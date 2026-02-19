import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
            Testimoni
          </span>
          <h2 className="section-title mb-4">
            Apa Kata Mereka Tentang Kami?
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami. Simak pengalaman nyata dari para wisatawan yang telah mempercayakan perjalanan mereka kepada Dzawani Tour.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 p-8 bg-gradient-to-r from-purple-50 to-ocean-50 rounded-2xl">
          <div className="text-center">
            <p className="text-6xl font-bold text-purple font-poppins">4.9</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-500 text-sm font-inter mt-1">Rating Keseluruhan</p>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden md:block" />
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Pelayanan", value: "4.9" },
              { label: "Harga", value: "4.8" },
              { label: "Kenyamanan", value: "5.0" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-bold text-magenta font-poppins">{item.value}</p>
                <p className="text-gray-500 text-sm font-inter">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="w-px h-16 bg-gray-200 hidden md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-purple font-poppins">1,800+</p>
            <p className="text-gray-500 text-sm font-inter">Total Ulasan</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-5 right-5">
                <Quote className="w-8 h-8 text-magenta-100 fill-magenta-100" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm font-inter leading-relaxed mb-5 line-clamp-4">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Tour Package */}
              <div className="bg-ocean-50 text-ocean-700 text-xs px-3 py-1.5 rounded-full inline-block font-inter mb-4">
                {testimonial.tourPackage}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm font-poppins">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs font-inter">
                    {testimonial.location} · {testimonial.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
