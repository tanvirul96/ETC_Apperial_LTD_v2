import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Upload, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image_url: ''
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image_url: product.image_url
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: '', price: '', stock: '', description: '', image_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this piece from inventory?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">Inventory <span className="italic font-normal">Vault.</span></h1>
          <p className="text-on-surface-variant font-body">Manage your global product catalog and stock levels.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Piece
        </button>
      </header>

      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <input 
          type="text"
          placeholder="Search vault..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/10 rounded-lg focus:ring-2 focus:ring-primary/20 font-body text-sm"
        />
      </div>

      <div className="bg-white rounded-xl border border-outline-variant/10 overflow-hidden shadow-sm shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Product</th>
                <th className="px-6 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Category</th>
                <th className="px-6 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Price</th>
                <th className="px-6 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center">Stock</th>
                <th className="px-8 py-5 text-right font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {loading && products.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-12 text-center italic text-on-surface-variant">Accessing inventory...</td></tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-surface-container-low rounded overflow-hidden flex-shrink-0">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-primary leading-tight">{product.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-label mt-1">ID: #ETC-{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-label text-on-surface-variant uppercase tracking-widest">{product.category}</td>
                  <td className="px-6 py-5 font-headline font-bold text-secondary text-sm">${parseFloat(product.price).toFixed(2)}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${product.stock > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(product)} className="p-2 text-on-surface-variant hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-on-surface-variant hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl p-10 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-headline font-bold text-primary">{editingProduct ? 'Edit Piece' : 'Add New Piece'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-on-surface-variant" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Product Name</label>
                    <input 
                      required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Category</label>
                    <input 
                      required value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Price ($)</label>
                    <input 
                      required type="number" step="0.01" value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Stock Level</label>
                    <input 
                      required type="number" value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Image URL</label>
                  <div className="flex gap-4">
                    <input 
                      required value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="flex-grow bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
                  <textarea 
                    rows="4" value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 font-body focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" disabled={loading}
                    className="flex-grow editorial-gradient text-on-primary py-4 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingProduct ? 'Commit Changes' : 'Add to Inventory'}
                  </button>
                  <button 
                    type="button" onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 border border-outline-variant/20 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inventory;
