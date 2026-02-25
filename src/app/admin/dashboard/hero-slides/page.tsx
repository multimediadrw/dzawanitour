"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Image } from "lucide-react";

interface HeroSlide { id: string; title: string; subtitle?: string; image: string; order: number; status: string; }

export default function HeroSlidesPage() {
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/hero-slides", {
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus item ini?")) return;
    try {
      const response = await fetch(`/api/admin/hero-slides/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchItems();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-xl">Loading...</div></div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Slides</h1>
          <p className="text-gray-600 mt-2">Kelola hero slides</p>
        </div>
        <Link href="/admin/dashboard/hero-slides/create" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          Tambah
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Subtitle</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={item.image} alt={item.title} className="w-24 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.subtitle || '-'}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{item.order}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/dashboard/hero-slides/edit/${item.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <Edit size={18} className="inline" />
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="text-center py-12">
            <Image size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Belum ada data</p>
          </div>
        )}
      </div>
    </div>
  );
}