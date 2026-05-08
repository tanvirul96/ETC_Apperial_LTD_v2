import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit3, CheckCircle, XCircle, Clock, Search, Download, X, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (status) => {
    setUpdating(true);
    try {
      await api.patch(`/orders/${selectedOrder.id}/status`, { status });
      setIsStatusModalOpen(false);
      fetchOrders();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const statusColors = {
    'Pending': 'bg-amber-50 text-amber-700 border-amber-100',
    'Processing': 'bg-blue-50 text-blue-700 border-blue-100',
    'Shipped': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Cancelled': 'bg-red-50 text-red-700 border-red-100'
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">Order <span className="italic font-normal">Manifest.</span></h1>
          <p className="text-on-surface-variant font-body">Review, manage and curate customer transaction cycles.</p>
        </div>
        <button className="flex items-center gap-2 border border-outline-variant/20 px-8 py-4 rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:bg-surface-container-low transition-all">
          <Download className="w-4 h-4" /> Export Manifest
        </button>
      </header>

      <div className="mb-8 flex flex-wrap gap-4 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-[10px] font-label font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white border border-outline-variant/10 text-on-surface-variant'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-outline-variant/10 overflow-hidden shadow-sm shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Order ID</th>
                <th className="px-6 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Customer</th>
                <th className="px-6 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Amount</th>
                <th className="px-6 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center">Status</th>
                <th className="px-8 py-5 text-right font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Curate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {loading && orders.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-12 text-center italic text-on-surface-variant">Accessing manifest...</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-8 py-5 font-label text-sm font-bold text-primary">{order.order_number}</td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-sm text-primary leading-tight">{order.customer}</p>
                    <p className="text-[10px] text-on-surface-variant font-label mt-1">{order.customer_email}</p>
                  </td>
                  <td className="px-6 py-5 font-headline font-bold text-secondary text-sm">${parseFloat(order.amount).toFixed(2)}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[order.status] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedOrder(order); setIsDetailModalOpen(true); }}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedOrder(order); setIsStatusModalOpen(true); }}
                        className="p-2 text-on-surface-variant hover:text-secondary transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-lg p-10 rounded-xl shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-headline font-bold text-primary">Manifest Detail</h2>
                <button onClick={() => setIsDetailModalOpen(false)}><X className="w-6 h-6 text-on-surface-variant" /></button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-outline-variant/10">
                  <div>
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Order #</p>
                    <p className="font-headline font-bold text-primary">{selectedOrder.order_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Date</p>
                    <p className="font-body text-sm text-primary">{new Date(selectedOrder.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Customer Archive</p>
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="font-bold text-primary">{selectedOrder.customer}</p>
                    <p className="text-sm text-on-surface-variant">{selectedOrder.customer_email}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-outline-variant/10">
                  <p className="text-xl font-headline font-bold text-primary">Total Remittance</p>
                  <p className="text-2xl font-headline font-bold text-secondary">${parseFloat(selectedOrder.amount).toFixed(2)}</p>
                </div>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="mt-10 w-full editorial-gradient text-on-primary py-4 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 shadow-xl transition-all">Close Entry</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Status Update Modal */}
      <AnimatePresence>
        {isStatusModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsStatusModalOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-sm p-10 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-headline font-bold text-primary mb-2">Curate Status</h2>
              <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest mb-8">Manifest #{selectedOrder.order_number}</p>
              <div className="space-y-3">
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                  <button
                    key={s}
                    disabled={updating}
                    onClick={() => handleUpdateStatus(s)}
                    className="w-full py-4 border border-outline-variant/20 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] text-primary hover:bg-surface-container-low hover:text-secondary transition-all flex items-center justify-center gap-3"
                  >
                    {updating && selectedOrder.status === s ? <Loader2 className="w-3 h-3 animate-spin" /> : s}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsStatusModalOpen(false)} className="mt-6 w-full text-on-surface-variant font-label font-bold uppercase tracking-widest text-[10px] hover:text-primary transition-colors">Abort</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
