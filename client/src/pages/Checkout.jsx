import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: 'Bangladesh',
    paymentMethod: 'COD' // Cash on Delivery as default for simplicity
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const localErrors = {};
    if (!formData.name.trim()) {
      localErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      localErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      localErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      localErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      localErrors.phone = 'Phone number is required.';
    }

    if (!formData.address.trim()) {
      localErrors.address = 'Delivery address is required.';
    } else if (formData.address.trim().length < 10) {
      localErrors.address = 'Please specify a complete delivery address.';
    }

    if (!formData.city.trim()) {
      localErrors.city = 'City is required.';
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (cart.length === 0) return;

    if (!validate()) {
      return;
    }

    setLoading(true);
    const newOrderNumber = `ETC-${Math.floor(100000 + Math.random() * 900000)}`;
    
    try {
      const orderData = {
        order_number: newOrderNumber,
        customer_name: formData.name,
        customer_email: formData.email,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.country}`,
        phone: formData.phone,
        total_amount: cartTotal,
        items: cart
      };

      await api.post('/orders', orderData);
      
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(err.response?.data?.message || 'Failed to place order. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-xl border border-outline-variant/10"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-primary mb-4 italic">Narrative Secured.</h2>
          <p className="text-on-surface-variant font-body text-lg mb-10 leading-relaxed">
            Your order <span className="font-bold text-primary">#{orderNumber}</span> has been archived in our atelier. 
            We are now preparing your pieces for their journey.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="editorial-gradient text-white px-12 py-5 rounded-full font-label font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Return to Collection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <header className="mb-16">
          <Link to="/shop" className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors font-label text-[10px] uppercase tracking-widest mb-6">
            <ChevronLeft className="w-4 h-4" /> Return to Collections
          </Link>
          <h1 className="font-headline text-4xl md:text-6xl font-black text-primary tracking-tighter italic">Checkout.</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Shipping Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-headline text-lg font-black">1</div>
                  <h3 className="font-headline text-2xl font-bold text-primary">Shipping Archives</h3>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Full Name</label>
                    <input 
                      required name="name" value={formData.name} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.name ? 'border-red-500' : 'border-outline-variant/20'} py-3 font-body focus:ring-0 focus:border-primary transition-all`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-[11px] font-label">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Email Address</label>
                    <input 
                      required type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-outline-variant/20'} py-3 font-body focus:ring-0 focus:border-primary transition-all`}
                      placeholder="atelier@etc.com"
                    />
                    {errors.email && <p className="text-red-500 text-[11px] font-label">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Contact Number</label>
                    <input 
                      required name="phone" value={formData.phone} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.phone ? 'border-red-500' : 'border-outline-variant/20'} py-3 font-body focus:ring-0 focus:border-primary transition-all`}
                      placeholder="+880"
                    />
                    {errors.phone && <p className="text-red-500 text-[11px] font-label">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Delivery Address</label>
                    <input 
                      required name="address" value={formData.address} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.address ? 'border-red-500' : 'border-outline-variant/20'} py-3 font-body focus:ring-0 focus:border-primary transition-all`}
                      placeholder="Street, House, Apartment"
                    />
                    {errors.address && <p className="text-red-500 text-[11px] font-label">{errors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">City</label>
                    <input 
                      required name="city" value={formData.city} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.city ? 'border-red-500' : 'border-outline-variant/20'} py-3 font-body focus:ring-0 focus:border-primary transition-all`}
                      placeholder="Dhaka"
                    />
                    {errors.city && <p className="text-red-500 text-[11px] font-label">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Country</label>
                    <input 
                      required name="country" value={formData.country} onChange={handleInputChange}
                      className="w-full bg-transparent border-0 border-b border-outline-variant/20 py-3 font-body focus:ring-0 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-headline text-lg font-black">2</div>
                  <h3 className="font-headline text-2xl font-bold text-primary">Payment Curation</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${formData.paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-outline-variant/10 bg-white'}`}>
                    <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleInputChange} className="hidden" />
                    <Truck className={`w-6 h-6 ${formData.paymentMethod === 'COD' ? 'text-primary' : 'text-outline'}`} />
                    <div>
                      <p className="font-bold text-sm text-primary">Cash on Delivery</p>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Payment upon arrival</p>
                    </div>
                  </label>
                  <label className={`p-6 rounded-2xl border-2 cursor-not-allowed opacity-50 flex items-center gap-4 border-outline-variant/10 bg-surface`}>
                    <CreditCard className="w-6 h-6 text-outline" />
                    <div>
                      <p className="font-bold text-sm text-outline">Digital Payment</p>
                      <p className="text-[10px] uppercase tracking-widest text-outline">Currently unavailable</p>
                    </div>
                  </label>
                </div>
              </section>

              <button 
                type="submit" disabled={loading || cart.length === 0}
                className="w-full editorial-gradient text-white py-6 rounded-2xl font-label font-bold uppercase tracking-[0.2em] text-[10px] hover:opacity-90 shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Atelier Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-primary/5 border border-outline-variant/5">
              <h4 className="font-headline text-xl font-bold text-primary mb-8 italic">Order Summary.</h4>
              <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-surface rounded-xl overflow-hidden border border-outline-variant/10">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-sm text-primary leading-tight mb-1">{item.name}</p>
                      <p className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant">{item.category}</p>
                      <p className="text-xs font-headline font-bold text-secondary mt-1">${item.price} x {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-8 border-t border-outline-variant/10">
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-label text-[10px] uppercase tracking-widest">Subtotal</span>
                  <span className="font-headline font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-label text-[10px] uppercase tracking-widest">Shipping</span>
                  <span className="font-label text-[10px] uppercase tracking-widest font-black text-emerald-600 italic">Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-primary/10">
                  <span className="font-headline text-xl font-black text-primary italic underline underline-offset-8 decoration-secondary">Total Valuation</span>
                  <span className="font-headline text-3xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
