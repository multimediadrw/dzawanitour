import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center px-4">
          <p className="text-8xl mb-6">🗺️</p>
          <h1 className="text-6xl font-bold text-purple font-poppins mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 font-poppins mb-3">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-500 font-inter mb-8 max-w-md mx-auto">
            Sepertinya Anda tersesat dalam perjalanan. Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary">
              Kembali ke Beranda
            </Link>
            <Link href="/paket" className="btn-secondary">
              Lihat Paket Tour
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
