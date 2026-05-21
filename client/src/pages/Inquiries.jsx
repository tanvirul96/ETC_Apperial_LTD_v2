import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Trash2, Clock, MessageSquare, AlertCircle, RefreshCw, Archive, CheckCircle } from 'lucide-react';
import api from '../utils/api';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/contacts');
      setInquiries(response.data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Unable to load customer inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await api.put(`/contacts/${id}`, { status: newStatus });
      setInquiries(inquiries.map(inq => inq.id === id ? response.data : inq));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(response.data);
      }
    } catch (err) {
      console.error('Error updating inquiry status:', err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
      return;
    }
    try {
      await api.delete(`/contacts/${id}`);
      setInquiries(inquiries.filter(inq => inq.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  return (
    <div className="p-8 lg:p-12 bg-surface min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-black text-primary tracking-tight mb-2 italic">Customer <span className="font-normal not-italic">Inquiries.</span></h1>
          <p className="text-on-surface-variant font-body">Manage customer queries, sourcing dialogues, and partnership requests.</p>
        </div>
        <button 
          onClick={fetchInquiries} 
          className="p-4 bg-white border border-outline-variant/10 rounded-2xl hover:bg-surface transition-all shadow-sm group flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-primary font-bold"
        >
          <RefreshCw className={`w-4 h-4 text-primary ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          Refresh Registry
        </button>
      </header>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl font-body text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Syncing Conversations...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-outline-variant/5 shadow-2xl shadow-primary/5 max-w-xl mx-auto">
          <MessageSquare className="w-16 h-16 text-secondary/30 mx-auto mb-6" />
          <h3 className="font-headline text-2xl font-black text-primary mb-2">Pristine Registry</h3>
          <p className="text-on-surface-variant font-body mb-0">No active customer inquiries are registered currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* List panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-outline-variant/5 p-8 shadow-2xl shadow-primary/5 h-[calc(100vh-280px)] overflow-y-auto">
            <h3 className="font-label text-xs font-black tracking-widest text-on-surface-variant uppercase mb-6">Conversation Log ({inquiries.length})</h3>
            <div className="space-y-4">
              {inquiries.map((inq) => {
                const isActive = selectedInquiry && selectedInquiry.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                      isActive 
                        ? 'bg-primary text-white border-primary shadow-xl' 
                        : 'bg-surface/50 hover:bg-surface text-primary border-outline-variant/10'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className={`font-headline font-bold text-base line-clamp-1 ${isActive ? 'text-white' : 'text-primary'}`}>
                        {inq.name}
                      </h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0 ${
                        inq.status === 'Resolved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : inq.status === 'Read' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    <p className={`font-label text-[9px] uppercase tracking-widest mb-3 line-clamp-1 ${isActive ? 'text-white/60' : 'text-secondary font-medium'}`}>
                      {inq.subject}
                    </p>
                    <p className={`font-body text-xs line-clamp-2 leading-relaxed mb-4 ${isActive ? 'text-white/80' : 'text-on-surface-variant'}`}>
                      {inq.message}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] font-body opacity-60">
                      <Clock className="w-3 h-3" />
                      {new Date(inq.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details panel */}
          <div className="lg:col-span-7">
            {selectedInquiry ? (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-outline-variant/5 p-10 shadow-2xl shadow-primary/5 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-outline-variant/10 pb-8 mb-8">
                    <div>
                      <span className="font-label text-[10px] font-black uppercase tracking-[0.25em] text-secondary mb-2 block">
                        {selectedInquiry.subject}
                      </span>
                      <h2 className="font-headline text-3xl font-black text-primary leading-tight">
                        {selectedInquiry.name}
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                        className="bg-surface border border-outline-variant/15 text-primary text-xs font-label font-black uppercase tracking-wider rounded-xl px-4 py-2.5 focus:ring-0 focus:border-primary cursor-pointer"
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                      
                      <button
                        onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100/30"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6 text-left">
                    <div className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-outline-variant/5">
                      <Mail className="w-5 h-5 text-secondary shrink-0" />
                      <div>
                        <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant mb-0.5">CUSTOMER EMAIL</p>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-headline font-bold text-primary hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                    </div>

                    <div className="p-8 bg-surface rounded-3xl border border-outline-variant/5">
                      <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant mb-4">INQUIRY DETAIL</p>
                      <p className="font-body text-base text-primary leading-relaxed whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-outline-variant/10">
                  {selectedInquiry.status !== 'Resolved' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedInquiry.id, 'Resolved')}
                      className="editorial-gradient text-white px-8 py-4 rounded-xl font-label font-bold text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Resolved
                    </button>
                  )}
                  {selectedInquiry.status === 'Unread' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedInquiry.id, 'Read')}
                      className="px-8 py-4 bg-secondary/10 text-secondary border border-secondary/15 rounded-xl font-label font-bold text-[10px] uppercase tracking-widest hover:bg-secondary/15 transition-all"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-outline-variant/20 p-16 h-full flex flex-col items-center justify-center text-center">
                <MessageSquare className="w-12 h-12 text-on-surface-variant/25 mb-4" />
                <h3 className="font-headline text-xl font-bold text-on-surface-variant/60 mb-1">Select an Inquiry</h3>
                <p className="text-on-surface-variant/40 font-body text-sm mb-0">Select an active conversation item from the log to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
