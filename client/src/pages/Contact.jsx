import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Wholesale Partnerships',
    message: ''
  });

  const validate = () => {
    const localErrors = {};
    if (!formData.name.trim()) {
      localErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      localErrors.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      localErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      localErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      localErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      localErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setError('');
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/contacts', {
        name: formData.name,
        email: formData.email,
        subject: formData.type, // Map 'type' form field to 'subject' in PostgreSQL
        message: formData.message
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', type: 'Wholesale Partnerships', message: '' });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-20 bg-surface noise-bg">
      {/* Hero Section */}
      <header className="px-8 md:px-20 py-16 md:py-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="font-label text-secondary uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">Editorial Precision</span>
          <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight mb-8">Connect with our <br/><span className="italic font-normal text-secondary">Global Atelier.</span></h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Whether you are an artisan, a global retailer, or a creative mind, we invite you to start a dialogue. Our headquarters in London and hubs in Bangladesh are ready to assist.
          </p>
        </motion.div>
      </header>

      {/* Main Content Grid */}
      <section className="px-8 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        {/* Contact Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-white p-8 md:p-12 rounded-xl shadow-2xl shadow-primary/5 border border-outline-variant/10"
        >
          <h2 className="font-headline text-3xl text-primary mb-10">Send an Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2 block">Full Name</label>
                <input 
                  required value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full bg-transparent border-0 border-b ${errors.name ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary px-0 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 transition-all`} 
                  placeholder="E.g. Alexander Reed" type="text"
                />
                {errors.name && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.name}</p>}
              </div>
              <div className="relative">
                <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2 block">Email Address</label>
                <input 
                  required value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary px-0 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 transition-all`} 
                  placeholder="alexander@editorial.com" type="email"
                />
                {errors.email && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.email}</p>}
              </div>
            </div>
            <div className="relative">
              <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2 block">Inquiry Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-on-surface font-body transition-all"
              >
                <option>Wholesale Partnerships</option>
                <option>Sourcing & Production</option>
                <option>Press & Media</option>
                <option>General Support</option>
              </select>
            </div>
            <div className="relative">
              <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2 block">Message</label>
              <textarea 
                required value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`w-full bg-transparent border-0 border-b ${errors.message ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary px-0 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 transition-all resize-none`} 
                placeholder="How can our editorial team assist you?" rows="4"
              ></textarea>
              {errors.message && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.message}</p>}
            </div>
            
             {submitted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-label text-sm flex items-center gap-3"
              >
                <CheckCircle className="w-4 h-4" />
                Thank you! Your inquiry has been received. Our atelier team will respond within 2 business days.
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 font-label text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="pt-4">
              <button 
                disabled={loading}
                className="editorial-gradient text-on-primary px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all flex items-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-55 cursor-pointer" 
                type="submit"
              >
                {loading ? (
                  <>
                    Submitting...
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Address & Info Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-12"
        >
          {/* London Office */}
          <div className="bg-white p-10 rounded-xl border border-outline-variant/15 transition-all hover:bg-surface-container-low group shadow-sm">
            <span className="font-label text-secondary text-[10px] font-bold tracking-[0.2em] mb-4 block">HEADQUARTERS</span>
            <h3 className="font-headline text-2xl text-primary mb-4">UK OFFICE</h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-6">
              10 Radlett Close, Forest Gate,<br/>
              London  (E7 9JF), United Kingdom
            </p>
            <div className="flex flex-col gap-4 font-body text-on-surface text-sm">
              <a className="flex items-center gap-3 hover:text-secondary transition-colors" href="tel:+442071234567">
                <Phone className="w-4 h-4 text-secondary" />
                +44
              </a>
              <a className="flex items-center gap-3 hover:text-secondary transition-colors" href="mailto:london@etcapparel.com">
                <Mail className="w-4 h-4 text-secondary" />
                london@etcapparel.com
              </a>
            </div>
          </div>

          {/* Bangladesh Office */}
          <div className="bg-white p-10 rounded-xl border border-outline-variant/15 transition-all hover:bg-surface-container-low group shadow-sm">
            <span className="font-label text-secondary text-[10px] font-bold tracking-[0.2em] mb-4 block">PRODUCTION HUB</span>
            <h3 className="font-headline text-2xl text-primary mb-4">Bangladesh Office</h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-6">
              House-405, Lane-06, DOHS Baridhara<br/>
              Dhaka 1206, Bangladesh
            </p>
            <div className="flex flex-col gap-4 font-body text-on-surface text-sm">
              <a className="flex items-center gap-3 hover:text-secondary transition-colors" href="tel:+88029876543">
                <Phone className="w-4 h-4 text-secondary" />
                +880
              </a>
              <a className="flex items-center gap-3 hover:text-secondary transition-colors" href="mailto:dhaka@etcapparel.com">
                <Mail className="w-4 h-4 text-secondary" />
                dhaka@etcapparel.com
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="relative h-64 w-full rounded-xl overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 block cursor-pointer shadow-xl">
            <img alt="Map" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" />
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="bg-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="font-label text-[10px] font-bold tracking-widest uppercase">View Locations</span>
              </div>
            </div>
          </a>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;
