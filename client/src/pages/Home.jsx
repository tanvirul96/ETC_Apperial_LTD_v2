import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Quote, Mail, Globe, Factory, ShieldCheck, Truck, Layers, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { productCategories } from '../data/products';
import api from '../utils/api';

const slides = [
  {
    title: "Refining the Modern Silhouette.",
    subtitle: "",
    description: "An editorial journey through textile innovation and architectural tailoring. Crafted for the global curator who values silence over noise.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFEUfiXKuCs4XIVo0ZQLi6YKTn-LDS_pkNruKhP5Yu_z-xwGT56CMFcYORqNjT_wz58pWmEDLTrxxElMDqmcqc3kDFtUVau1OmhrQOXI-hx4yLP19U1p3RZKtyIVO3WrexQNvEUDoZZeL9dAFBD64Gc8dbBUKTlFtiK58BPQwOQAH_18c--J4gQOyMOe2kfhPrtsRuiLlXXP0lAtnjgdsCKQvhlZlwcMcaBTf_sMNCQiBwlEWiBRSTHCnt4dAt7QgFeeC10Mh-fDpW",
    italicPart: "Modern Silhouette."
  },
  {
    title: "Architectural Brutalist Detail.",
    subtitle: "",
    description: "A dialogue between structure and fluidity. Exploring the intersection of brutalist aesthetics and garment construction.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt7h06E9qDUKq9xalBzao-1lZAZNK0Kgu6VLGnKxCrlE2miNi7oxtpqkdB1nfaq8fDtpO-pehlLFpuYfIfBhm5rivJG1pc1mF-41PW3MFht7dlJSjjQ_cmHU42-yISdMPkogdjhQ1Dlm-7um0fZAeWU5JbT-FdGX_O47dG2pjLBDtSIm3VNWTBTtwXy3FdZW8FtmPKz6WU8s38_vmeEohAtFUWi6j9YyYhW_A0I5lhiyAi32Fp2Q_Sw15zaWBYL6Cn7AJQaTKbCaBR",
    italicPart: "Brutalist Detail."
  },
  {
    title: "High Fashion Narrative.",
    subtitle: "",
    description: "Tactile memories preserved in fiber. A curation of pieces that endure beyond the cycle of seasons.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9WlH5JDUbxluGtsNw7Wosolq2H6v3BjMkVFZLJrKMV8oN0qS-NwjOYkopQySW5YLR-tVM73gN-G4CIcfzacPboZwyiSxACV2yGnLGliyFwld5Fx5PySZgl63uIK0AQctFx_-ZwL29zBjPT9T7Oma6Nei095hXsqM5uD53j-kapSSG7lxNDuZzLPLI-qVd9KDMXQYfIiR0-1zG4H2beMwS4hX9fRzXOy6LHMldJPr0mSwtzM7w28GwByETfTItwWpB4BkRgGV9G-LA",
    italicPart: "Narrative."
  },
  {
    title: "Quality, We Never Compromise.",
    subtitle: "",
    description: "Every thread, every seam, every finish — held to the highest standard. Because our youngest customers deserve nothing less than perfection.",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1600&auto=format&fit=crop",
    italicPart: "We Never Compromise."
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

const Home = () => {
  const [news, setNews] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setDbProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchLatestNews();
    fetchProducts();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(slideTimer);
  }, [currentSlide]);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialTimer);
  }, [currentTestimonial]);

  const activeCategories = useMemo(() => {
    if (!dbProducts || dbProducts.length === 0) {
      return productCategories;
    }
    const catMap = {
      'Mens Wear': { name: 'Mens Wear', items: [] },
      'Kids Collection': { name: 'Kids Collection', items: [] },
      'Ladies Wear': { name: 'Ladies Wear', items: [] },
    };

    dbProducts.forEach((p) => {
      const rawCat = (p.category || '').trim().toLowerCase();
      if (['archive', 'outerwear', 'apparel', 'others', 'general'].includes(rawCat)) {
        return;
      }

      if (['men', 'mens', 'mens wear', 'mens-wear', 'male'].includes(rawCat)) {
        catMap['Mens Wear'].items.push({
          id: p.id,
          name: p.name,
          image: p.image_url,
        });
      } else if (['kid', 'kids', 'kids wear', 'kids-wear', 'kids collection', 'kids-collection', 'boy', 'boys', 'girl', 'girls'].includes(rawCat)) {
        catMap['Kids Collection'].items.push({
          id: p.id,
          name: p.name,
          image: p.image_url,
        });
      } else if (['women', 'womens', 'ladies', 'ladies wear', 'ladies-wear', 'female'].includes(rawCat)) {
        catMap['Ladies Wear'].items.push({
          id: p.id,
          name: p.name,
          image: p.image_url,
        });
      }
    });

    const populated = Object.values(catMap).filter((cat) => cat.items.length > 0);
    return populated.length > 0 ? populated : productCategories;
  }, [dbProducts]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  const activeSlideIndex = ((currentSlide % slides.length) + slides.length) % slides.length;
  const activeSlide = slides[activeSlideIndex];

  const activeTestimonialIndex = ((currentTestimonial % testimonials.length) + testimonials.length) % testimonials.length;
  const activeTestimonial = testimonials[activeTestimonialIndex];

  return (
    <main className="relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Hero Section */}
      <section className="h-screen w-full relative overflow-hidden bg-primary">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img src={activeSlide.image} className="w-full h-full object-cover grayscale-[20%]" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-20"></div>
            <div className="absolute inset-0 noise-texture opacity-30 z-20"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 h-full items-center z-30 relative pointer-events-none">
          <div className="md:col-span-7 pointer-events-auto">
            {activeSlide.subtitle && (
              <motion.span
                key={`subtitle-${activeSlideIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-secondary tracking-[0.4em] text-xs uppercase font-label mb-6 block"
              >
                {activeSlide.subtitle}
              </motion.span>
            )}
            <motion.h1
              key={`title-${activeSlideIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white font-headline text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter"
            >
              {activeSlide.title.replace(activeSlide.italicPart, '')}
              <span className="italic text-surface-container-high font-medium">{activeSlide.italicPart}</span>
            </motion.h1>
            <motion.p
              key={`desc-${activeSlideIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-on-primary-container font-body text-lg max-w-md mb-12 leading-relaxed"
            >
              {activeSlide.description}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              {/* <Link to="/shop" className="px-8 py-4 editorial-gradient text-white rounded-lg font-bold tracking-wide flex items-center gap-2 group transition-all active:scale-95 shadow-2xl">
                Shop Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('atelier-series').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                View Lookbook
              </button> */}
            </motion.div>
          </div>
        </div>

        {/* Carousel Nav Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1 transition-all ${activeSlideIndex === i ? 'bg-white' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* Sourcing Bridge & Value Proposition Section (Option 1 & 2 Merged) */}
      <section className="py-24 lg:py-32 bg-primary text-white relative overflow-hidden noise-bg">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-0 text-[26rem] font-headline text-white/[0.02] select-none pointer-events-none">ETC</div>

        <div className="container mx-auto px-6 md:px-16 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-secondary-fixed-dim" />
              <span className="font-label text-[10px] md:text-xs uppercase tracking-[0.25em] text-secondary-fixed-dim font-bold">
                UK-Bangladesh Apparel Sourcing Bridge
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Built to Build Your <span className="italic font-normal text-secondary-fixed-dim">Clothing Business.</span>
            </h2>
            <p className="font-body text-base md:text-lg text-on-primary-container leading-relaxed">
              We connect global fashion vision with industrial manufacturing mastery. Operating between London and Dhaka, we empower apparel brands, high-street retailers, and scaling designers with transparent end-to-end sourcing, certified ethical production, and uncompromising craftsmanship.
            </p>
          </div>

          {/* Core Capabilities Grid (Option 1 Core) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 hover:border-secondary/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed-dim mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-secondary-fixed-dim transition-colors">
                  Design & Sampling
                </h3>
                <p className="font-body text-xs md:text-sm text-on-primary-container leading-relaxed mb-6">
                  London creative insight paired with precision 3D CLO virtual prototyping and rapid physical counter-samples for accurate fit approval.
                </p>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Rapid Fit Approvals
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 hover:border-secondary/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed-dim mb-6 group-hover:scale-110 transition-transform">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-secondary-fixed-dim transition-colors">
                  Certified Production
                </h3>
                <p className="font-body text-xs md:text-sm text-on-primary-container leading-relaxed mb-6">
                  Dedicated high-efficiency lines for Woven, Circular Knitwear, Denim, and Kids collections across tier-1 compliant factories.
                </p>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> BSCI & WRAP Aligned
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 hover:border-secondary/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed-dim mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-secondary-fixed-dim transition-colors">
                  Quality Assurance
                </h3>
                <p className="font-body text-xs md:text-sm text-on-primary-container leading-relaxed mb-6">
                  On-site QA engineers execute continuous inline checks, AQL 2.5 final audits, and 100% metal/needle detection before dispatch.
                </p>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Quality Compromise
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 hover:border-secondary/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed-dim mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-secondary-fixed-dim transition-colors">
                  Global Logistics
                </h3>
                <p className="font-body text-xs md:text-sm text-on-primary-container leading-relaxed mb-6">
                  Seamless freight management (FOB, CIF, DDP) providing real-time cargo visibility right to your European or UK distribution center.
                </p>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed-dim font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> On-Time Global Dispatch
              </span>
            </motion.div>
          </div>

          {/* Value Proposition & Key Metrics Banner (Option 2 Merged) */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary-fixed-dim font-bold block mb-3">
                  Why Fashion Brands Partner With ETC
                </span>
                <h3 className="font-headline text-2xl md:text-3xl font-black mb-4 leading-tight">
                  Flexible Scaling, Factory Direct Pricing & Material Innovation.
                </h3>
                <p className="font-body text-sm text-on-primary-container leading-relaxed mb-6">
                  Whether you are launching a capsule collection requiring flexible MOQs or scaling multi-thousand piece retail orders, our dual UK-Bangladesh teams eliminate middleman markups while granting you direct access to GOTS organic cotton, recycled fibers, and eco-wash technologies.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="bg-secondary text-white px-7 py-3.5 rounded font-label text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:opacity-90 transition-all inline-flex items-center gap-2"
                  >
                    Start Sourcing Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="border border-white/20 text-white px-6 py-3.5 rounded font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all"
                  >
                    Discover Our Story
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-headline text-3xl font-black text-secondary-fixed-dim block mb-1">15M+</span>
                  <span className="font-label text-[11px] uppercase tracking-wider text-white/80 font-bold block">Annual Capacity</span>
                  <span className="font-body text-[10px] text-on-primary-container">Pieces per year</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-headline text-3xl font-black text-secondary-fixed-dim block mb-1">100%</span>
                  <span className="font-label text-[11px] uppercase tracking-wider text-white/80 font-bold block">Ethically Audited</span>
                  <span className="font-body text-[10px] text-on-primary-container">BSCI, WRAP & Accord</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-headline text-3xl font-black text-secondary-fixed-dim block mb-1">99.2%</span>
                  <span className="font-label text-[11px] uppercase tracking-wider text-white/80 font-bold block">On-Time Delivery</span>
                  <span className="font-body text-[10px] text-on-primary-container">Reliable supply chain</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-headline text-3xl font-black text-secondary-fixed-dim block mb-1">UK & BD</span>
                  <span className="font-label text-[11px] uppercase tracking-wider text-white/80 font-bold block">Dual Presence</span>
                  <span className="font-body text-[10px] text-on-primary-container">London & Dhaka teams</span>
                </div>
              </div>
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
            <Link to="/products" className="font-label text-sm font-bold tracking-widest text-primary hover:text-secondary transition-colors flex items-center gap-2 group">
              BROWSE ALL PRODUCTS
              <ArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[700px]">
            {/* Left Column (Tall) - Index 0 */}
            {activeCategories[0] && (
              <Link to="/products" className="relative group overflow-hidden rounded-sm shadow-md h-[400px] md:h-full">
                <img src={activeCategories[0].items[0]?.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={activeCategories[0].name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-8 text-white z-10">
                  <p className="font-label text-[10px] tracking-[0.3em] mb-2 uppercase font-bold text-white/90">Featured Collection</p>
                  <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">{activeCategories[0].name}</h3>
                </div>
              </Link>
            )}

            {/* Right Column (Stacked) */}
            <div className="flex flex-col gap-4 md:gap-6 h-[600px] md:h-full">
              {/* Top Right (Wide) - Index 1 */}
              {activeCategories[1] && (
                <Link to="/products" className="relative group overflow-hidden rounded-sm shadow-md h-[280px] md:h-1/2">
                  <img src={activeCategories[1].items[0]?.image} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt={activeCategories[1].name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white z-10">
                    <p className="font-label text-[10px] tracking-[0.3em] mb-2 uppercase font-bold text-white/90">Curated Edit</p>
                    <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold">{activeCategories[1].name}</h3>
                  </div>
                </Link>
              )}

              {/* Bottom Right (Two Squares) - Index 2 and 3 */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-[280px] md:h-1/2">
                {activeCategories[2] && (
                  <Link to="/products" className="relative group overflow-hidden rounded-sm shadow-md h-full">
                    <img src={activeCategories[2].items[0]?.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={activeCategories[2].name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
                      <h3 className="font-headline text-sm sm:text-base md:text-2xl font-bold">{activeCategories[2].name}</h3>
                    </div>
                  </Link>
                )}

                {activeCategories[3] && (
                  <Link to="/products" className="relative group overflow-hidden rounded-sm shadow-md h-full">
                    <img src={activeCategories[3].items[0]?.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={activeCategories[3].name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
                      <h3 className="font-headline text-sm sm:text-base md:text-2xl font-bold">{activeCategories[3].name}</h3>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - ETC Apparel Limited Buying Hub & Exporter */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-screen-2xl mx-auto bg-surface noise-bg relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] md:text-[24rem] font-headline text-surface-container-high/30 select-none pointer-events-none -z-0">
          ETC
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column: Narrative & Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-headline text-3xl sm:text-4xl lg:text-5xl text-primary font-bold leading-[1.18] mb-8 tracking-tight"
            >
              Multinational Apparel Buying Hub & Exporter <br />
              <span className="italic font-serif font-normal text-secondary">from Fabrics to Fashion.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-on-surface-variant font-body text-base lg:text-lg leading-relaxed"
            >
              <p>
                <strong className="text-primary font-semibold">ETC Apparel Limited</strong> is a Multinational apparel buying hub and exporter with a vision to deliver world-class service, quality solutions and value addition services to end products for the textile industries on a global level, beginning from fabrics to fashion through market knowledge, experienced sourcing professionals. Global corporate office located at <strong className="text-primary font-semibold">Dhaka, Bangladesh</strong>. Our design. ETC Sourcing offers product sourcing, amazing design collection, best production execution with on-time shipment, best quality assurance, supply chain solutions towards building a stake holding approach to business.
              </p>
              <p>
                We are associated with top rated factories (Woven, Jersey and Knitwear) in Bangladesh who are highly organized, qualified, for quality and on-time product, and of course compliance certified. We have few green certified factories as well. We have a dynamic, talented, and well-experienced team working with us and a great office structure, including fabric sourcing, garment technology & compliance.
              </p>
            </motion.div>

            {/* Quick Value Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 pt-8 border-t border-outline-variant/15"
            >
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-secondary/30 transition-colors">
                <span className="block font-headline text-base sm:text-lg font-bold text-primary mb-0.5">Woven & Knit</span>
                <span className="font-label text-[11px] text-on-surface-variant block uppercase tracking-wider">Top-Rated Factories</span>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-secondary/30 transition-colors">
                <span className="block font-headline text-base sm:text-lg font-bold text-emerald-700 mb-0.5">Green Certified</span>
                <span className="font-label text-[11px] text-on-surface-variant block uppercase tracking-wider">Eco & Compliant</span>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-secondary/30 transition-colors">
                <span className="block font-headline text-base sm:text-lg font-bold text-primary mb-0.5">Dhaka, BD</span>
                <span className="font-label text-[11px] text-on-surface-variant block uppercase tracking-wider">Corporate Office</span>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-secondary/30 transition-colors">
                <span className="block font-headline text-base sm:text-lg font-bold text-primary mb-0.5">End-to-End</span>
                <span className="font-label text-[11px] text-on-surface-variant block uppercase tracking-wider">Fabrics to Fashion</span>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white rounded font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary transition-all shadow-md group"
              >
                Our Full Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-primary/20 text-primary rounded font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary/5 transition-all"
              >
                Connect With Us
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] bg-surface-container-low overflow-hidden rounded-2xl shadow-2xl border border-outline-variant/15 group"
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="ETC Apparel Sourcing and Textile Production"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

              {/* Floating Caption inside image */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <span className="font-label text-[10px] uppercase tracking-[0.25em] text-secondary-fixed-dim font-bold block mb-1">
                  Global Manufacturing Network
                </span>
                <p className="font-headline italic text-lg sm:text-xl text-white/95 leading-snug">
                  "Beginning from fabrics to fashion through market knowledge & experienced sourcing."
                </p>
              </div>
            </motion.div>

            {/* Floating Location Card (Bottom-Right / Offset) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-primary text-white p-4 sm:p-5 rounded-xl shadow-2xl border border-white/10 hidden sm:flex items-center gap-3.5 max-w-[280px] z-20"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-secondary-fixed-dim flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary-fixed-dim font-bold block">
                  Corporate Headquarters
                </span>
                <span className="font-headline text-sm font-bold text-white block leading-tight">
                  Dhaka, Bangladesh
                </span>
              </div>
            </motion.div>
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
                key={activeTestimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0"
              >
                <blockquote className="font-headline text-3xl md:text-4xl text-primary italic leading-relaxed mb-8">
                  "{activeTestimonial.quote}"
                </blockquote>
                <cite className="not-italic font-label uppercase tracking-widest text-sm text-secondary font-bold">
                  {activeTestimonial.author}
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${activeTestimonialIndex === i ? 'bg-secondary w-6' : 'bg-outline-variant hover:bg-secondary'}`}
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
