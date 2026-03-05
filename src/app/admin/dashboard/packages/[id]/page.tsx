'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X, Plus } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
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

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      const response = await fetch(`/api/admin/packages/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...data,
          highlights: data.highlights?.length ? data.highlights : [''],
          highlightsEn: data.highlightsEn?.length ? data.highlightsEn : [''],
          includes: data.includes?.length ? data.includes : [''],
          includesEn: data.includesEn?.length ? data.includesEn : [''],
          excludes: data.excludes?.length ? data.excludes : [''],
          excludesEn: data.excludesEn?.length ? data.excludesEn : [''],
          priceDiscount: data.priceDiscount || 0,
          maxPax: data.maxPax || 0,
        });
      } else {
        alert('Paket tidak ditemukan');
        router.push('/admin/dashboard/packages');
      }
    } catch (error) {
      console.error('Error fetching package:', error);
      alert('Terjadi kesalahan');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
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
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });
      if (!response.ok) throw new Error('Failed to update package');
      alert('Paket berhasil diupdate!');
      router.push('/admin/dashboard/packages');
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Gagal mengupdate paket');
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
        [field]: arr.filter((_: string, i: number) => i !== index),
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
        (type === 'number' ? parseFloat(value) || 0 : value),
    }));
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/dashboard/packages"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Paket Tour</h1>
          <p className="text-gray-600 mt-1">Update informasi paket tour</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Dasar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul (ID) *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul (EN)</label>
              <input
                type="text"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (ID) *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (EN)</label>
              <textarea
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipe *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="open_trip">Open Trip</option>
                <option value="private_trip">Private Trip</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="domestik">Domestik</option>
                <option value="internasional">Internasional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destinasi (ID) *</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destinasi (EN)</label>
              <input
                type="text"
                name="destinationEn"
                value={formData.destinationEn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (ID) *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="5 Hari 4 Malam"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (EN)</label>
              <input
                type="text"
                name="durationEn"
                value={formData.durationEn}
                onChange={handleChange}
                placeholder="5 Days 4 Nights"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUploader
                label="Gambar Paket"
                required
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Harga & Rating</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga Coret (Rp)</label>
              <input
                type="number"
                name="priceDiscount"
                value={formData.priceDiscount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
              <select
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="">Tidak ada</option>
                <option value="best_seller">Best Seller</option>
                <option value="hot_deal">Hot Deal</option>
                <option value="new">New</option>
                <option value="limited">Limited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Review</label>
              <input
                type="number"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-ocean-600 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Featured (tampil di homepage)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasDetail"
                checked={formData.hasDetail}
                onChange={handleChange}
                className="w-4 h-4 text-ocean-600 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Has Detail Page</span>
            </label>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights (ID)</label>
              {formData.highlights.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('highlights', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('highlights')}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights (EN)</label>
              {formData.highlightsEn.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('highlightsEn', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('highlightsEn', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('highlightsEn')}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Includes/Excludes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Termasuk & Tidak Termasuk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Termasuk (ID)</label>
              {formData.includes.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('includes', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('includes', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('includes')}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Termasuk (EN)</label>
              {formData.includesEn.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('includesEn', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('includesEn', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('includesEn')}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tidak Termasuk (ID)</label>
              {formData.excludes.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('excludes', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('excludes', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('excludes')}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tidak Termasuk (EN)</label>
              {formData.excludesEn.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('excludesEn', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('excludesEn', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('excludesEn')}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Text */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teks WhatsApp (opsional)</label>
            <textarea
              name="whatsappText"
              value={formData.whatsappText || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Pesan default yang akan dikirim via WhatsApp..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-ocean-600 text-white px-6 py-3 rounded-lg hover:bg-ocean-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
          <Link
            href="/admin/dashboard/packages"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
