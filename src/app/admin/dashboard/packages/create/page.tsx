'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function CreatePackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    type: 'private_trip',
    category: 'domestik',
    destination: '',
    destinationEn: '',
    duration: '',
    durationEn: '',
    image: '',
    price: 0,
    priceDiscount: 0,
    minPax: 1,
    maxPax: 0,
    rating: 0,
    reviewCount: 0,
    badge: '',
    highlights: [''],
    highlightsEn: [''],
    includes: [''],
    includesEn: [''],
    excludes: [''],
    excludesEn: [''],
    status: 'active',
    featured: false,
    hasDetail: false,
    whatsappText: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      // Clean up empty array items
      const cleanedData = {
        ...formData,
        highlights: formData.highlights.filter(h => h.trim()),
        highlightsEn: formData.highlightsEn.filter(h => h.trim()),
        includes: formData.includes.filter(i => i.trim()),
        includesEn: formData.includesEn.filter(i => i.trim()),
        excludes: formData.excludes.filter(e => e.trim()),
        excludesEn: formData.excludesEn.filter(e => e.trim()),
        priceDiscount: formData.priceDiscount || null,
        maxPax: formData.maxPax || null,
      };

      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) throw new Error('Failed to create package');

      alert('Paket berhasil dibuat!');
      router.push('/admin/dashboard/packages');
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Gagal membuat paket');
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const arr = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: arr.map((item: string, i: number) => 
          i === index ? value : item
        ),
      };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const arr = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: [...arr, ''],
      };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const arr = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: arr.filter((_: any, i: number) => i !== index),
      };
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/dashboard/packages"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Paket
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Tambah Paket Tour Baru</h1>
        <p className="text-gray-600 mt-1">Isi semua informasi paket tour</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Dasar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Paket (ID) *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Paket (EN)
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              >
                <option value="open_trip">Open Trip</option>
                <option value="private_trip">Private Trip</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              >
                <option value="domestik">Domestik</option>
                <option value="internasional">Internasional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinasi (ID) *
              </label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinasi (EN)
              </label>
              <input
                type="text"
                value={formData.destinationEn}
                onChange={(e) => setFormData({ ...formData, destinationEn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durasi (ID) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 5 Hari 4 Malam"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durasi (EN)
              </label>
              <input
                type="text"
                placeholder="e.g., 5 Days 4 Nights"
                value={formData.durationEn}
                onChange={(e) => setFormData({ ...formData, durationEn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Gambar *
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi (ID) *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi (EN)
            </label>
            <textarea
              rows={4}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Harga & Kapasitas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Normal *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Coret (Opsional)
              </label>
              <input
                type="number"
                min="0"
                value={formData.priceDiscount || ''}
                onChange={(e) => setFormData({ ...formData, priceDiscount: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min. Pax *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.minPax}
                onChange={(e) => setFormData({ ...formData, minPax: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max. Pax (Opsional)
              </label>
              <input
                type="number"
                min="0"
                value={formData.maxPax || ''}
                onChange={(e) => setFormData({ ...formData, maxPax: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highlights (ID)
              </label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  {formData.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('highlights', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('highlights')}
                className="text-sm text-ocean hover:text-ocean/80 font-medium"
              >
                + Tambah Highlight
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highlights (EN)
              </label>
              {formData.highlightsEn.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlightsEn', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  {formData.highlightsEn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('highlightsEn', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('highlightsEn')}
                className="text-sm text-ocean hover:text-ocean/80 font-medium"
              >
                + Add Highlight
              </button>
            </div>
          </div>
        </div>

        {/* Includes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Paket Termasuk</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Includes (ID)
              </label>
              {formData.includes.map((include, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={include}
                    onChange={(e) => handleArrayChange('includes', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  {formData.includes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('includes', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('includes')}
                className="text-sm text-ocean hover:text-ocean/80 font-medium"
              >
                + Tambah Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Includes (EN)
              </label>
              {formData.includesEn.map((include, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={include}
                    onChange={(e) => handleArrayChange('includesEn', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  {formData.includesEn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('includesEn', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('includesEn')}
                className="text-sm text-ocean hover:text-ocean/80 font-medium"
              >
                + Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Excludes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Paket Tidak Termasuk</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excludes (ID)
              </label>
              {formData.excludes.map((exclude, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={exclude}
                    onChange={(e) => handleArrayChange('excludes', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  {formData.excludes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('excludes', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('excludes')}
                className="text-sm text-ocean hover:text-ocean/80 font-medium"
              >
                + Tambah Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excludes (EN)
              </label>
              {formData.excludesEn.map((exclude, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={exclude}
                    onChange={(e) => handleArrayChange('excludesEn', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  {formData.excludesEn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('excludesEn', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('excludesEn')}
                className="text-sm text-ocean hover:text-ocean/80 font-medium"
              >
                + Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pengaturan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge (Opsional)
              </label>
              <input
                type="text"
                placeholder="e.g., Best Seller, Hot Deal"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-ocean focus:ring-ocean border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                Featured (Tampilkan di Homepage)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasDetail"
                checked={formData.hasDetail}
                onChange={(e) => setFormData({ ...formData, hasDetail: e.target.checked })}
                className="w-4 h-4 text-ocean focus:ring-ocean border-gray-300 rounded"
              />
              <label htmlFor="hasDetail" className="ml-2 text-sm font-medium text-gray-700">
                Punya Halaman Detail
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/dashboard/packages"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-ocean to-magenta text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Menyimpan...' : 'Simpan Paket'}
          </button>
        </div>
      </form>
    </div>
  );
}
