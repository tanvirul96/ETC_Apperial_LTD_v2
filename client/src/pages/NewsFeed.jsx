import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, X, Image as ImageIcon, Loader2, Upload, Calendar, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import { supabase } from '../supabase';

const NEWS_CATEGORIES = ['Collection', 'Perspective', 'Atelier Update', 'Craftsmanship', 'Editorial', 'Event'];

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [search, setSearch] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Perspective',
    excerpt: '',
    content: '',
    image_url: '',
    author: 'Editorial Team',
    status: 'Published'
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `news-images/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('products') // Using existing products bucket but news-images folder
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (err) {
      console.error('Upload Error:', err.message);
      alert('Failed to upload narrative cover image.');
    } finally {
      setUploading(false);
    }
  };

  const handleOpenModal = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        title: entry.title,
        category: entry.category,
        excerpt: entry.excerpt,
        content: entry.content,
        image_url: entry.image_url,
        author: entry.author || 'Editorial Team',
        status: entry.status || 'Published'
      });
    } else {
      setEditingEntry(null);
      setFormData({ 
        title: '', 
        category: 'Perspective', 
        excerpt: '', 
        content: '', 
        image_url: '',
        author: 'Editorial Team',
        status: 'Published'
      });
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
      console.error('Error saving narrative:', err);
      alert('Failed to archive the narrative. Please check database connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently remove this narrative from the journal?')) {
      try {
        await api.delete(`/news/${id}`);
        fetchNews();
      } catch (err) {
        console.error('Error deleting narrative:', err);
      }
    }
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 min-h-screen bg-surface">
      <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-primary/30"></span>
            <p className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-black">Editorial Journal</p>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-primary tracking-tighter">
            News & <span className="italic font-normal">Announcements.</span>
          </h1>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-label font-bold text-[10px] uppercase tracking-widest hover:scale-105 shadow-2xl transition-all active:scale-95 w-full lg:w-auto"
        >
          <Plus className="w-4 h-4" /> Add New Entry
        </button>
      </header>

      <div className="mb-10 relative max-w-xl group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input 
          type="text"
          placeholder="Search by headline or collection category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white border border-outline-variant/10 rounded-2xl focus:ring-4 focus:ring-primary/5 font-body text-sm outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
        {loading && news.length === 0 ? (
          <div className="col-span-full py-32 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary/20 mx-auto mb-4" />
            <p className="italic text-on-surface-variant font-body">Unlocking the editorial archives...</p>
          </div>
        ) : filteredNews.map((entry, i) => (
          <motion.article 
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl md:rounded-[2rem] border border-outline-variant/5 overflow-hidden shadow-2xl shadow-primary/5 flex flex-col group relative"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {entry.image_url ? (
                <img src={entry.image_url} alt={entry.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-container"><ImageIcon className="w-10 h-10 text-outline/30" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-end justify-between p-6 md:p-8">
                <div className="flex gap-3">
                  <button onClick={() => handleOpenModal(entry)} className="p-3 md:p-4 bg-white/90 backdrop-blur rounded-full text-primary hover:text-secondary hover:scale-110 transition-all shadow-xl"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(entry.id)} className="p-3 md:p-4 bg-white/90 backdrop-blur rounded-full text-primary hover:text-red-600 hover:scale-110 transition-all shadow-xl"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary font-label text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 bg-secondary/5 rounded-full border border-secondary/10">
                  {entry.category}
                </span>
                <span className="text-[9px] font-label text-on-surface-variant/40 uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" /> {new Date(entry.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                {entry.title}
              </h3>
              <p className="text-on-surface-variant font-body text-xs leading-relaxed line-clamp-3 mb-8 opacity-80 italic">
                {entry.excerpt}
              </p>
              <div className="mt-auto pt-6 border-t border-outline-variant/5 flex justify-between items-center text-[9px] font-label uppercase tracking-widest text-outline">
                <span className="flex items-center gap-2">By {entry.author || 'Atelier'}</span>
                <span className="font-black text-primary/40">ID // {entry.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-primary/60 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 30 }} 
              className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Preview Side */}
              <div className="w-full lg:w-2/5 bg-surface p-12 overflow-y-auto hidden lg:block">
                <h2 className="text-4xl font-headline font-black text-primary italic mb-10 leading-none">Journal Entry.</h2>
                <div className="space-y-8">
                  <div className="aspect-[16/10] bg-white rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10 group">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-outline gap-4 border-2 border-dashed border-outline-variant/20 m-4 rounded-2xl">
                        <ImageIcon className="w-12 h-12 opacity-10" />
                        <p className="text-[10px] font-label uppercase tracking-widest text-center px-10">Awaiting photographic narrative</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-label text-secondary font-black uppercase tracking-[0.3em]">{formData.category}</span>
                    <h3 className="text-2xl font-headline font-bold text-primary">{formData.title || 'Untitled Narrative'}</h3>
                    <p className="text-xs font-body text-on-surface-variant leading-relaxed italic">{formData.excerpt || 'Excerpt will appear here...'}</p>
                  </div>
                </div>
              </div>

              {/* Editor Side */}
              <div className="flex-1 p-10 lg:p-14 overflow-y-auto bg-white">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Headline</label>
                      <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-0 border-b-2 border-outline-variant/10 py-3 font-headline font-bold text-xl focus:ring-0 focus:border-primary transition-all" placeholder="Enter narrative title..." />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Classification</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border-0 border-b-2 border-outline-variant/10 py-4 font-label font-bold text-xs uppercase tracking-widest focus:ring-0 focus:border-primary transition-all cursor-pointer">
                        {NEWS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black block">Visual Assets</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <label className="flex-1 cursor-pointer group">
                        <div className="flex items-center gap-4 px-8 py-5 bg-surface rounded-2xl border border-outline-variant/10 group-hover:border-primary/30 transition-all">
                          {uploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 text-on-surface-variant group-hover:text-primary" />}
                          <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary">
                            {uploading ? 'Archiving asset...' : 'Upload Narrative Asset'}
                          </span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                      </label>
                      <input value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="flex-1 bg-surface border-0 border-b-2 border-outline-variant/10 px-6 py-4 font-body text-[10px] italic focus:ring-0 focus:border-primary transition-all" placeholder="Or provide direct HTTPS asset link..." />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Editorial Excerpt</label>
                    <textarea rows="2" required value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-surface-container-low/30 border-2 border-outline-variant/5 rounded-2xl p-6 font-body text-sm focus:ring-0 focus:border-primary focus:bg-white transition-all resize-none italic" placeholder="Brief summary for the news feed..." />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Narrative Content</label>
                    <textarea rows="6" required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-surface-container-low/30 border-2 border-outline-variant/5 rounded-2xl p-6 font-body text-sm focus:ring-0 focus:border-primary focus:bg-white transition-all resize-none leading-relaxed" placeholder="The full depth of the narrative..." />
                  </div>

                  <div className="flex gap-6 pt-6">
                    <button type="submit" disabled={loading || uploading} className="flex-grow bg-primary text-white py-6 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingEntry ? 'Commit Narrative' : 'Publish Narrative'}
                    </button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 py-6 border border-outline-variant/20 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] text-on-surface-variant hover:bg-surface-container-low transition-colors">Discard</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsFeed;
