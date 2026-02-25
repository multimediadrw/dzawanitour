"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";

interface FAQ { id: string; question: string; answer: string; category: string; }

export default function FAQPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/faqs", {
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
      const response = await fetch(`/api/admin/faqs/${id}`, {
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
          <h1 className="text-3xl font-bold text-gray-900">FAQ</h1>
          <p className="text-gray-600 mt-2">Kelola faq</p>
        </div>
        <Link href="/admin/dashboard/faqs/create" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          Tambah
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Pertanyaan</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Jawaban</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.question}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{item.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{item.answer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/dashboard/faqs/edit/${item.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
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
            <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Belum ada data</p>
          </div>
        )}
      </div>
    </div>
  );
}