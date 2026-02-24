"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Star, MessageSquare } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  featured: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/testimonials", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) fetchTestimonials();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Loading...</div></div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimoni</h1>
          <p className="text-gray-600 mt-2">Kelola testimoni pelanggan</p>
        </div>
        <Link
          href="/admin/dashboard/testimonials/create"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Tambah Testimoni
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Komentar</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {t.image && <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover mr-3" />}
                    <div className="text-sm font-medium text-gray-900">{t.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{t.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{t.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {t.featured ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Ya</span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Tidak</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/dashboard/testimonials/edit/${t.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <Edit size={18} className="inline" />
                  </Link>
                  <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Belum ada testimoni</p>
          </div>
        )}
      </div>
    </div>
  );
}
