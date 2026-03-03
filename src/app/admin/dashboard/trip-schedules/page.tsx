'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, MapPin, Clock, Users, CheckCircle, AlertCircle, XCircle, Save, X } from 'lucide-react';

interface TripSchedule {
  id: string;
  packageId: string;
  destinasi: string;
  durasi: string;
  tanggalBerangkat: string;
  harga: number;
  kuota: number;
  tersisa: number;
  status: string;
  includes: string;
  tripCategory: string;
  slug?: string | null;
  hasDetail?: boolean;
  pricing?: { pax: number; price: number }[];
}

const CATEGORY_OPTIONS = [
  { value: 'domestik', label: 'Open Trip Domestik' },
  { value: 'internasional', label: 'Open Trip Internasional' },
  { value: 'private_domestik', label: 'Private Trip Domestik' },
  { value: 'private_internasional', label: 'Private Trip Internasional' },
];

const STATUS_OPTIONS = [
  { value: 'Tersedia', label: 'Tersedia', color: 'bg-green-100 text-green-700' },
  { value: 'Hampir Penuh', label: 'Hampir Penuh', color: 'bg-orange-100 text-orange-700' },
  { value: 'Penuh', label: 'Penuh', color: 'bg-red-100 text-red-700' },
];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Tersedia') return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700"><CheckCircle className="w-3 h-3" />{status}</span>;
  if (status === 'Hampir Penuh') return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700"><AlertCircle className="w-3 h-3" />{status}</span>;
  return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700"><XCircle className="w-3 h-3" />{status}</span>;
}

const emptyForm = {
  destinasi: '',
  durasi: '',
  tanggalBerangkat: '',
  harga: '',
  kuota: '20',
  tersisa: '20',
  status: 'Tersedia',
  includes: '',
  tripCategory: 'domestik',
  slug: '',
  hasDetail: false,
  // Private trip pricing
  hargaPer2Pax: '',
  hargaPer4Pax: '',
  hargaPer6Pax: '',
};

