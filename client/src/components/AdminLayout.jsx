import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-surface min-h-screen w-full relative">
      {/* Mobile Top Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-primary text-white flex items-center justify-between px-6 z-[90] border-b border-white/5">
        <h2 className="font-headline text-xl font-black tracking-tighter">
          ETC. <span className="text-[9px] uppercase tracking-[0.2em] font-label text-secondary inline-block ml-1">Admin Atelier</span>
        </h2>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[95] lg:hidden backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-grow w-full lg:ml-64 pt-16 lg:pt-0 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
