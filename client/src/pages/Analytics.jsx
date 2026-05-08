import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Activity, Download, Filter, RefreshCcw, 
  Calendar, Layers, PieChart as PieIcon, BarChart3
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import api from '../utils/api';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 7 Days');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/stats');
      setData(response.data);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const COLORS = ['#1A1A1A', '#C5A059', '#4A4A4A', '#8C8C8C', '#E5E5E5'];

  if (loading && !data) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Activity className="w-10 h-10 text-secondary animate-pulse" />
          <p className="font-label text-[10px] uppercase tracking-[0.5em] text-on-surface-variant font-black">Decrypting Market Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 bg-surface min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/10 pb-12">
        <div>
          <span className="text-secondary font-label text-[10px] uppercase tracking-[0.4em] mb-4 block font-black">Strategic Intelligence</span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-primary tracking-tight italic">Market <span className="font-normal not-italic underline decoration-secondary decoration-4 underline-offset-8">Metrics.</span></h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white border border-outline-variant/10 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm hover:border-secondary transition-all">
            <Calendar className="w-5 h-5 text-secondary" />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none outline-none font-label text-[11px] uppercase tracking-widest font-black text-primary cursor-pointer"
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Year to Date</option>
            </select>
          </div>
          <button onClick={fetchData} className="p-4 bg-white border border-outline-variant/10 rounded-2xl hover:bg-surface transition-all shadow-sm group">
            <RefreshCcw className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          </button>
        </div>
      </header>

      {/* Primary Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-8 space-y-12">
          {/* Revenue Chart */}
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-primary/5 border border-outline-variant/5">
            <div className="flex justify-between items-center mb-12">
               <h3 className="font-headline text-3xl font-black text-primary italic">Revenue Trajectory</h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="font-label text-[9px] uppercase tracking-widest font-bold text-on-surface-variant">Gross Income</span>
                  </div>
               </div>
            </div>
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.charts?.revenue}>
                  <defs>
                    <linearGradient id="colorRevDeep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#F5F5F5" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'Outfit', fontWeight: 800, fill: '#A0A0A0' }} dy={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'Outfit', fontWeight: 800, fill: '#A0A0A0' }} dx={-15} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', fontFamily: 'Outfit', padding: '20px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: '#1A1A1A' }}
                  />
                  <Area type="stepAfter" dataKey="revenue" stroke="#C5A059" strokeWidth={6} fillOpacity={1} fill="url(#colorRevDeep)" animationDuration={2500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart - Category Volume */}
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-primary/5 border border-outline-variant/5">
             <h3 className="font-headline text-3xl font-black text-primary italic mb-12">Collection Volume</h3>
             <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.charts?.categories}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'Outfit', fontWeight: 800, fill: '#A0A0A0' }} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'Outfit', fontWeight: 800, fill: '#A0A0A0' }} />
                    <Tooltip cursor={{ fill: 'rgba(197, 160, 89, 0.05)' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="#1A1A1A" radius={[10, 10, 0, 0]} barSize={60}>
                       {data?.charts?.categories.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1A1A1A' : '#C5A059'} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
          {/* Pie Chart */}
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-primary/5 border border-outline-variant/5">
            <h3 className="font-headline text-2xl font-black text-primary italic mb-12 text-center">Market Presence</h3>
            <div className="h-[350px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.charts?.categories}
                    innerRadius={90}
                    outerRadius={130}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {data?.charts?.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-black">Global</span>
                 <span className="text-4xl font-headline font-black text-primary">100%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-12">
              {data?.charts?.categories.map((cat, i) => (
                <div key={cat.name} className="bg-surface p-4 rounded-2xl flex flex-col items-center">
                  <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant font-black mb-1">{cat.name}</span>
                  <span className="font-headline font-black text-primary text-xl">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency & Progression */}
          <div className="bg-primary text-white rounded-[3rem] p-12 shadow-2xl shadow-primary/20 relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="font-headline text-3xl font-black italic mb-8">Quarterly Progress.</h4>
                <div className="space-y-10">
                   <div className="space-y-4">
                      <div className="flex justify-between font-label text-[10px] uppercase tracking-widest font-black">
                         <span>Collection Sell-through</span>
                         <span className="text-secondary">84%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 2 }} className="h-full bg-secondary" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between font-label text-[10px] uppercase tracking-widest font-black">
                         <span>Customer Retention</span>
                         <span className="text-emerald-400">92%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 2 }} className="h-full bg-emerald-400" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between font-label text-[10px] uppercase tracking-widest font-black">
                         <span>Market Expansion</span>
                         <span className="text-indigo-400">65%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 2 }} className="h-full bg-indigo-400" />
                      </div>
                   </div>
                </div>
                <button className="w-full bg-white text-primary mt-12 py-5 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-white transition-all">Strategic Audit</button>
             </div>
             <div className="absolute top-[-20%] right-[-20%] opacity-5">
                <TrendingUp className="w-96 h-96" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
