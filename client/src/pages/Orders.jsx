import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit3, CheckCircle, XCircle, Clock, Search, Download, X, Loader2, Truck, Phone, Mail, MapPin } from 'lucide-react';
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
    <div className="p-8 lg:p-12 bg-surface min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">Order <span className="italic font-normal">Manifest.</span></h1>
          <p className="text-on-surface-variant font-body">Review, manage and curate customer transaction cycles.</p>
        </div>
        <button className="flex items-center gap-2 border border-outline-variant/20 px-8 py-4 rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:bg-surface-container-low transition-all shadow-sm">
          <Download className="w-4 h-4" /> Export Manifest
        </button>
      </header>

      <div className="mb-8 flex flex-wrap gap-4 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-[10px] font-label font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg' : 'bg-white border border-outline-variant/10 text-on-surface-variant'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-2xl shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface border-b border-outline-variant/10">
                <th className="px-8 py-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Order ID</th>
                <th className="px-6 py-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Customer</th>
                <th className="px-6 py-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Valuation</th>
                <th className="px-6 py-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center">Status</th>
                <th className="px-8 py-6 text-right font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Curate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {loading && orders.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-12 text-center italic text-on-surface-variant">Accessing manifest...</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-8 py-6 font-label text-sm font-bold text-primary">#{order.order_number}</td>
                  <td className="px-6 py-6">
                    <p className="font-bold text-sm text-primary leading-tight">{order.customer_name}</p>
                    <p className="text-[10px] text-on-surface-variant font-label mt-1">{order.customer_email}</p>
                  </td>
                  <td className="px-6 py-6 font-headline font-bold text-secondary text-sm">${parseFloat(order.total_amount).toFixed(2)}</td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 ${statusColors[order.status] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => { setSelectedOrder(order); setIsDetailModalOpen(true); }}
                        className="p-3 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedOrder(order); setIsStatusModalOpen(true); }}
                        className="p-3 bg-secondary/5 text-secondary rounded-full hover:bg-secondary hover:text-white transition-all"
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative bg-white w-full max-w-2xl p-12 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-outline-variant/10">
                <div>
                  <h2 className="text-4xl font-headline font-black text-primary italic">Manifest Entry.</h2>
                  <p className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant mt-2">Internal Record #{selectedOrder.order_number}</p>
                </div>
                <button onClick={() => setIsDetailModalOpen(false)} className="p-3 hover:bg-surface rounded-full transition-all"><X className="w-6 h-6 text-primary" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-3 flex items-center gap-2"><Mail className="w-3 h-3" /> Customer Archive</p>
                    <p className="font-headline text-lg font-bold text-primary">{selectedOrder.customer_name}</p>
                    <p className="font-body text-sm text-on-surface-variant">{selectedOrder.customer_email}</p>
                    <p className="font-body text-sm text-on-surface-variant mt-1 flex items-center gap-2"><Phone className="w-3 h-3" /> {selectedOrder.phone || 'No contact provided'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-3 flex items-center gap-2"><MapPin className="w-3 h-3" /> Shipping Destination</p>
                    <p className="font-body text-sm text-primary leading-relaxed bg-surface p-4 rounded-2xl border border-outline-variant/5 italic">
                      {selectedOrder.shipping_address || 'No address provided'}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-3 flex items-center gap-2"><Clock className="w-3 h-3" /> Timeline</p>
                    <p className="font-body text-sm text-primary">{new Date(selectedOrder.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-3 flex items-center gap-2"><Truck className="w-3 h-3" /> Lifecycle Status</p>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 ${statusColors[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black mb-6">Curation Items</p>
                <div className="space-y-4">
                  {selectedOrder.order_items?.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center p-4 bg-surface rounded-2xl border border-outline-variant/5">
                      <div className="w-16 h-20 bg-white rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm flex-shrink-0">
                        <img src={item.products?.image_url} alt={item.products?.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm text-primary">{item.products?.name}</p>
                        <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-headline font-bold text-secondary">${parseFloat(item.unit_price).toFixed(2)}</p>
                        <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant">Unit Price</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-10 border-t-2 border-primary/5">
                <p className="text-2xl font-headline font-black text-primary italic underline underline-offset-8 decoration-secondary">Total Valuation</p>
                <p className="text-4xl font-headline font-black text-secondary">${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-12">
                <button 
                  onClick={() => { setIsDetailModalOpen(false); setIsStatusModalOpen(true); }}
                  className="bg-primary text-white py-5 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 shadow-xl transition-all"
                >
                  Adjust Status
                </button>
                <button 
                  onClick={() => setIsDetailModalOpen(false)} 
                  className="border border-outline-variant/20 text-on-surface-variant py-5 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] hover:bg-surface transition-all"
                >
                  Close Entry
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Status Update Modal */}
      <AnimatePresence>
        {isStatusModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsStatusModalOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative bg-white w-full max-w-sm p-12 rounded-[3rem] shadow-2xl"
            >
              <h2 className="text-3xl font-headline font-bold text-primary mb-2 italic">Curate Status.</h2>
              <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-[0.2em] mb-10">Updating Manifest #{selectedOrder.order_number}</p>
              <div className="space-y-4">
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                  <button
                    key={s}
                    disabled={updating}
                    onClick={() => handleUpdateStatus(s)}
                    className={`w-full py-5 border-2 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 ${selectedOrder.status === s ? 'bg-primary border-primary text-white shadow-xl' : 'bg-white border-outline-variant/10 text-primary hover:border-secondary hover:text-secondary'}`}
                  >
                    {updating && selectedOrder.status === s ? <Loader2 className="w-3 h-3 animate-spin" /> : s}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsStatusModalOpen(false)} className="mt-8 w-full text-on-surface-variant font-label font-bold uppercase tracking-widest text-[10px] hover:text-primary transition-colors">Abort Curation</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
