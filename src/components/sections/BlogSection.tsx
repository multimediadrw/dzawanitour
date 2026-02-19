import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              Blog & Tips
            </span>
            <h2 className="section-title">
              Inspirasi & Tips Perjalanan
            </h2>
            <p className="section-subtitle max-w-lg">
              Temukan inspirasi perjalanan, tips wisata, dan panduan destinasi dari tim Dzawani Tour.
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-secondary inline-flex items-center gap-2 text-sm flex-shrink-0"
          >
            Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className={`card group overflow-hidden ${
                index === 0 ? "md:col-span-1 md:row-span-1" : ""
              }`}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 bg-magenta text-white text-xs font-bold px-3 py-1.5 rounded-full font-poppins">
                  {post.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-gray-400 text-xs font-inter mb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-gray-800 font-poppins mb-2 group-hover:text-magenta transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm font-inter line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <span className="text-magenta font-semibold text-sm font-inter inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
