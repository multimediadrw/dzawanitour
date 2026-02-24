'use client';

import { useEffect, useState } from 'react';
import { Package, MapPin, MessageSquare, HelpCircle, TrendingUp, Users } from 'lucide-react';

interface Stats {
  totalPackages: number;
  totalDestinations: number;
  totalTestimonials: number;
  totalFaqs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    totalDestinations: 0,
    totalTestimonials: 0,
    totalFaqs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
        },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Paket Tour',
      value: stats.totalPackages,
      icon: Package,
      color: 'from-ocean-500 to-ocean-600',
      bgColor: 'bg-ocean-50',
      iconColor: 'text-ocean-600',
    },
    {
      title: 'Total Destinasi',
      value: stats.totalDestinations,
      icon: MapPin,
      color: 'from-magenta-500 to-magenta-600',
      bgColor: 'bg-magenta-50',
      iconColor: 'text-magenta-600',
    },
    {
      title: 'Total Testimoni',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Total FAQ',
      value: stats.totalFaqs,
      icon: HelpCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-ocean-500 to-magenta-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang di Admin Panel! 👋</h1>
        <p className="text-white/90">
          Kelola semua konten website Dzawani Tour dengan mudah dari sini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/dashboard/packages"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-ocean-500 hover:bg-ocean-50 transition-colors"
          >
            <Package className="w-6 h-6 text-ocean-600" />
            <div>
              <p className="font-semibold text-gray-900">Kelola Paket Tour</p>
              <p className="text-sm text-gray-500">Tambah atau edit paket</p>
            </div>
          </a>
          <a
            href="/admin/dashboard/destinations"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-magenta-500 hover:bg-magenta-50 transition-colors"
          >
            <MapPin className="w-6 h-6 text-magenta-600" />
            <div>
              <p className="font-semibold text-gray-900">Kelola Destinasi</p>
              <p className="text-sm text-gray-500">Tambah atau edit destinasi</p>
            </div>
          </a>
          <a
            href="/admin/dashboard/testimonials"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <div>
              <p className="font-semibold text-gray-900">Kelola Testimoni</p>
              <p className="text-sm text-gray-500">Tambah atau edit testimoni</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Sistem</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Status Database</span>
            <span className="text-green-600 font-semibold">✓ Connected</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Versi Sistem</span>
            <span className="text-gray-900 font-semibold">v1.0.0</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Last Updated</span>
            <span className="text-gray-900 font-semibold">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
