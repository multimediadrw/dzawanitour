'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Calendar, Users, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  destination: string;
  type: string;
  slug: string;
}

interface Schedule {
  id: string;
  packageId: string;
  departureDate: string;
  returnDate?: string | null;
  price?: number | null;
  quota: number;
  bookedCount: number;
  status: string;
  notes?: string | null;
  package?: { id: string; title: string; slug: string; destination: string };
}

const STATUS_OPTIONS = [
  { value: 'available', label: 'Tersedia', color: 'bg-green-100 text-green-700' },
  { value: 'almost_full', label: 'Hampir Penuh', color: 'bg-orange-100 text-orange-700' },
  { value: 'full', label: 'Penuh', color: 'bg-red-100 text-red-700' },
  { value: 'cancelled', label: 'Dibatalkan', color: 'bg-gray-100 text-gray-600' },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function toInputDate(dateStr: string) {
  return new Date(dateStr).toISOString().split('T')[0];
}

export default function SchedulesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPackageId, setFilterPackageId] = useState('');
  const [searchPkg, setSearchPkg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set());

  const [form, setForm] = useState({
    packageId: '',
    departureDate: '',
    returnDate: '',
    price: '',
    quota: '20',
    bookedCount: '0',
    status: 'available',
    notes: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [filterPackageId]);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/admin/packages?limit=100&type=open-trip');
      if (res.ok) {
        const data = await res.json();
        setPackages(data.packages || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const params = filterPackageId ? `?packageId=${filterPackageId}` : '';
      const res = await fetch(`/api/admin/schedules${params}`);
      if (res.ok) {
        const data = await res.json();
        setSchedules(data.schedules || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSchedule
        ? `/api/admin/schedules/${editingSchedule.id}`
        : '/api/admin/schedules';
      const method = editingSchedule ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: form.price ? parseInt(form.price) : null,
          quota: parseInt(form.quota),
          bookedCount: parseInt(form.bookedCount),
        }),
      });
      if (res.ok) {
        alert(editingSchedule ? 'Jadwal berhasil diupdate!' : 'Jadwal berhasil ditambahkan!');
        resetForm();
        fetchSchedules();
      } else {
        const data = await res.json();
        alert(data.message || 'Terjadi kesalahan');
      }
    } catch (e) {
      alert('Terjadi kesalahan');
    }
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setForm({
      packageId: schedule.packageId,
      departureDate: toInputDate(schedule.departureDate),
      returnDate: schedule.returnDate ? toInputDate(schedule.returnDate) : '',
      price: schedule.price ? schedule.price.toString() : '',
      quota: schedule.quota.toString(),
      bookedCount: schedule.bookedCount.toString(),
      status: schedule.status,
      notes: schedule.notes || '',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus jadwal ini?')) return;
    try {
      const res = await fetch(`/api/admin/schedules/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Jadwal berhasil dihapus');
        fetchSchedules();
      }
    } catch (e) {
      alert('Terjadi kesalahan');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingSchedule(null);
    setForm({ packageId: '', departureDate: '', returnDate: '', price: '', quota: '20', bookedCount: '0', status: 'available', notes: '' });
  };

  const togglePackage = (pkgId: string) => {
    setExpandedPackages(prev => {
      const next = new Set(prev);
      if (next.has(pkgId)) next.delete(pkgId);
      else next.add(pkgId);
      return next;
    });
  };

  // Group schedules by package
  const groupedSchedules = schedules.reduce((acc, s) => {
    const pkgId = s.packageId;
    if (!acc[pkgId]) acc[pkgId] = [];
    acc[pkgId].push(s);
    return acc;
  }, {} as Record<string, Schedule[]>);

  const filteredPackages = packages.filter(p =>
    p.title.toLowerCase().includes(searchPkg.toLowerCase()) ||
    p.destination.toLowerCase().includes(searchPkg.toLowerCase())
  );

  const getStatusConfig = (status: string) => STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-poppins">Jadwal Keberangkatan</h1>
          <p className="text-gray-500 font-inter text-sm mt-1">Kelola jadwal keberangkatan untuk setiap paket Open Trip</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingSchedule(null); }}
          className="flex items-center gap-2 bg-magenta text-white px-4 py-2.5 rounded-xl font-semibold font-poppins text-sm hover:bg-magenta/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Jadwal
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 font-poppins mb-4">
            {editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Package */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Paket Open Trip <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.packageId}
                  onChange={e => setForm(f => ({ ...f, packageId: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                >
                  <option value="">-- Pilih Paket --</option>
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.destination})</option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Tanggal Keberangkatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.departureDate}
                  onChange={e => setForm(f => ({ ...f, departureDate: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Tanggal Kembali (opsional)
                </label>
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={e => setForm(f => ({ ...f, returnDate: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                />
              </div>

              {/* Price Override */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Harga Override (opsional)
                  <span className="text-gray-400 font-normal ml-1 text-xs">Kosongkan = pakai harga paket</span>
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="Contoh: 8500000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                />
              </div>

              {/* Quota */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Total Kuota <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={form.quota}
                  onChange={e => setForm(f => ({ ...f, quota: e.target.value }))}
                  required
                  min="1"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                />
              </div>

              {/* Booked Count */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Sudah Terpesan
                </label>
                <input
                  type="number"
                  value={form.bookedCount}
                  onChange={e => setForm(f => ({ ...f, bookedCount: e.target.value }))}
                  min="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
                  Catatan (opsional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  placeholder="Contoh: Termasuk tiket pesawat PP"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-magenta text-white px-6 py-2.5 rounded-xl font-semibold font-poppins text-sm hover:bg-magenta/90 transition-colors"
              >
                {editingSchedule ? 'Simpan Perubahan' : 'Tambah Jadwal'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-semibold font-poppins text-sm hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari paket..."
            value={searchPkg}
            onChange={e => setSearchPkg(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
          />
        </div>
        <select
          value={filterPackageId}
          onChange={e => setFilterPackageId(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
        >
          <option value="">Semua Paket</option>
          {packages.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <span className="text-sm text-gray-500 font-inter">
          {schedules.length} jadwal ditemukan
        </span>
      </div>

      {/* Schedules grouped by package */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-magenta border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-gray-500 font-inter text-sm">Memuat jadwal...</p>
        </div>
      ) : schedules.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-inter">Belum ada jadwal. Klik "Tambah Jadwal" untuk mulai.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSchedules).map(([pkgId, pkgSchedules]) => {
            const pkg = pkgSchedules[0]?.package;
            const isExpanded = expandedPackages.has(pkgId) || Object.keys(groupedSchedules).length === 1;

            return (
              <div key={pkgId} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Package Header */}
                <button
                  onClick={() => togglePackage(pkgId)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-magenta/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-magenta" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-800 font-poppins text-sm">
                        {pkg?.title || 'Paket tidak diketahui'}
                      </p>
                      <p className="text-xs text-gray-500 font-inter">
                        {pkg?.destination} • {pkgSchedules.length} jadwal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {STATUS_OPTIONS.slice(0, 3).map(s => {
                        const count = pkgSchedules.filter(sc => sc.status === s.value).length;
                        if (!count) return null;
                        return (
                          <span key={s.value} className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.color}`}>
                            {count} {s.label}
                          </span>
                        );
                      })}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                {/* Schedule List */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Tanggal Berangkat</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Tanggal Kembali</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Harga</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Kuota</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Status</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {pkgSchedules.map(schedule => {
                          const statusCfg = getStatusConfig(schedule.status);
                          const remaining = schedule.quota - schedule.bookedCount;
                          return (
                            <tr key={schedule.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-magenta flex-shrink-0" />
                                  <span className="font-semibold text-gray-800 font-inter text-sm">
                                    {formatDate(schedule.departureDate)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 font-inter">
                                {schedule.returnDate ? formatDate(schedule.returnDate) : '—'}
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-magenta font-inter">
                                {schedule.price ? formatRupiah(schedule.price) : 'Sesuai paket'}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-sm font-inter text-gray-700">
                                  <Users className="w-3.5 h-3.5 text-gray-400" />
                                  <span className="font-semibold">{schedule.bookedCount}</span>
                                  <span className="text-gray-400">/</span>
                                  <span>{schedule.quota}</span>
                                  <span className="text-xs text-gray-400">({remaining} sisa)</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.color}`}>
                                  {statusCfg.label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    onClick={() => handleEdit(schedule)}
                                    className="p-2 text-gray-400 hover:text-ocean hover:bg-ocean/10 rounded-lg transition-colors"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(schedule.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Hapus"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
