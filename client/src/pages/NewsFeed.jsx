import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../utils/api';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image_url: ''
  });

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenModal = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        title: entry.title,
        category: entry.category,
        excerpt: entry.excerpt,
        content: entry.content,
        image_url: entry.image_url
      });
    } else {
      setEditingEntry(null);
      setFormData({ title: '', category: '', excerpt: '', content: '', image_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingEntry) {
        await api.put(`/news/${editingEntry.id}`, formData);
      } else {
        await api.post('/news', formData);
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (err) {
      console.error('Error saving news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this narrative from the journal?')) {
      try {
        await api.delete(`/news/${id}`);
        fetchNews();
      } catch (err) {
        console.error('Error deleting news:', err);
      }
    }
  };

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">Narrative <span className="italic font-normal">Archive.</span></h1>
          <p className="text-on-surface-variant font-body">Manage the editorial journal and global atelier news.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" /> New Narrative
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading && news.length === 0 ? (
          <div className="col-span-full py-20 text-center italic text-on-surface-variant">Opening archives...</div>
        ) : news.map((entry, i) => (
          <motion.article 
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-outline-variant/10 overflow-hidden shadow-sm shadow-primary/5 flex flex-col group"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-container-low">
              <img src={entry.image_url} alt={entry.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => handleOpenModal(entry)} className="p-2 bg-white/90 backdrop-blur shadow-lg rounded-full text-primary hover:text-secondary transition-all"><Edit3 className="w-3 h-3" /></button>
                <button onClick={() => handleDelete(entry.id)} className="p-2 bg-white/90 backdrop-blur shadow-lg rounded-full text-primary hover:text-red-600 transition-all"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <span className="text-secondary font-label text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">{entry.category}</span>
              <h3 className="font-headline text-lg font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors line-clamp-2">{entry.title}</h3>
              <p className="text-on-surface-variant font-body text-xs leading-relaxed line-clamp-3 mb-6">{entry.excerpt}</p>
              <div className="mt-auto pt-6 border-t border-outline-variant/5 flex justify-between items-center">
                <span className="text-[10px] font-label text-on-surface-variant/60 uppercase tracking-widest">{new Date(entry.created_at).toLocaleDateString()}</span>
                <span className="text-[10px] font-label font-bold text-primary uppercase tracking-widest">Entry # {entry.id}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-2xl p-10 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-headline font-bold text-primary">{editingEntry ? 'Edit Narrative' : 'New Narrative'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-on-surface-variant" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Headline</label>
                    <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Category</label>
                    <input required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Cover Image URL</label>
                  <input required value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Editorial Excerpt</label>
                  <textarea rows="2" required value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Full Narrative Content</label>
                  <textarea rows="6" required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={loading} className="flex-grow editorial-gradient text-on-primary py-4 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingEntry ? 'Commit Changes' : 'Publish Narrative'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 border border-outline-variant/20 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] text-on-surface-variant hover:bg-surface-container-low transition-colors">Abort</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsFeed;
