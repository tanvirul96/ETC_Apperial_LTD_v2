import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, Package, Users, TrendingUp, ArrowUpRight, ArrowDownRight, 
  Calendar, Layers, Activity, Download, Filter, RefreshCcw, MessageSquare
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import api from '../utils/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/stats');
      setData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    { name: 'Total Revenue', value: `$${data?.metrics?.totalSales?.toLocaleString() || '0'}`, icon: TrendingUp, change: data?.metrics?.growth || '+0%', up: true, link: '/admin/analytics' },
    { name: 'Order Volume', value: data?.metrics?.totalOrders || '0', icon: ShoppingCart, change: '+5.2%', up: true, link: '/admin/orders' },
    { name: 'Inventory Health', value: data?.metrics?.totalProducts || '0', icon: Package, change: '+1.4%', up: true, link: '/admin/inventory' },
    { name: 'Atelier Base', value: data?.metrics?.activeUsers || '0', icon: Users, change: '+12.1%', up: true, link: '/admin/analytics' },
  ];

  if (loading && !data) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Syncing Executive Overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 bg-surface min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-black text-primary tracking-tight mb-2 italic">Executive <span className="font-normal not-italic">Overview.</span></h1>
          <p className="text-on-surface-variant font-body">Real-time atelier performance and critical operational alerts.</p>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={fetchData} className="p-4 bg-white border border-outline-variant/10 rounded-2xl hover:bg-surface transition-all shadow-sm group">
            <RefreshCcw className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          </button>
          <Link to="/admin/analytics" className="editorial-gradient text-white px-8 py-4 rounded-lg font-label font-bold text-[10px] uppercase tracking-widest shadow-xl hover:opacity-90 transition-all flex items-center gap-2">
             <Activity className="w-4 h-4" /> Deep Analytics
          </Link>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-outline-variant/5 shadow-2xl shadow-primary/5 group hover:border-secondary/20 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-secondary/5 transition-colors">
                <stat.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black font-label uppercase tracking-widest ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-on-surface-variant font-label text-[10px] uppercase tracking-[0.3em] mb-2">{stat.name}</p>
            <p className="text-4xl font-headline font-black text-primary tracking-tighter">{stat.value}</p>
            <Link to={stat.link} className="mt-6 flex items-center gap-2 text-[8px] font-label font-black uppercase tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
               Explore Module <ArrowUpRight className="w-2.5 h-2.5" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Activity Table - Primary focus of dashboard */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-outline-variant/5 p-10 shadow-2xl shadow-primary/5">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-headline text-2xl font-black text-primary italic">Live Manifests</h3>
            <Link to="/admin/orders" className="flex items-center gap-2 text-[10px] font-label font-bold uppercase tracking-widest text-secondary hover:text-primary border-b border-secondary/20 pb-1 transition-all">All Orders <ArrowUpRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/5">
                  <th className="pb-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">ID</th>
                  <th className="pb-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Customer</th>
                  <th className="pb-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black text-right">Valuation</th>
                  <th className="pb-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {data?.recentActivity?.map((order) => (
                  <tr key={order.order_number} className="group hover:bg-surface/50 transition-colors">
                    <td className="py-5 font-label text-xs text-primary font-black">#{order.order_number}</td>
                    <td className="py-5 font-headline font-black text-sm text-primary">{order.customer_name}</td>
                    <td className="py-5 font-headline text-sm font-black text-secondary text-right">${parseFloat(order.total_amount).toFixed(2)}</td>
                    <td className="py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border-2 ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="lg:col-span-4 space-y-10">
           <div className="bg-primary text-white rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20">
              <h3 className="font-headline text-2xl font-black italic mb-8 underline decoration-secondary decoration-4 underline-offset-4">Quick Curation.</h3>
              <div className="space-y-4">
                 <Link to="/admin/inventory" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                       <Package className="w-5 h-5 text-secondary" />
                       <span className="font-label text-[10px] uppercase tracking-widest font-black">Add New Piece</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                 </Link>
                 <Link to="/admin/news" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                       <Layers className="w-5 h-5 text-secondary" />
                       <span className="font-label text-[10px] uppercase tracking-widest font-black">Draft Editorial</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                 </Link>
                 <Link to="/admin/inquiries" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                       <MessageSquare className="w-5 h-5 text-secondary" />
                       <span className="font-label text-[10px] uppercase tracking-widest font-black">Customer Inquiries</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                 </Link>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-outline-variant/5 p-10 shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-4 mb-8">
                 <Activity className="w-6 h-6 text-secondary animate-pulse" />
                 <h4 className="font-headline text-xl font-black text-primary italic">Atelier Status</h4>
              </div>
              <div className="space-y-6">
                 <div className="p-4 bg-surface rounded-2xl border border-outline-variant/10">
                    <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-2">Inventory Alert</p>
                    <p className="text-sm font-headline font-bold text-primary">3 items are low in stock.</p>
                 </div>
                 <div className="p-4 bg-surface rounded-2xl border border-outline-variant/10">
                    <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-2">Pending Fulfillment</p>
                    <p className="text-sm font-headline font-bold text-primary">7 orders await processing.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
