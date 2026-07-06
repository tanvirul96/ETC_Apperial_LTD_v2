import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, ShoppingBag, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [search, category, products]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <main className="pt-32 pb-24 bg-surface noise-bg min-h-screen">
      <div className="container mx-auto px-6 md:px-16">
        <header className="mb-16">
          <span className="text-secondary font-label text-primary tracking-widest uppercase mb-4 block">The Collection</span>
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter font-headline mb-8"> Discover <span className="italic font-normal">Our Latest Styles.</span></h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-outline-variant/10">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-md focus:ring-2 focus:ring-primary/20 font-body text-sm"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-on-surface-variant flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest transition-all whitespace-nowrap ${category === cat ? 'bg-primary text-white shadow-lg' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {loading ? (
          <div className="py-20">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-surface-container-low rounded-lg overflow-hidden mb-6">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-white text-primary px-8 py-4 rounded-DEFAULT font-label font-bold text-[10px] uppercase tracking-widest shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3 h-3" /> Add to Bag
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-secondary font-label text-[10px] uppercase tracking-[0.2em] mb-2">{product.category}</span>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors cursor-pointer">{product.name}</h3>
                    <span className="font-headline font-bold text-primary">${parseFloat(product.price).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-body line-clamp-2 leading-relaxed">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-headline text-2xl text-on-surface-variant italic mb-8">No pieces found matching your criteria.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">Clear All Filters</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
