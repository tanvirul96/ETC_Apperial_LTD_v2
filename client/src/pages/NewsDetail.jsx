import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Share2, MessageCircle, Heart } from 'lucide-react';
import api from '../utils/api';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await api.get(`/news/${id}`);
        setEntry(response.data);
      } catch (err) {
        console.error('Error fetching narrative:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-outline italic">Opening Narrative Archive...</p>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="font-headline text-4xl font-bold text-primary mb-6 italic">Narrative Lost.</h2>
          <p className="text-on-surface-variant font-body mb-10 leading-relaxed">The requested journal entry could not be found in the archives. It may have been relocated or archived permanently.</p>
          <button onClick={() => navigate('/news')} className="editorial-gradient text-white px-10 py-5 rounded-full font-label font-bold text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
            Return to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/news" className="inline-flex items-center gap-3 text-primary font-label font-bold uppercase tracking-widest text-[10px] group">
            <div className="p-3 bg-white rounded-full shadow-lg group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Archives
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-secondary font-label text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1.5 bg-secondary/5 rounded-full border border-secondary/10">
                  {entry.category}
                </span>
                <span className="w-10 h-[1px] bg-primary/10"></span>
                <span className="text-[10px] font-label text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(entry.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-primary font-headline tracking-tighter leading-[1.1] mb-10">
                {entry.title}
              </h1>
              <div className="flex items-center gap-4 py-8 border-y border-outline-variant/10">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-headline text-lg font-black italic">E</div>
                <div>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/40 mb-0.5">Written By</p>
                  <p className="font-headline font-bold text-primary">{entry.author || 'Atelier Editorial Team'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl mb-16"
            >
              <img src={entry.image_url} alt={entry.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              <p className="font-headline text-2xl text-primary italic leading-relaxed mb-12 border-l-4 border-secondary pl-10 py-2">
                {entry.excerpt}
              </p>
              <div className="font-body text-on-surface-variant text-lg leading-[2] space-y-8 whitespace-pre-wrap">
                {entry.content}
              </div>
            </motion.div>

            {/* Post Footer */}
            <div className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-wrap gap-8 justify-between items-center">
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" /> Appreciate Narrative
                </button>
                <button className="flex items-center gap-2 text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" /> Share Collection
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-label uppercase tracking-widest text-outline">Collection Identity:</span>
                <span className="bg-surface-container px-4 py-2 rounded-full text-[10px] font-bold text-primary">#{entry.id.toString().padStart(4, '0')}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <div className="bg-white rounded-[2rem] p-10 border border-outline-variant/5 shadow-2xl shadow-primary/5">
              <h4 className="font-headline text-xl font-bold text-primary mb-8 border-b border-outline-variant/5 pb-6 italic">Latest Series.</h4>
              <div className="space-y-10">
                {/* Related posts or call to action */}
                <div className="group cursor-pointer">
                  <p className="text-secondary font-label text-[9px] font-black uppercase tracking-widest mb-2">Next Chapter</p>
                  <h5 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors mb-4 leading-tight">The Quiet Evolution of Hand-Stitched Silk.</h5>
                  <button onClick={() => navigate('/news')} className="flex items-center gap-2 text-[10px] font-label font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1 group-hover:border-secondary group-hover:text-secondary transition-all">Explore <ChevronRight className="w-3 h-3" /></button>
                </div>

                <div className="pt-10 mt-10 border-t border-outline-variant/10">
                  <div className="bg-primary text-white p-8 rounded-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                      <p className="font-label text-[9px] uppercase tracking-[0.4em] mb-4">Newsletter</p>
                      <h5 className="font-headline text-xl font-black italic mb-6 leading-tight">Curate your editorial feed.</h5>
                      <input 
                        placeholder="Your digital address"
                        className="w-full bg-white/10 border-0 border-b border-white/20 py-3 text-xs font-body mb-6 focus:ring-0 focus:border-white transition-all placeholder:text-white/40"
                      />
                      <button className="w-full bg-white text-primary py-4 rounded-lg font-label font-bold uppercase tracking-widest text-[9px] hover:bg-secondary hover:text-white transition-all shadow-xl">Secure Access</button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-10 -translate-y-10 rounded-3xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Internal icon for the next chapter
const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default NewsDetail;
