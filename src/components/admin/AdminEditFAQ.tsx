"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminEditFAQ({ id }: { id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    question: "",
    questionEn: "",
    answer: "",
    answerEn: "",
    category: "general",
    order: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`/api/admin/faqs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`/api/admin/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("FAQ berhasil diupdate!");
      router.push("/admin/dashboard/faqs");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit FAQ</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block mb-2">Pertanyaan (ID)</label>
          <input type="text" className="w-full border p-2 rounded" value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} required />
        </div>
        <div>
          <label className="block mb-2">Question (EN)</label>
          <input type="text" className="w-full border p-2 rounded" value={formData.questionEn} onChange={(e) => setFormData({...formData, questionEn: e.target.value})} />
        </div>
        <div>
          <label className="block mb-2">Jawaban (ID)</label>
          <textarea className="w-full border p-2 rounded" rows={4} value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})} required />
        </div>
        <div>
          <label className="block mb-2">Answer (EN)</label>
          <textarea className="w-full border p-2 rounded" rows={4} value={formData.answerEn} onChange={(e) => setFormData({...formData, answerEn: e.target.value})} />
        </div>
        <div>
          <label className="block mb-2">Kategori</label>
          <input type="text" className="w-full border p-2 rounded" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
        </div>
        <div>
          <label className="block mb-2">Urutan</label>
          <input type="number" className="w-full border p-2 rounded" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} />
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Update</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-2 rounded">Batal</button>
        </div>
      </form>
    </div>
  );
}
