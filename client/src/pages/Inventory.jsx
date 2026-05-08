  import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';
import { supabase } from '../supabase';

const CATEGORIES = ['Men', 'Women', 'Kids', 'Accessories', 'Signature Knits', 'Outerwear', 'Essentials'];

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Men',
    price: '',
    stock: '',
    description: '',
    image_url: '',
    status: 'Active'
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (err) {
      console.error('Upload Error:', err.message);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        sku: product.sku || '',
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description || '',
        image_url: product.image_url || '',
        status: product.status || 'Active'
      });
    } else {
      setEditingProduct(null);
      setFormData({ 
        sku: `ETC-${Date.now().toString().slice(-6)}`,
        name: '', 
        category: 'Men', 
        price: '', 
        stock: '', 
        description: '', 
        image_url: '', 
        status: 'Active' 
      });
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
      alert('Error saving product. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this piece from the vault?')) {
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
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 lg:p-12 min-h-screen bg-surface">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-primary/30"></span>
            <p className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant">Management Portal</p>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-primary tracking-tighter">
            Atelier <span className="italic font-normal">Inventory.</span>
          </h1>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-label font-bold text-[10px] uppercase tracking-widest hover:scale-105 shadow-2xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add New Piece
        </button>
      </header>

      <div className="mb-10 relative max-w-xl group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
        <input 
          type="text"
          placeholder="Search by name, category, or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white border border-outline-variant/10 rounded-2xl focus:ring-4 focus:ring-primary/5 font-body text-sm outline-none transition-all shadow-sm"
        />
      </div>

      <div className="bg-white rounded-[2rem] border border-outline-variant/5 overflow-hidden shadow-2xl shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/5">
                <th className="px-10 py-6 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black">Design & Identity</th>
                <th className="px-6 py-6 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black">Curation</th>
                <th className="px-6 py-6 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black">Valuation</th>
                <th className="px-6 py-6 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black text-center">Availability</th>
                <th className="px-10 py-6 text-right font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {loading && products.length === 0 ? (
                <tr><td colSpan="5" className="px-10 py-24 text-center italic text-on-surface-variant font-body">Accessing atelier archives...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan="5" className="px-10 py-24 text-center italic text-on-surface-variant font-body">No pieces found matching your query.</td></tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/20 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-20 bg-surface rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-outline-variant/10">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-surface-container"><ImageIcon className="w-6 h-6 text-outline" /></div>
                        )}
                      </div>
                      <div>
                        <p className="font-headline font-bold text-lg text-primary leading-tight mb-1">{product.name}</p>
                        <p className="text-[9px] text-on-surface-variant font-label uppercase tracking-widest bg-surface px-2 py-0.5 rounded border border-outline-variant/10 inline-block">
                          {product.sku || `ETC-${product.id}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-3 py-1 bg-surface-container-low rounded-full border border-outline-variant/5">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-headline font-bold text-secondary text-base">
                      ${parseFloat(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${product.stock > 10 ? 'bg-emerald-50 text-emerald-700' : product.stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                        {product.stock > 0 ? `${product.stock} Units` : 'Depleted'}
                      </span>
                      <p className="text-[8px] uppercase tracking-tighter text-outline font-label">{product.status}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(product)} className="p-3 bg-white shadow-lg rounded-full text-on-surface-variant hover:text-primary hover:scale-110 transition-all border border-outline-variant/10"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-3 bg-white shadow-lg rounded-full text-on-surface-variant hover:text-red-600 hover:scale-110 transition-all border border-outline-variant/10"><Trash2 className="w-4 h-4" /></button>
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
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Sidebar Info */}
              <div className="w-full md:w-1/3 bg-surface p-10 border-r border-outline-variant/10">
                <h2 className="text-4xl font-headline font-black text-primary italic mb-6 leading-none">
                  {editingProduct ? 'Update Piece.' : 'New Design.'}
                </h2>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl border border-outline-variant/10 shadow-sm">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Preview" className="w-full aspect-[3/4] object-cover rounded-lg shadow-inner" />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-surface-container rounded-lg flex flex-col items-center justify-center text-outline gap-3 border-2 border-dashed border-outline-variant/20">
                        <ImageIcon className="w-10 h-10 opacity-20" />
                        <p className="text-[10px] font-label uppercase tracking-widest text-center px-4">Awaiting visual representation</p>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-label text-on-surface-variant uppercase leading-relaxed tracking-widest">
                    Ensure all metadata aligns with the atelier standards before committing to the archive.
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-10 overflow-y-auto max-h-[85vh]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Identity (SKU)</label>
                      <input 
                        required value={formData.sku}
                        onChange={(e) => setFormData({...formData, sku: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm"
                        placeholder="ETC-XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Design Name</label>
                      <input 
                        required value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm"
                        placeholder="e.g. Signature Silk Gown"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Classification</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm cursor-pointer"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Valuation ($)</label>
                      <input 
                        required type="number" step="0.01" value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Stock Quota</label>
                      <input 
                        required type="number" value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Limited Edition">Limited Edition</option>
                        <option value="Archived">Archived</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold block">Visual Asset</label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 cursor-pointer group">
                        <div className="flex items-center gap-3 px-6 py-4 bg-surface-container-low rounded-xl border border-outline-variant/10 group-hover:border-primary/30 transition-all">
                          {uploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 text-on-surface-variant group-hover:text-primary" />}
                          <span className="text-xs font-body text-on-surface-variant group-hover:text-primary">
                            {uploading ? 'Uploading piece...' : 'Select photographic evidence'}
                          </span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                      </label>
                    </div>
                    <div className="relative group">
                      <input 
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-xs text-outline italic"
                        placeholder="Or provide direct asset URL"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">Atelier Description</label>
                    <textarea 
                      rows="3" value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-surface border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all text-sm resize-none"
                      placeholder="Narrative of the design..."
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      type="submit" disabled={loading || uploading}
                      className="flex-grow bg-primary text-white py-5 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingProduct ? 'Commit Changes' : 'Archive to Inventory'}
                    </button>
                    <button 
                      type="button" onClick={() => setIsModalOpen(false)}
                      className="px-10 py-5 border border-outline-variant/20 rounded-2xl font-label font-bold uppercase tracking-widest text-[10px] text-on-surface-variant hover:bg-surface-container-low transition-colors"
                    >
                      Cancel
                    </button>
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

export default Inventory;
