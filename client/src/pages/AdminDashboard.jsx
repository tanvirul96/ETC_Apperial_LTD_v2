import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Revenue', value: `$${stats?.total_revenue?.toLocaleString() || '0'}`, icon: TrendingUp, change: '+12.5%', up: true },
    { name: 'Active Orders', value: stats?.total_orders || '0', icon: ShoppingCart, change: '+4.2%', up: true },
    { name: 'Inventory Count', value: stats?.total_products || '0', icon: Package, change: '-1.4%', up: false },
    { name: 'Total Customers', value: stats?.total_users || '0', icon: Users, change: '+8.1%', up: true },
  ];

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">Executive <span className="italic font-normal">Overview.</span></h1>
        <p className="text-on-surface-variant font-body">Global atelier performance metrics and strategic insights.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-xl border border-outline-variant/10 shadow-sm shadow-primary/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary/5 rounded-lg">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold font-label uppercase tracking-widest ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-on-surface-variant font-label text-[10px] uppercase tracking-[0.2em] mb-2">{stat.name}</p>
            <p className="text-3xl font-headline font-bold text-primary">{loading ? '...' : stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-xl border border-outline-variant/10 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline text-xl font-bold text-primary">Recent Manifests</h3>
            <button className="text-[10px] font-label font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="pb-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Order ID</th>
                  <th className="pb-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Customer</th>
                  <th className="pb-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Amount</th>
                  <th className="pb-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {/* Simplified placeholder for table rows */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-label text-xs text-primary font-bold">#ETC-2024-{i}</td>
                    <td className="py-4 font-body text-sm text-on-surface-variant">Customer {i}</td>
                    <td className="py-4 font-headline text-sm font-bold text-secondary">$1,240.00</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Delivered</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="lg:col-span-4 bg-primary text-white rounded-xl p-10 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-secondary font-label text-[10px] uppercase tracking-widest mb-4 block">Strategic Goal</span>
            <h3 className="text-2xl font-headline font-bold mb-6 leading-tight">Projecting 25% Growth for Q3 Collection cycle.</h3>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-8">The atelier is currently operating at 92% efficiency. We recommend increasing sourcing for raw silk materials by 15% to meet upcoming demands.</p>
            <button className="w-full bg-white text-primary py-4 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-white transition-all shadow-xl">Detailed Analysis</button>
          </div>
          <div className="absolute bottom-[-20%] right-[-20%] opacity-10 pointer-events-none">
            <TrendIcon className="w-64 h-64 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export default AdminDashboard;
