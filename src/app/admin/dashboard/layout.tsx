'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  MapPin,
  MessageSquare,
  HelpCircle,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Star,
  Calendar,
} from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Paket Tour', href: '/admin/dashboard/packages', icon: Package },
  { name: 'Jadwal Trip', href: '/admin/dashboard/schedules', icon: Calendar },
  { name: 'Testimoni', href: '/admin/dashboard/testimonials', icon: MessageSquare },
  { name: 'FAQ', href: '/admin/dashboard/faqs', icon: HelpCircle },
  { name: 'Hero Slides', href: '/admin/dashboard/hero-slides', icon: Image },
  { name: 'Pengaturan', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    // Call logout API to clear cookie
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-ocean-600 to-ocean-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-ocean-500">
          <div>
            <h1 className="text-xl font-bold">Dzawani Tour</h1>
            <p className="text-sm text-ocean-200">Admin Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-ocean-700 p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-ocean-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ocean-400 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">A</span>
            </div>
            <div>
              <p className="font-medium">admin</p>
              <p className="text-sm text-ocean-200">admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-ocean-700 text-white'
                    : 'text-ocean-100 hover:bg-ocean-700/50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-ocean-500">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-ocean-100 hover:bg-ocean-700/50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find((item) => item.href === pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
              >
                Lihat Website →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
