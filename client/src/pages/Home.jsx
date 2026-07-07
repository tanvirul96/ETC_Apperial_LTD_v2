import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Quote, Mail } from 'lucide-react';
import api from '../utils/api';

const Home = () => {
  const [news, setNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const slides = [
    {
      title: "Refining the Modern Silhouette.",
      subtitle: "Collection 2024",
      description: "An editorial journey through textile innovation and architectural tailoring. Crafted for the global curator who values silence over noise.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFEUfiXKuCs4XIVo0ZQLi6YKTn-LDS_pkNruKhP5Yu_z-xwGT56CMFcYORqNjT_wz58pWmEDLTrxxElMDqmcqc3kDFtUVau1OmhrQOXI-hx4yLP19U1p3RZKtyIVO3WrexQNvEUDoZZeL9dAFBD64Gc8dbBUKTlFtiK58BPQwOQAH_18c--J4gQOyMOe2kfhPrtsRuiLlXXP0lAtnjgdsCKQvhlZlwcMcaBTf_sMNCQiBwlEWiBRSTHCnt4dAt7QgFeeC10Mh-fDpW",
      italicPart: "Modern Silhouette."
    },
    {
      title: "Architectural Brutalist Detail.",
      subtitle: "Editorial Series",
      description: "A dialogue between structure and fluidity. Exploring the intersection of brutalist aesthetics and garment construction.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt7h06E9qDUKq9xalBzao-1lZAZNK0Kgu6VLGnKxCrlE2miNi7oxtpqkdB1nfaq8fDtpO-pehlLFpuYfIfBhm5rivJG1pc1mF-41PW3MFht7dlJSjjQ_cmHU42-yISdMPkogdjhQ1Dlm-7um0fZAeWU5JbT-FdGX_O47dG2pjLBDtSIm3VNWTBTtwXy3FdZW8FtmPKz6WU8s38_vmeEohAtFUWi6j9YyYhW_A0I5lhiyAi32Fp2Q_Sw15zaWBYL6Cn7AJQaTKbCaBR",
      italicPart: "Brutalist Detail."
    },
    {
      title: "High Fashion Narrative.",
      subtitle: "Archival Drops",
      description: "Tactile memories preserved in fiber. A curation of pieces that endure beyond the cycle of seasons.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9WlH5JDUbxluGtsNw7Wosolq2H6v3BjMkVFZLJrKMV8oN0qS-NwjOYkopQySW5YLR-tVM73gN-G4CIcfzacPboZwyiSxACV2yGnLGliyFwld5Fx5PySZgl63uIK0AQctFx_-ZwL29zBjPT9T7Oma6Nei095hXsqM5uD53j-kapSSG7lxNDuZzLPLI-qVd9KDMXQYfIiR0-1zG4H2beMwS4hX9fRzXOy6LHMldJPr0mSwtzM7w28GwByETfTItwWpB4BkRgGV9G-LA",
      italicPart: "Narrative."
    }
  ];

  const testimonials = [
    {
      quote: "ETC Apparel doesn't just sell clothing; they offer a perspective on how to move through the world with grace. The tactile quality of their wool trousers is simply unmatched.",
      author: "Julian Vane, Creative Director"
    },
    {
      quote: "From the stitching to the silhouette, every piece tells a story of mastery. ETC Apparel is where fashion meets quiet excellence.",
      author: "Amara Nwosu, Style Editor"
    },
    {
      quote: "Wearing ETC is a statement of intentionality. The craftsmanship transcends trends — these are garments you pass down.",
      author: "Soren Kjelberg, Architect"
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

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(testimonialTimer);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <main className="relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Hero Section */}
      <section className="h-screen w-full relative overflow-hidden bg-primary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img src={slides[currentSlide].image} className="w-full h-full object-cover grayscale-[20%]" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-20"></div>
            <div className="absolute inset-0 noise-texture opacity-30 z-20"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 h-full items-center z-30 relative pointer-events-none">
          <div className="md:col-span-7 pointer-events-auto">
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
              className="text-white font-headline text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter"
            >
              {slides[currentSlide].title.replace(slides[currentSlide].italicPart, '')}
              <span className="italic text-surface-container-high font-medium">{slides[currentSlide].italicPart}</span>
            </motion.h1>
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-on-primary-container font-body text-lg max-w-md mb-12 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Link to="/shop" className="px-8 py-4 editorial-gradient text-white rounded-lg font-bold tracking-wide flex items-center gap-2 group transition-all active:scale-95 shadow-2xl">
                Shop Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => document.getElementById('atelier-series').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                View Lookbook
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carousel Nav Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1 transition-all ${currentSlide === i ? 'bg-white' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-screen-2xl mx-auto bg-surface noise-bg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 items-center">
          <div className="md:col-span-5 flex flex-col justify-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-label font-bold tracking-widest uppercase text-xs mb-6 block"
            >
              Heritage
            </motion.span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight mb-8">
              A Legacy of <br />Quiet Authority
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body text-lg leading-relaxed max-w-md">
              <p>
                Founded in the pursuit of the perfect silhouette, ETC Apparel represents the intersection of
                traditional tailoring and modern utility. Our atelier works exclusively with natural fibers,
                sourced from generational mills.
              </p>
              <p>
                We believe that true luxury is found in the invisible details—the reinforced seam, the
                hand-finished buttonhole, and the way a fabric breathes against the skin.
              </p>
            </div>
            <div className="mt-12">
              <Link to="/about" className="inline-flex items-center gap-2 font-label uppercase tracking-widest text-sm text-secondary font-semibold hover:gap-4 transition-all">
                Our Story <ArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 relative">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-lg shadow-2xl"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAalLxfcyT0yY_oRq7th1Fzh_iIBrZvxlvMnz61vpd_yY_-81uyPcvjEYTQQKG2DwgODGOu4Tyumos7LY8qBx0BS1O20CJFiLXP3i8pskT4EUENpHd9szrqV_5JxvhcoEG1tjUjMyh4AKaJ5bldtvIod3_R39GaBOYcWHjFR-mzOQvnFVYmRsnoDDWQLmB4JqjDygBcjN0XW5pVHnTnRgT3D1WsGA2tUEWmy8cTxG4mIv7PqqHx-1tmQIuhYUJ3sEUrpwSCQEIOkHBv" className="w-full h-full object-cover" alt="Artisan hands" />
            </motion.div>
            <div className="absolute -bottom-8 -left-8 bg-surface-container-highest p-8 max-w-[240px] hidden md:block shadow-xl border border-outline-variant/10">
              <p className="font-headline italic text-tertiary text-xl leading-relaxed">"Craft is the memory of the hands."</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Atelier Series */}
      <section id="atelier-series" className="py-32 bg-surface-container-low relative noise-bg">
        <div className="container mx-auto px-8 md:px-16">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-4">The Atelier Series</h2>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            <Link to="/shop" className="font-label text-sm font-bold tracking-widest text-primary hover:text-secondary transition-colors flex items-center gap-2 group">
              BROWSE ALL COLLECTIONS
              <ArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[700px]">
            {/* Menswear - Left Column (Tall) */}
            <Link to="/shop" className="relative group overflow-hidden rounded-sm shadow-md h-[400px] md:h-full">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt7h06E9qDUKq9xalBzao-1lZAZNK0Kgu6VLGnKxCrlE2miNi7oxtpqkdB1nfaq8fDtpO-pehlLFpuYfIfBhm5rivJG1pc1mF-41PW3MFht7dlJSjjQ_cmHU42-yISdMPkogdjhQ1Dlm-7um0fZAeWU5JbT-FdGX_O47dG2pjLBDtSIm3VNWTBTtwXy3FdZW8FtmPKz6WU8s38_vmeEohAtFUWi6j9YyYhW_A0I5lhiyAi32Fp2Q_Sw15zaWBYL6Cn7AJQaTKbCaBR" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Menswear" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-8 text-white z-10">
                <p className="font-label text-[10px] tracking-[0.3em] mb-2 uppercase font-bold text-white/90">Curated for Him</p>
                <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">Menswear</h3>
              </div>
            </Link>

            {/* Right Column (Stacked) */}
            <div className="flex flex-col gap-4 md:gap-6 h-[600px] md:h-full">
              {/* Womenswear - Top Right (Wide) */}
              <Link to="/shop" className="relative group overflow-hidden rounded-sm shadow-md h-[280px] md:h-1/2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9WlH5JDUbxluGtsNw7Wosolq2H6v3BjMkVFZLJrKMV8oN0qS-NwjOYkopQySW5YLR-tVM73gN-G4CIcfzacPboZwyiSxACV2yGnLGliyFwld5Fx5PySZgl63uIK0AQctFx_-ZwL29zBjPT9T7Oma6Nei095hXsqM5uD53j-kapSSG7lxNDuZzLPLI-qVd9KDMXQYfIiR0-1zG4H2beMwS4hX9fRzXOy6LHMldJPr0mSwtzM7w28GwByETfTItwWpB4BkRgGV9G-LA" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt="Womenswear" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white z-10">
                  <p className="font-label text-[10px] tracking-[0.3em] mb-2 uppercase font-bold text-white/90">Curated for Her</p>
                  <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold">Womenswear</h3>
                </div>
              </Link>

              {/* Bottom Right (Two Squares) */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-[280px] md:h-1/2">
                {/* Accessories */}
                <Link to="/shop" className="relative group overflow-hidden rounded-sm shadow-md h-full">
                  <img src="/images/accessories.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Accessories" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
                    <h3 className="font-headline text-sm sm:text-base md:text-2xl font-bold">Accessories</h3>
                  </div>
                </Link>

                {/* Kids Collection */}
                <Link to="/shop" className="relative group overflow-hidden rounded-sm shadow-md h-full">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa5p-ctTWjDmLIndxEfCA8dt5Sx5WC-RQMRhBn2NrjXlSKOPlH-m0YnYFDB_uJvhE6df9Naks90uffU0MTaakIKa38aqwcBocfxoPS5VKoX40JLLtY6dWFLB0aMz3R_jFtXKCeCRV80Hb7LknxElUsv8imWvoHBwOqpMdjceAWgbLyhFE7EKFcNXccAnppY783dIxPjelPcEqkUqXtBwm3WKp3AEQhcivryAOziGjJ7Gs9kHizLyAIqNEM2grwMFHxcIzwN3cnjZvJ" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Kids Collection" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
                    <h3 className="font-headline text-sm sm:text-base md:text-2xl font-bold">Kids Collection</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Journals */}
      <section className="py-32 bg-white relative overflow-hidden noise-bg">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <div className="mb-24 flex flex-col items-center text-center">
            <span className="text-secondary font-label text-xs tracking-[0.5em] uppercase mb-4">Behind the Seams</span>
            <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl font-black text-primary italic mb-6">Studio Journals</h2>
            <p className="text-on-surface-variant max-w-xl font-body text-lg leading-relaxed">Craftsmanship stories, editorial insights, and the silent evolution of our latest collections.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {news.map((entry, index) => (
              <motion.article 
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`${index === 0 ? 'md:col-span-7' : 'md:col-span-5 md:pt-32'} group`}
              >
                <Link to={`/news/${entry.id}`} className="block w-full">
                  <div className="relative mb-10 overflow-hidden rounded-lg aspect-[16/10] shadow-xl">
                    <img src={entry.image_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={entry.title} />
                  </div>
                  <div className={`-mt-20 relative z-20 bg-white/90 backdrop-blur-sm p-6 md:p-8 w-auto mx-4 md:mx-0 ${index === 0 ? 'md:w-4/5 md:ml-12' : 'md:w-full'} shadow-2xl shadow-primary/5 rounded-lg border border-surface-container`}>
                    <span className="text-secondary font-label text-[10px] tracking-widest uppercase mb-4 block">{entry.category}</span>
                    <h3 className={`font-headline ${index === 0 ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'} font-bold mb-4 leading-tight text-primary hover:text-secondary transition-colors cursor-pointer`}>
                      {entry.title}
                    </h3>
                    <p className="text-on-surface-variant font-body mb-8 leading-relaxed line-clamp-3">{entry.excerpt}</p>
                    <div className="inline-block font-bold text-xs tracking-widest uppercase border-b-2 border-secondary pb-2 transition-all hover:border-primary">Read Narrative</div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute -right-20 top-0 text-[40rem] font-headline text-surface-container-low select-none opacity-50 z-0">E</div>
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <Quote className="text-secondary w-16 h-16 mx-auto mb-12 opacity-50" />
          <div className="relative h-64 md:h-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0"
              >
                <blockquote className="font-headline text-3xl md:text-4xl text-primary italic leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <cite className="not-italic font-label uppercase tracking-widest text-sm text-secondary font-bold">
                  {testimonials[currentTestimonial].author}
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentTestimonial === i ? 'bg-secondary w-6' : 'bg-outline-variant hover:bg-secondary'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-surface-container-highest relative overflow-hidden noise-bg">
        <div className="container mx-auto px-8 md:px-16 text-center max-w-3xl relative z-10">
          <h2 className="font-headline text-4xl font-bold text-primary mb-6 italic">Curate your inbox.</h2>
          <p className="text-on-surface-variant font-body mb-12">Receive exclusive access to atelier previews, limited archival drops, and editorial journals.</p>
          
          {newsletterSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-white/50 backdrop-blur-md rounded-lg border border-secondary/20">
              <p className="text-secondary font-headline text-2xl italic">✓ Thank you! You'll receive our next journal soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-8 py-5 bg-surface border-none focus:ring-1 focus:ring-secondary rounded-lg transition-all outline-none font-body shadow-sm"
              />
              <button type="submit" className="px-12 py-5 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-all uppercase tracking-widest text-xs shadow-xl active:scale-95">
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-6 text-xs text-on-surface-variant/60 font-label">By subscribing, you agree to our Privacy Policy.</p>
        </div>
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </section>
    </main>
  );
};

export default Home;
