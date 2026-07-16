'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  Grid, 
  FileText, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Admin', role: 'admin' });
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on client-side mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin_theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('admin_theme', newTheme);
  };

  // Fetch logged in user identity on mount
  useEffect(() => {
    if (pathname === '/admin/login') return;
    
    const getSessionUser = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.success && data.users) {
          setAdminUser({ name: 'System Admin', role: 'superadmin' });
        }
      } catch (err) {
        console.error('Failed to get admin session details:', err);
      }
    };
    getSessionUser();
  }, [pathname, router]);

  // If we are on the login page, bypass the sidebar layout wrapper entirely
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Products', path: '/admin/products', icon: Grid },
    { label: 'Quotations', path: '/admin/quotations', icon: FileText },
    { label: 'Admins', path: '/admin/users', icon: Users },
  ];

  return (
    <div className={`min-h-screen bg-black text-white flex flex-col md:flex-row font-sans selection:bg-neutral-850 ${theme === 'light' ? 'admin-theme-light' : ''}`}>
      <style>{`
        /* Global Scrollbars */
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #262626 !important;
          border-radius: 4px !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #404040 !important;
        }

        /* Strict input focus styles */
        input:focus, select:focus, textarea:focus {
          border-color: #ffffff !important;
          box-shadow: none !important;
          outline: none !important;
        }

        /* Default Dark Mode badging overrides for strict B&W theme */
        .bg-yellow-950\\/20.text-yellow-500 {
          background-color: #171717 !important;
          color: #a3a3a3 !important;
          border-color: #262626 !important;
        }
        .bg-blue-950\\/20.text-blue-500 {
          background-color: #262626 !important;
          color: #e5e7eb !important;
          border-color: #404040 !important;
        }
        .bg-green-950\\/20.text-green-500 {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #ffffff !important;
        }
        .bg-red-950\\/20.text-red-500 {
          background-color: #171717 !important;
          color: #f5f5f5 !important;
          border-color: #ef4444 !important;
        }

        /* ── LIGHT MODE STYLING SYSTEM ── */
        .admin-theme-light {
          background-color: #fafafa !important;
          color: #000000 !important;
        }
        .admin-theme-light ::-webkit-scrollbar-thumb {
          background: #d1d5db !important;
        }
        .admin-theme-light ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af !important;
        }
        .admin-theme-light main {
          background-color: #fafafa !important;
          color: #000000 !important;
        }
        .admin-theme-light aside {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light header {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light input:focus, .admin-theme-light select:focus, .admin-theme-light textarea:focus {
          border-color: #000000 !important;
        }
        .admin-theme-light input::placeholder, .admin-theme-light textarea::placeholder {
          color: #8e8e8e !important;
        }
        .admin-theme-light .bg-black {
          background-color: #fafafa !important;
        }
        .admin-theme-light .bg-neutral-950 {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .bg-neutral-900 {
          background-color: #f3f4f6 !important;
        }
        
        /* Map opacity backgrounds */
        .admin-theme-light .bg-black\\/30,
        .admin-theme-light .bg-black\\/20,
        .admin-theme-light .bg-black\\/40 {
          background-color: #fafafa !important;
        }
        .admin-theme-light .bg-neutral-900\\/60,
        .admin-theme-light .bg-neutral-900\\/50,
        .admin-theme-light .bg-neutral-900\\/40,
        .admin-theme-light .bg-neutral-900\\/35,
        .admin-theme-light .bg-neutral-900\\/20,
        .admin-theme-light .bg-neutral-900\\/10 {
          background-color: #f3f4f6 !important;
        }
        
        .admin-theme-light .bg-neutral-955\\/50 {
          background-color: #ffffff !important;
        }
        .admin-theme-light .bg-neutral-950\\/25 {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .bg-neutral-950\\/70 {
          background-color: #ffffff !important;
        }
        .admin-theme-light .border-neutral-900 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-900\\/60 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-900\\/70 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-800 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-850 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .divide-neutral-900\\/40 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .divide-neutral-900 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .h-px.bg-neutral-200\\/60 {
          background-color: #e5e7eb !important;
        }
        
        /* Typography overrides with contrast */
        .admin-theme-light .text-white {
          color: #000000 !important;
        }
        .admin-theme-light .text-neutral-305, .admin-theme-light .text-neutral-300 {
          color: #1f2937 !important;
        }
        .admin-theme-light .text-neutral-400 {
          color: #374151 !important;
        }
        .admin-theme-light .text-neutral-550 {
          color: #4b5563 !important;
        }
        .admin-theme-light .text-neutral-500 {
          color: #4b5563 !important;
        }
        .admin-theme-light .text-neutral-650 {
          color: #6b7280 !important;
        }
        .admin-theme-light .text-neutral-600 {
          color: #4b5563 !important;
        }
        .admin-theme-light .text-neutral-450 {
          color: #374151 !important;
        }
        .admin-theme-light .text-neutral-455 {
          color: #374151 !important;
        }
        
        /* Table rows & hovers */
        .admin-theme-light tr.hover\\:bg-neutral-900\\/20:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light tr.hover\\:bg-neutral-900\\/25:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light td {
          color: #000000 !important;
        }
        .admin-theme-light th {
          color: #4b5563 !important;
        }
        
        /* Interactive component overrides */
        .admin-theme-light select, .admin-theme-light input, .admin-theme-light textarea {
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        .admin-theme-light select option {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        .admin-theme-light .bg-neutral-900.border-neutral-800 {
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        
        /* Action buttons flip to Black in Light Mode */
        .admin-theme-light button.bg-white {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        }
        .admin-theme-light button.bg-white:hover {
          background-color: #1f2937 !important;
          color: #ffffff !important;
        }
        
        /* Inputs & Checkbox theme */
        .admin-theme-light input[type="checkbox"] {
          accent-color: #000000 !important;
        }
        
        /* Strict hover colors to prevent invisible/white text in Light Mode */
        .admin-theme-light .hover\\:text-white:hover {
          color: #000000 !important;
        }
        .admin-theme-light .hover\\:bg-neutral-900\\/40:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light .hover\\:bg-neutral-900:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light .hover\\:bg-neutral-800:hover {
          background-color: #e5e7eb !important;
        }
        .admin-theme-light .group:hover .group-hover\\:text-white {
          color: #000000 !important;
        }
        .admin-theme-light .group:hover .group-hover\\:text-neutral-305,
        .admin-theme-light .group:hover .group-hover\\:text-neutral-300 {
          color: #000000 !important;
        }
        
        /* SVG Graph nodes / lines */
        .admin-theme-light svg line {
          stroke: #e5e7eb !important;
        }
        .admin-theme-light svg stop[offset="0%"] {
          stop-color: #000000 !important;
          stop-opacity: 0.12 !important;
        }
        .admin-theme-light svg stop[offset="100%"] {
          stop-color: #000000 !important;
          stop-opacity: 0.00 !important;
        }
        .admin-theme-light svg path[stroke="#ffffff"] {
          stroke: #000000 !important;
        }
        .admin-theme-light svg .recharts-dot,
        .admin-theme-light svg .recharts-active-dot {
          fill: #000000 !important;
          stroke: #ffffff !important;
        }
        .admin-theme-light .admin-tooltip {
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        .admin-theme-light .bg-neutral-850 {
          background-color: #f3f4f6 !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        .admin-theme-light .ring-neutral-950 {
          --tw-ring-color: #ffffff !important;
        }
        
        /* Alert box overrides */
        .admin-theme-light .bg-red-950\\/5 {
          background-color: #fef2f2 !important;
          border-color: #fca5a5 !important;
        }
        .admin-theme-light .hover\\:bg-red-950\\/20:hover {
          background-color: #fee2e2 !important;
        }
        .admin-theme-light .admin-active-bar {
          background-color: #000000 !important;
        }

        /* Status colors & tags */
        .admin-theme-light .bg-yellow-950\\/20.text-yellow-500 {
          background-color: #f3f4f6 !important;
          color: #1f2937 !important;
          border-color: #d1d5db !important;
        }
        .admin-theme-light .bg-blue-950\\/20.text-blue-500 {
          background-color: #e5e7eb !important;
          color: #111827 !important;
          border-color: #9ca3af !important;
        }
        .admin-theme-light .bg-green-950\\/20.text-green-500 {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        }
        .admin-theme-light .bg-red-950\\/20.text-red-500 {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
          border-color: #fca5a5 !important;
        }
        
        /* RFQ detail action buttons color overrides */
        .admin-theme-light .text-yellow-500.border-yellow-900\\/30.bg-yellow-950\\/10 {
          color: #4b5563 !important;
          border-color: #d1d5db !important;
          background-color: #ffffff !important;
        }
        .admin-theme-light .text-yellow-500.border-yellow-900\\/30.bg-yellow-950\\/10:hover {
          background-color: #f3f4f6 !important;
          color: #000000 !important;
        }

        .admin-theme-light .text-blue-500.border-blue-900\\/30.bg-blue-950\\/10 {
          color: #1f2937 !important;
          border-color: #9ca3af !important;
          background-color: #e5e7eb !important;
        }
        .admin-theme-light .text-blue-500.border-blue-900\\/30.bg-blue-950\\/10:hover {
          background-color: #d1d5db !important;
          color: #000000 !important;
        }

        .admin-theme-light .text-green-500.border-green-900\\/30.bg-green-950\\/10 {
          color: #ffffff !important;
          border-color: #000000 !important;
          background-color: #000000 !important;
        }
        .admin-theme-light .text-green-500.border-green-900\\/30.bg-green-950\\/10:hover {
          background-color: #1f2937 !important;
          color: #ffffff !important;
        }
        
        /* Modal and Slide-In Backdrops */
        .admin-theme-light .bg-black\\/70,
        .admin-theme-light .bg-black\\/75,
        .admin-theme-light .bg-black\\/60 {
          background-color: rgba(0, 0, 0, 0.4) !important;
          backdrop-filter: blur(4px) !important;
        }
      `}</style>
      
      {/* 1. Mobile sticky header */}
      <header className="md:hidden flex items-center justify-between bg-neutral-950 border-b border-neutral-900 px-5 py-3.5 sticky top-0 z-30">
        <div className="flex items-center space-x-2.5">
          <div className="h-8 w-8 bg-white text-black rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-white">ABI Admin</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-neutral-900 rounded-lg text-neutral-500 hover:text-white cursor-pointer transition-colors"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* 2. Mobile drawer sidebar (overlay) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
            />
            {/* Drawer container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-64 bg-neutral-950 border-r border-neutral-900 z-50 flex flex-col md:hidden overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-800 via-white/20 to-neutral-800" />

              <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-neutral-900">
                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 bg-white text-black rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">ABI Admin</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-500 hover:text-white transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        isActive
                          ? 'bg-neutral-900/60 text-white'
                          : 'text-neutral-500 hover:bg-neutral-900/40 hover:text-white'
                      }`}
                    >
                      {/* Left border accent */}
                      <span className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-r-md transition-all ${
                        isActive ? 'bg-white' : 'bg-transparent'
                      }`} />
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom: user card + logout */}
              <div className="p-4 border-t border-neutral-900">
                <div className="flex items-center space-x-3 mb-3 p-2.5 bg-neutral-900/40 border border-neutral-900 rounded-xl">
                  <div className="relative">
                    <div className="h-8 w-8 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center text-white font-black text-[10px]">
                      {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-neutral-950" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black truncate text-white uppercase tracking-tight">{adminUser.name}</p>
                    <p className="text-[7.5px] text-neutral-500 font-black uppercase tracking-wider truncate mt-0.5">{adminUser.role}</p>
                    <p className="text-[7px] font-mono text-neutral-600 truncate mt-0.5">admin@abisportswear.com</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-950/5 hover:bg-red-950/20 border border-red-900/10 hover:border-red-900/30 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-neutral-950 border-r border-neutral-900 transition-all duration-300 sticky top-0 h-screen select-none overflow-hidden ${
          desktopCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-800 via-white/20 to-neutral-800 z-10" />

        {/* Brand header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-neutral-900 select-none flex-shrink-0">
          {!desktopCollapsed ? (
            <>
              <div className="flex items-center space-x-3 group/brand cursor-pointer">
                <div className="h-9 w-9 bg-white text-black rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300 group-hover/brand:scale-105">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[13px] font-black uppercase tracking-wider text-white block leading-none">ABI SPORTS</span>
                  <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mt-1.5">Admin Portal</span>
                </div>
              </div>
              <button
                onClick={() => setDesktopCollapsed(true)}
                className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-500 hover:text-white cursor-pointer transition-colors"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setDesktopCollapsed(false)}
              className="h-9 w-9 bg-white hover:bg-neutral-200 text-black rounded-lg flex items-center justify-center mx-auto shadow-sm cursor-pointer hover:scale-105 transition-all duration-300"
              title="Expand Sidebar"
            >
              <Shield className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 relative overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex items-center py-3 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all duration-200 group ${
                  desktopCollapsed ? 'justify-center px-0' : 'px-4 space-x-3.5'
                } ${
                  isActive
                    ? 'bg-neutral-900/60 text-white'
                    : 'text-neutral-500 hover:bg-neutral-900/40 hover:text-white'
                }`}
              >
                {/* Left border accent – animated via layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-2 bottom-2 w-0.5 bg-white admin-active-bar rounded-r-full"
                  />
                )}

                <Icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'
                }`} />

                {!desktopCollapsed && <span>{item.label}</span>}

                {/* Collapsed Tooltip */}
                {desktopCollapsed && (
                  <div className="absolute left-[4.5rem] bg-neutral-900 border border-neutral-800 text-[8px] font-black uppercase tracking-widest text-white px-3 py-2 rounded-lg shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 whitespace-nowrap admin-tooltip">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="h-px bg-neutral-900/40 flex-shrink-0" />

        {/* Bottom session area */}
        <div className="p-4 border-t border-neutral-900 flex-shrink-0">
          {!desktopCollapsed ? (
            <div className="flex items-center space-x-3 mb-3 p-2.5 bg-neutral-900/40 border border-neutral-900 rounded-xl relative group/profile">
              <div className="relative">
                <div className="h-9 w-9 bg-neutral-900 rounded-xl flex items-center justify-center text-white border border-neutral-800 font-black text-[10px]">
                  {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-neutral-950" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black truncate text-white uppercase tracking-tight">{adminUser.name}</p>
                <p className="text-[7.5px] text-neutral-500 font-black uppercase tracking-wider truncate mt-0.5">{adminUser.role}</p>
                <p className="text-[7px] font-mono text-neutral-600 truncate mt-0.5">admin@abisportswear.com</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-3 relative group/profile">
              <div className="relative cursor-pointer">
                <div className="h-9 w-9 bg-neutral-900 rounded-xl flex items-center justify-center text-white border border-neutral-800 font-black text-[10px]">
                  {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-neutral-950" />
              </div>
              {/* Collapsed profile tooltip */}
              <div className="absolute left-[4.5rem] top-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 text-[8px] font-black uppercase tracking-widest text-white px-3 py-2 rounded-lg shadow-xl opacity-0 scale-95 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:scale-100 transition-all duration-200 z-50 whitespace-nowrap admin-tooltip">
                <div>{adminUser.name}</div>
                <div className="text-[6.5px] text-neutral-500 tracking-widest mt-0.5">{adminUser.role}</div>
                <div className="text-[6px] font-mono text-neutral-600 mt-0.5">admin@abisportswear.com</div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-950/5 hover:bg-red-950/20 border border-red-900/10 hover:border-red-900/30 transition-all duration-300 py-3.5 ${
              desktopCollapsed ? 'justify-center px-0' : 'px-4 space-x-3'
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!desktopCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* 4. Main Page Canvas Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-black min-h-screen">
        {/* Top desktop info header */}
        <header className="hidden md:flex items-center justify-between px-8 lg:px-10 h-20 bg-neutral-950/25 border-b border-neutral-900/60 select-none">
          <div>
            {/* Breadcrumb trail */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] text-neutral-600 font-extrabold uppercase tracking-widest">Admin</span>
              {pathname !== '/admin' && (
                <>
                  <span className="text-[9px] text-neutral-700">/</span>
                  <span className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-widest">
                    {pathname.split('/').filter(Boolean).slice(1).join(' / ')}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight leading-none">
              {pathname === '/admin' ? 'Dashboard' : pathname.replace('/admin/', '').replace(/\//, ' / ').toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 rounded-lg text-neutral-400 hover:text-white cursor-pointer transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              <span className="text-[9px] font-black uppercase tracking-widest hidden lg:block">Theme</span>
            </button>
            <div className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">
              ABI Sports Admin · v0.1.0
            </div>
          </div>
        </header>

        {/* Content body wrapper */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
