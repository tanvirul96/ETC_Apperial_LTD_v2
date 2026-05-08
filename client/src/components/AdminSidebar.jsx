import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Newspaper, BarChart3, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Inventory', path: '/admin/inventory', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'News Feed', path: '/admin/news', icon: Newspaper },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white z-[100] hidden lg:flex flex-col p-8 border-r border-white/5">
      <div className="mb-12">
        <h2 className="font-headline text-2xl font-black tracking-tighter">ETC. <span className="text-[10px] uppercase tracking-[0.3em] font-label text-secondary block mt-1">Admin Atelier</span></h2>
      </div>

      <nav className="flex-grow space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) => 
              `flex items-center gap-4 px-6 py-4 rounded-lg font-label text-[10px] uppercase tracking-widest transition-all ${
                isActive 
                ? 'bg-white/10 text-secondary border-l-2 border-secondary font-bold' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon className="w-4 h-4" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-6 py-4 w-full text-white/50 hover:text-red-400 transition-colors font-label text-[10px] uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
