"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminEditArticle({ id }: { id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", titleEn: "", slug: "", content: "", contentEn: "", excerpt: "", excerptEn: "", image: "", category: "tips", author: "Admin" });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`/api/admin/articles/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json()).then((data) => setFormData(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) { alert("Artikel berhasil diupdate!"); router.push("/admin/dashboard/articles"); }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Artikel</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div><label className="block mb-2">Judul (ID)</label><input type="text" className="w-full border p-2 rounded" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
        <div><label className="block mb-2">Slug</label><input type="text" className="w-full border p-2 rounded" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required /></div>
        <div><label className="block mb-2">Konten (ID)</label><textarea className="w-full border p-2 rounded" rows={6} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required /></div>
        <div><label className="block mb-2">Excerpt (ID)</label><textarea className="w-full border p-2 rounded" rows={2} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} /></div>
        <div><label className="block mb-2">Image URL</label><input type="text" className="w-full border p-2 rounded" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} /></div>
        <div className="flex gap-4"><button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Update</button><button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-2 rounded">Batal</button></div>
      </form>
    </div>
  );
}