export default function TripSchedulesPage() {
  const [schedules, setSchedules] = useState<TripSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('domestik');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const isPrivate = activeCategory.startsWith('private_');

  useEffect(() => {
    fetchSchedules();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/trip-schedules?category=${activeCategory}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setSchedules(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (schedule: TripSchedule) => {
    setEditingId(schedule.id);
    const p2 = schedule.pricing?.find((p) => p.pax === 2)?.price || schedule.harga;
    const p4 = schedule.pricing?.find((p) => p.pax === 4)?.price || schedule.harga;
    const p6 = schedule.pricing?.find((p) => p.pax === 6)?.price || schedule.harga;
    setForm({
      destinasi: schedule.destinasi,
      durasi: schedule.durasi,
      tanggalBerangkat: schedule.tanggalBerangkat,
      harga: String(schedule.harga),
      kuota: String(schedule.kuota),
      tersisa: String(schedule.tersisa),
      status: schedule.status,
      includes: schedule.includes,
      tripCategory: schedule.tripCategory,
      slug: schedule.slug || '',
      hasDetail: schedule.hasDetail || false,
      hargaPer2Pax: String(p2),
      hargaPer4Pax: String(p4),
      hargaPer6Pax: String(p6),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm, tripCategory: activeCategory });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleSave = async () => {
    if (!form.destinasi || !form.tanggalBerangkat) {
      setMessage('Destinasi dan tanggal wajib diisi!');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const isPrivateCategory = form.tripCategory.startsWith('private_');
      const body = {
        destinasi: form.destinasi,
        durasi: form.durasi || 'Fleksibel',
        tanggalBerangkat: form.tanggalBerangkat,
        harga: Number(form.harga) || 0,
        kuota: Number(form.kuota) || 20,
        tersisa: Number(form.tersisa) || 20,
        status: form.status,
        includes: form.includes,
        tripCategory: form.tripCategory,
        slug: form.slug || null,
        hasDetail: form.hasDetail,
        ...(isPrivateCategory && {
          pricing: [
            { pax: 2, price: Number(form.hargaPer2Pax) || 0 },
            { pax: 4, price: Number(form.hargaPer4Pax) || 0 },
            { pax: 6, price: Number(form.hargaPer6Pax) || 0 },
          ],
        }),
      };

      let res;
      if (editingId) {
        res = await fetch(`/api/admin/trip-schedules/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch('/api/admin/trip-schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        setMessage(editingId ? 'Jadwal berhasil diupdate!' : 'Jadwal berhasil ditambahkan!');
        setShowForm(false);
        setEditingId(null);
        setForm({ ...emptyForm });
        fetchSchedules();
      } else {
        const err = await res.json();
        setMessage('Error: ' + (err.error || 'Gagal menyimpan'));
      }
    } catch (err) {
      setMessage('Error: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, destinasi: string) => {
    if (!confirm(`Hapus jadwal "${destinasi}"?`)) return;
    try {
      const res = await fetch(`/api/admin/trip-schedules/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setMessage('Jadwal berhasil dihapus!');
        fetchSchedules();
      } else {
        setMessage('Gagal menghapus jadwal');
      }
    } catch (err) {
      setMessage('Error: ' + String(err));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Jadwal Trip</h1>
          <p className="text-gray-500 text-sm mt-1">Tambah, edit, dan hapus jadwal Open Trip & Private Trip yang tampil di website</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 bg-magenta text-white px-4 py-2 rounded-lg hover:bg-magenta/90 transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Jadwal
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.startsWith('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {message}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">{editingId ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
              <select
                value={form.tripCategory}
                onChange={(e) => setForm({ ...form, tripCategory: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destinasi *</label>
              <input
                type="text"
                value={form.destinasi}
                onChange={(e) => setForm({ ...form, destinasi: e.target.value })}
                placeholder="cth: Bali, Turki, Malaysia & Singapore"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
              <input
                type="text"
                value={form.durasi}
                onChange={(e) => setForm({ ...form, durasi: e.target.value })}
                placeholder="cth: 5H 4M, Fleksibel"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berangkat *</label>
              <input
                type="text"
                value={form.tanggalBerangkat}
                onChange={(e) => setForm({ ...form, tanggalBerangkat: e.target.value })}
                placeholder="cth: 15 Maret 2025, Fleksibel"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
              />
            </div>

            {/* Open trip fields */}
            {!form.tripCategory.startsWith('private_') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga /pax (Rp)</label>
                  <input
                    type="number"
                    value={form.harga}
                    onChange={(e) => setForm({ ...form, harga: e.target.value })}
                    placeholder="cth: 3500000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kuota Total</label>
                  <input
                    type="number"
                    value={form.kuota}
                    onChange={(e) => setForm({ ...form, kuota: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sisa Kursi</label>
                  <input
                    type="number"
                    value={form.tersisa}
                    onChange={(e) => setForm({ ...form, tersisa: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
              </>
            )}

            {/* Private trip pricing */}
            {form.tripCategory.startsWith('private_') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga /2 Pax (Rp)</label>
                  <input
                    type="number"
                    value={form.hargaPer2Pax}
                    onChange={(e) => setForm({ ...form, hargaPer2Pax: e.target.value })}
                    placeholder="cth: 1250000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga /4 Pax (Rp)</label>
                  <input
                    type="number"
                    value={form.hargaPer4Pax}
                    onChange={(e) => setForm({ ...form, hargaPer4Pax: e.target.value })}
                    placeholder="cth: 1030000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga /6 Pax (Rp)</label>
                  <input
                    type="number"
                    value={form.hargaPer6Pax}
                    onChange={(e) => setForm({ ...form, hargaPer6Pax: e.target.value })}
                    placeholder="cth: 900000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Includes (pisahkan dengan koma)</label>
              <input
                type="text"
                value={form.includes}
                onChange={(e) => setForm({ ...form, includes: e.target.value })}
                placeholder="cth: Hotel, Transport, Guide, Makan"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
              />
            </div>
            {!form.tripCategory.startsWith('private_') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (untuk halaman detail)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="cth: malaysia-singapore-5d4n"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="hasDetail"
                    checked={form.hasDetail}
                    onChange={(e) => setForm({ ...form, hasDetail: e.target.checked })}
                    className="w-4 h-4 accent-magenta"
                  />
                  <label htmlFor="hasDetail" className="text-sm font-medium text-gray-700">Ada halaman detail</label>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-magenta text-white px-6 py-2 rounded-lg hover:bg-magenta/90 transition-all font-semibold text-sm disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
            >
              <X className="w-4 h-4" />
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { setActiveCategory(opt.value); setShowForm(false); }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === opt.value
                ? 'bg-magenta text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-magenta/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Schedule list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Memuat data...</div>
      ) : schedules.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">Belum ada jadwal untuk kategori ini</p>
          <p className="text-sm mt-1">Klik &quot;Tambah Jadwal&quot; untuk menambahkan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {schedules.map((schedule) => {
            const p2 = schedule.pricing?.find((p) => p.pax === 2)?.price;
            const p4 = schedule.pricing?.find((p) => p.pax === 4)?.price;
            const p6 = schedule.pricing?.find((p) => p.pax === 6)?.price;
            return (
              <div key={schedule.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-magenta/20 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-magenta" />
                      <h3 className="font-bold text-gray-800">{schedule.destinasi}</h3>
                      <StatusBadge status={schedule.status} />
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{schedule.durasi}</span>
                      <span className="flex items-center gap-1"><span className="text-gray-400">📅</span>{schedule.tanggalBerangkat}</span>
                      {!isPrivate && (
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{schedule.tersisa}/{schedule.kuota} kursi</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-medium text-gray-600">Includes:</span> {schedule.includes}
                    </div>
                    {isPrivate && schedule.pricing && schedule.pricing.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs">
                        {schedule.pricing.map((p) => (
                          <span key={p.pax} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-1">
                            {p.pax} pax: <strong>{formatRupiah(p.price)}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                    {!isPrivate && (
                      <div className="text-magenta font-bold text-lg">{formatRupiah(schedule.harga)}<span className="text-gray-400 font-normal text-sm">/pax</span></div>
                    )}
                    {isPrivate && p2 && (
                      <div className="text-magenta font-bold text-lg">Mulai {formatRupiah(p2)}<span className="text-gray-400 font-normal text-sm">/2pax</span></div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-sm font-medium"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id, schedule.destinasi)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all text-sm font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
