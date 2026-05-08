import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../utils/api';

const Home = () => {
  const [news, setNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Silent Evolution of Craft.",
      subtitle: "Collection 2024",
      description: "Discover a curated series of architectural silhouettes and tactile heritage. Designed in London, crafted for the global citizen.",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80"
    },
    {
      title: "Tactile Minimalism.",
      subtitle: "Editorial Selects",
      description: "A dialogue between raw materials and refined aesthetics. Exploring the intersection of luxury and utility.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchLatestNews();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="h-screen w-full relative overflow-hidden bg-primary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={slides[currentSlide].image} className="w-full h-full object-cover opacity-60 grayscale-[30%]" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 h-full items-center z-30 relative">
          <div className="md:col-span-7">
            <motion.span
              key={`subtitle-${currentSlide}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-secondary tracking-[0.4em] text-xs uppercase font-label mb-6 block"
            >
              {slides[currentSlide].subtitle}
            </motion.span>
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8 font-headline"
            >
              {slides[currentSlide].title.split(' ').map((word, i) => (
                <span key={i} className={i % 3 === 2 ? 'italic font-normal text-secondary-container' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-primary-fixed/70 text-lg md:text-xl max-w-xl font-body leading-relaxed mb-12"
            >
              {slides[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/shop" className="editorial-gradient text-on-primary px-10 py-5 rounded-DEFAULT font-label font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:opacity-90 transition-all shadow-2xl">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="border border-white/20 text-white backdrop-blur-md px-10 py-5 rounded-DEFAULT font-label font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all">
                The Narrative
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-32 bg-surface noise-bg">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-secondary font-label text-xs tracking-widest uppercase mb-4 block">The Studio Journal</span>
              <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tighter font-headline">Studio <span className="italic font-normal">Narratives.</span></h2>
            </div>
            <Link to="/news" className="text-primary font-bold text-xs tracking-widest uppercase border-b-2 border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">View All Entries</Link>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {news.length > 0 ? (
              news.map((entry, index) => (
                <motion.article
                  key={entry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`${index === 0 ? 'col-span-12 md:col-span-7' : 'col-span-12 md:col-span-5 md:pt-32'} flex flex-col group`}
                >
                  <div className="relative mb-10 overflow-hidden rounded-lg aspect-[16/10]">
                    <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={entry.image_url} alt={entry.title} />
                  </div>
                  <div className={`px-4 -mt-20 relative z-20 bg-white/90 backdrop-blur-sm p-8 ${index === 0 ? 'md:w-4/5' : 'w-full'} shadow-2xl shadow-primary/5 rounded-lg ${index === 0 ? 'md:ml-12' : ''} border border-surface-container`}>
                    <span className="text-secondary font-label text-[10px] tracking-widest uppercase mb-4 block">{entry.category}</span>
                    <Link to="/news">
                      <h3 className={`font-headline ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold mb-4 leading-tight text-primary hover:text-secondary transition-colors cursor-pointer`}>
                        {entry.title}
                      </h3>
                    </Link>
                    <p className="text-on-surface-variant font-body mb-8 leading-relaxed line-clamp-3">{entry.excerpt}</p>
                    <Link to="/news" className="font-bold text-xs tracking-widest uppercase border-b-2 border-secondary pb-2 transition-all hover:border-primary">Read Narrative</Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-12 text-center py-20 italic text-on-surface-variant">Loading narratives...</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
