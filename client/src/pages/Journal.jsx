import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import api from '../utils/api';

const Journal = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
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
    fetchNews();
  }, []);

  const categories = ['All', ...new Set(news.map(n => n.category))];
  const filteredNews = filter === 'All' ? news : news.filter(n => n.category === filter);

  return (
    <main className="pt-32 pb-24 bg-surface noise-bg min-h-screen">
      <div className="container mx-auto px-6 md:px-16">
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-secondary font-label text-xs tracking-widest uppercase mb-4 block"
          >
            The Atelier Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-primary tracking-tighter font-headline mb-8"
          >
            Studio <span className="italic font-normal">Narratives.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-on-surface-variant font-body leading-relaxed"
          >
            Exploring the intersection of heritage craftsmanship, architectural innovation, and the evolving language of modern apparel.
          </motion.p>
        </header>

        <div className="flex justify-center gap-4 mb-20 overflow-x-auto no-scrollbar pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-label font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-white shadow-xl' : 'bg-white border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center italic text-on-surface-variant">Opening the archives...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {filteredNews.map((entry, i) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 2) * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-8 shadow-2xl shadow-primary/5">
                  <img src={entry.image_url} alt={entry.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-label font-bold uppercase tracking-widest text-primary shadow-lg">{entry.category}</span>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-6 mb-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant/60">
                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-2"><User className="w-3 h-3" /> Editorial Team</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-6 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                    {entry.title}
                  </h2>
                  <p className="text-on-surface-variant font-body leading-relaxed mb-8 line-clamp-3">
                    {entry.excerpt}
                  </p>
                  <button className="flex items-center gap-3 text-primary font-label font-bold uppercase tracking-widest text-[10px] border-b-2 border-primary/20 pb-2 group-hover:border-secondary group-hover:text-secondary transition-all">
                    Read Narrative <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredNews.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-headline text-2xl text-on-surface-variant italic">No narratives found in this collection.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Journal;
