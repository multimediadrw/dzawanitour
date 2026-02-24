"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminEditHeroSlide({ id }: { id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", titleEn: "", subtitle: "", subtitleEn: "", image: "",
    ctaText: "", ctaTextEn: "", ctaLink: "", order: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`/api/admin/hero-slides/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json()).then((data) => setFormData(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`/api/admin/hero-slides/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) { alert("Hero Slide berhasil diupdate!"); router.push("/admin/dashboard/hero-slides"); }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Hero Slide</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div><label className="block mb-2">Judul (ID)</label><input type="text" className="w-full border p-2 rounded" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
        <div><label className="block mb-2">Title (EN)</label><input type="text" className="w-full border p-2 rounded" value={formData.titleEn} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} /></div>
        <div><label className="block mb-2">Subtitle (ID)</label><input type="text" className="w-full border p-2 rounded" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} /></div>
        <div><label className="block mb-2">Subtitle (EN)</label><input type="text" className="w-full border p-2 rounded" value={formData.subtitleEn} onChange={(e) => setFormData({...formData, subtitleEn: e.target.value})} /></div>
        <div><label className="block mb-2">Image URL</label><input type="text" className="w-full border p-2 rounded" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required /></div>
        <div className="flex gap-4"><button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Update</button><button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-2 rounded">Batal</button></div>
      </form>
    </div>
  );
}