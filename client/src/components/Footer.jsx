import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#171e29] text-white py-24 px-8 md:px-16 overflow-hidden relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        <div className="md:col-span-4">
          <h2 className="font-headline text-4xl font-bold mb-8 tracking-tighter">ETC.</h2>
          <p className="text-on-primary-container/60 font-body leading-relaxed mb-12 max-w-sm">
            Curating the silent evolution of modern heritage. A collective dedicated to the pursuit of architectural precision and tactile warmth.
          </p>
          <div className="flex gap-6">
            <a href="mailto:london@etcapparel.com" className="text-on-primary-container/40 hover:text-secondary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Atelier</h4>
          <ul className="space-y-4 font-label text-xs uppercase tracking-widest text-on-primary-container/60">
            <li><Link to="/shop" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/news" className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Archive</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Stockists</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Curator</h4>
          <ul className="space-y-4 font-label text-xs uppercase tracking-widest text-on-primary-container/60">
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/management" className="hover:text-white transition-colors">Management</Link></li>
            <li><Link to="/partners" className="hover:text-white transition-colors">Global Network</Link></li>
            <li><Link to="/news" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-8">
          <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Journal Subscription</h4>
          <p className="text-xs text-on-primary-container/60 leading-relaxed font-body">Receive curated updates on collection cycles and editorial insights.</p>
          <form onSubmit={handleSubscribe} className="flex border-b border-white/10 pb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@address.com"
              className="bg-transparent border-none focus:ring-0 text-sm font-label flex-grow outline-none"
            />
            <button type="submit" className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors">Subscribe</button>
          </form>
          {isSubscribed && (
            <p className="text-[10px] font-label text-secondary">Thank you! You're now subscribed to our journal.</p>
          )}
        </div>
      </div>
      <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-[10px] font-label text-on-primary-container/30 uppercase tracking-widest">© {new Date().getFullYear()} ETC Apparel Ltd. All rights reserved.</p>
        <div className="flex gap-6 font-label text-[10px] uppercase tracking-widest text-on-primary-container/30">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
      <div className="absolute bottom-[-10%] right-[-10%] opacity-5 select-none pointer-events-none">
        <span className="font-headline text-[300px] font-black tracking-tighter italic">Apparel</span>
      </div>
    </footer>
  );
};

export default Footer;
