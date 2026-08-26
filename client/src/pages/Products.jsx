import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { productCategories } from '../data/products';
import api from '../utils/api';

/* ── tiny helper: random stagger so cards feel organic ── */
const stagger = (i) => ({ delay: i * 0.04 });

/* ── animation presets ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], ...stagger(i) },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], ...stagger(i) },
  }),
};

/* ── Product item card with hover zoom & full view button ── */
const ProductCard = ({ product, category, onSelect, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={scaleIn}
      initial="hidden"
      animate="show"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(product)}
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white border border-outline-variant/10 shadow-sm transition-all duration-300"
      style={{
        boxShadow: hovered
          ? `0 20px 40px -15px ${category.accent}33`
          : '0 2px 10px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
          }}
          loading="lazy"
        />

        {/* Hover zoom glass overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white/90 backdrop-blur px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg"
              >
                {/* Search / Magnify Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="font-label text-[11px] uppercase tracking-widest font-bold text-primary">
                  Full View
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Info */}
      <div className="p-4 relative">
        {/* Left colored accent stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
          style={{
            background: category.accent,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        <div className="flex items-start gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-transform duration-300"
            style={{
              background: category.accent,
              transform: hovered ? 'scale(1.4)' : 'scale(1)',
            }}
          />
          <h3
            className="font-body text-[14px] font-semibold leading-snug transition-colors duration-200"
            style={{ color: hovered ? category.accent : '#1d1b19' }}
          >
            {product.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Category section ── */
const CategorySection = ({ category, sectionIndex, onSelectProduct }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.section
      ref={ref}
      custom={sectionIndex}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="mb-14"
    >
      {/* category header */}
      <div
        className="flex items-center justify-between mb-6 cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
        role="button"
        aria-expanded={expanded}
      >
        <div>
          <h2
            className="font-headline text-xl md:text-2xl font-bold leading-tight"
            style={{ color: '#171e29' }}
          >
            {category.name}
          </h2>
        </div>

        {/* toggle */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: `${category.accent}15`, color: category.accent }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* thin category colour bar */}
      <div
        className="h-px mb-6 rounded-full"
        style={{ background: `linear-gradient(90deg, ${category.accent}55, transparent)` }}
      />

      {/* product cards grid */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.items.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={category}
                  onSelect={onSelectProduct}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

/* ── Floating background decoration ── */
const Decoration = ({ x, y, size, color, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, delay, ease: 'easeOut' }}
  />
);

/* ══════════════════════════════════════════════════════════
    MAIN PAGE COMPONENT
══════════════════════════════════════════════════════════ */
const Products = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setDbProducts(response.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const activeCategoryList = useMemo(() => {
    const ALLOWED_CATEGORIES = [
      {
        id: 'mens-wear',
        name: 'Mens Wear',
        icon: '🧵',
        accent: '#885203',
        description: 'Curated menswear and tailoring from our atelier.',
      },
      {
        id: 'kids-collection',
        name: 'Kids Collection',
        icon: '🪢',
        accent: '#6a1b9a',
        description: 'Curated kids collection and activewear from our atelier.',
      },
      {
        id: 'ladies-wear',
        name: 'Ladies Wear',
        icon: '🪡',
        accent: '#3c5a96',
        description: 'Curated ladies wear and knitwear from our atelier.',
      },
    ];

    if (!dbProducts || dbProducts.length === 0) {
      return productCategories
        .filter((cat) => ['mens-wear', 'kids-collection', 'ladies-wear'].includes(cat.id))
        .map((cat) => ({
          ...cat,
          name: cat.id === 'kids-collection' ? 'Kids Collection' : cat.name,
        }));
    }

    const catMap = {
      'mens-wear': { ...ALLOWED_CATEGORIES[0], items: [] },
      'kids-collection': { ...ALLOWED_CATEGORIES[1], items: [] },
      'ladies-wear': { ...ALLOWED_CATEGORIES[2], items: [] },
    };

    dbProducts.forEach((p) => {
      const rawCat = (p.category || '').trim().toLowerCase();

      // Explicitly ignore / remove Archive, Outerwear, Apparel, and others
      if (['archive', 'outerwear', 'apparel', 'others', 'general'].includes(rawCat)) {
        return;
      }

      if (['men', 'mens', 'mens wear', 'mens-wear', 'male'].includes(rawCat)) {
        catMap['mens-wear'].items.push({
          id: p.id,
          name: p.name,
          image: p.image_url,
          price: p.price,
          description: p.description,
        });
      } else if (['kid', 'kids', 'kids wear', 'kids-wear', 'kids collection', 'kids-collection', 'boy', 'boys', 'girl', 'girls'].includes(rawCat)) {
        catMap['kids-collection'].items.push({
          id: p.id,
          name: p.name,
          image: p.image_url,
          price: p.price,
          description: p.description,
        });
      } else if (['women', 'womens', 'ladies', 'ladies wear', 'ladies-wear', 'female'].includes(rawCat)) {
        catMap['ladies-wear'].items.push({
          id: p.id,
          name: p.name,
          image: p.image_url,
          price: p.price,
          description: p.description,
        });
      }
    });

    const populated = ALLOWED_CATEGORIES.map((def) => catMap[def.id]).filter(
      (cat) => cat.items.length > 0
    );

    // Fallback to static catalog if DB has no items matching the allowed categories
    if (populated.length === 0) {
      return productCategories
        .filter((cat) => ['mens-wear', 'kids-collection', 'ladies-wear'].includes(cat.id))
        .map((cat) => ({
          ...cat,
          name: cat.id === 'kids-collection' ? 'Kids Collection' : cat.name,
        }));
    }

    return populated;
  }, [dbProducts]);

  /* Filtered categories */
  const filteredCategories = activeCategoryList
    .filter((cat) => activeFilter === 'all' || cat.id === activeFilter)
    .map((cat) => ({
      ...cat,
      items: searchQuery.trim()
        ? cat.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : cat.items,
    }))
    .filter((cat) => cat.items.length > 0);

  const totalProducts = activeCategoryList.reduce((acc, c) => acc + c.items.length, 0);

  // Helper to find the parent category of the selected product
  const getSelectedProductCategory = () => {
    if (!selectedProduct) return null;
    return activeCategoryList.find((cat) =>
      cat.items.some((item) => item.id === selectedProduct.id)
    );
  };

  const selectedCategory = getSelectedProductCategory();

  return (
    <div className="relative min-h-screen bg-surface overflow-hidden">
      {/* ── decorative blobs ── */}
      <Decoration x="-6%" y="4%" size="380px" color="rgba(136,82,3,0.06)" delay={0} />
      <Decoration x="78%" y="8%" size="260px" color="rgba(60,90,150,0.05)" delay={0.3} />
      <Decoration x="50%" y="55%" size="340px" color="rgba(46,125,50,0.04)" delay={0.6} />

      {/* ═══════════════ HERO SECTION (COMPACT & SLEEK) ═══════════════ */}
      <section
        className="relative pt-24 pb-5 px-6 md:px-16 overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #171e29 0%, #2c333f 60%, #1a1f2b 100%)',
        }}
      >
        {/* noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* gold accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: 'linear-gradient(180deg, #885203, #feb564, transparent)' }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="container mx-auto relative z-10 max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            {/* eyebrow label */}
            <motion.p
              className="font-label text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-1"
              style={{ color: '#ffb86b' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ETC Apparel Ltd · Buying House
            </motion.p>

            <motion.h1
              className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Product <span style={{ color: '#feb564' }}>Catalogue</span>
            </motion.h1>
          </div>

          <motion.p
            className="font-label text-xs text-white/60 tracking-wider hidden sm:block pb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our curated apparel collections
          </motion.p>
        </div>

        {/* bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #fef8f4)' }}
        />
      </section>

      {/* ═══════════════ FILTER & SEARCH BAR ═══════════════ */}
      <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-outline-variant/10 py-4 px-6 md:px-16 shadow-sm">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* category filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full font-label text-[11px] uppercase tracking-widest font-bold border transition-all duration-200 ${activeFilter === 'all'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-on-surface-variant border-outline-variant/40 hover:border-primary/40 hover:text-primary'
                }`}
            >
              All
            </button>
            {activeCategoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full font-label text-[11px] uppercase tracking-widest font-bold border transition-all duration-200 whitespace-nowrap ${activeFilter === cat.id
                  ? 'text-white border-transparent'
                  : 'bg-white text-on-surface-variant border-outline-variant/40 hover:border-opacity-60'
                  }`}
                style={
                  activeFilter === cat.id
                    ? { background: cat.accent, borderColor: cat.accent }
                    : {}
                }
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* search */}
          <div className="relative flex-shrink-0 w-full sm:w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2 rounded-full border border-outline-variant/30 bg-surface-container-low font-label text-[13px] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT GRID ═══════════════ */}
      <main className="container mx-auto max-w-7xl px-6 md:px-16 py-16">
        <AnimatePresence mode="wait">
          {filteredCategories.length > 0 ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCategories.map((category, idx) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  sectionIndex={idx}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                No products found
              </h3>
              <p className="text-on-surface-variant font-label text-sm max-w-xs">
                Try a different search term or select "All" to browse everything.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="mt-6 px-8 py-3 rounded-full editorial-gradient text-white font-label text-[11px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section
        className="mx-6 md:mx-16 mb-16 rounded-3xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, #171e29 0%, #885203 100%)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 px-10 py-14 text-center max-w-2xl mx-auto">
          <p className="font-label text-[11px] uppercase tracking-[0.35em] text-secondary-fixed-dim mb-4">
            Ready to source?
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Request a Quote or Sample Today
          </h2>
          <p className="font-body text-white/60 text-sm md:text-base mb-8 leading-relaxed">
            Our sourcing team is ready to assist you with bulk inquiries,
            custom specifications, and sample orders.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 rounded-full bg-white font-label text-[11px] uppercase tracking-widest font-bold text-primary hover:bg-secondary-fixed-dim transition-colors duration-300 shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* ═══════════════ PRODUCT FULL VIEW MODAL ═══════════════ */}
      <AnimatePresence>
        {selectedProduct && selectedCategory && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-md"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto pointer-events-none">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative w-auto h-auto max-w-[95vw] md:max-w-[90vw] lg:max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto border border-outline-variant/10 flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Left side: Full Resolution Image View */}
                <div className="relative w-full md:w-auto h-auto min-w-0 flex items-center justify-center overflow-hidden bg-surface-container-low">
                  <img
                    src={selectedProduct.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'}
                    alt={selectedProduct.name}
                    className="w-auto h-auto max-w-full max-h-[50vh] md:max-h-[85vh] object-contain"
                  />
                </div>

                {/* Right side: Information */}
                <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 p-6 md:p-8 flex flex-col justify-center overflow-y-auto bg-white">
                  <div>
                    {/* Category Label */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="font-label text-[11px] uppercase tracking-[0.2em] font-bold"
                        style={{ color: selectedCategory.accent }}
                      >
                        {selectedCategory.name}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h2 className="font-headline text-2xl md:text-3xl font-black text-primary leading-tight mb-4">
                      {selectedProduct.name}
                    </h2>

                    <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                      {selectedProduct.description || `Premium quality ${selectedProduct.name.toLowerCase()} sourced by ETC Apparel Ltd. Specially designed and constructed to meet international standards for global brands.`}
                    </p>

                    {/* Spec features placeholder */}

                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2.5">
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
