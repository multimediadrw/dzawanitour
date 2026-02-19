import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/lib/data";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            Blog & Tips Perjalanan
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Inspirasi, tips, dan panduan perjalanan dari tim Dzawani Tour
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        {/* Featured Post */}
        {blogPosts[0] && (
          <Link href={`/blog/${blogPosts[0].id}`} className="block card overflow-hidden group mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block bg-magenta text-white text-xs font-bold px-3 py-1.5 rounded-full font-poppins mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-3 group-hover:text-magenta transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-500 font-inter mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm font-inter mb-4">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" />{blogPosts[0].author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{blogPosts[0].readTime}</span>
                </div>
                <span className="text-magenta font-semibold font-inter inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="card group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-magenta text-white text-xs font-bold px-3 py-1.5 rounded-full font-poppins">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-gray-400 text-xs font-inter mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-800 font-poppins mb-2 group-hover:text-magenta transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm font-inter line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
