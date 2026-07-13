import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import etcLogo from '../assets/ETC_logo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 25 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 220, damping: 22 }
  }
};

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart, cartCount, cartTotal, removeFromCart, updateQty } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Partners', path: '/partners' },
    { name: 'Management', path: '/management' },
    { name: 'Contact', path: '/contact' },
    { name: 'News', path: '/news' },
    { name: 'Shop', path: '/shop' }

  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${!isTransparent ? 'bg-white/80 backdrop-blur-md border-b border-outline-variant/10 h-20' : 'bg-transparent h-20'}`}>
        <nav className="container mx-auto px-6 md:px-16 h-full flex items-center justify-between">
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            {/* Logo Graphic (cropped from top) */}
            <div className="relative overflow-hidden w-12 h-10 md:w-16 md:h-12 flex items-start justify-center">
              <img
                src={etcLogo}
                alt="ETC Graphic"
                className={`w-full h-auto object-contain object-top scale-[1.8] origin-top transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
              />
            </div>

            {/* Logo Text */}
            <div className="flex flex-col justify-center">
              <span className={`font-headline text-lg md:text-[15px] font-black tracking-widest leading-none transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary'}`}>
                ETC APPAREL
              </span>
              <span className={`font-label text-[5.5px] md:text-[7.5px] uppercase tracking-[0.25em] mt-1.5 font-bold transition-colors duration-300 ${isTransparent ? 'text-white/80' : 'text-on-surface-variant'}`}>
                UK Bangladesh Venture
              </span>
            </div>
          </Link>

          {/* Navigation Links (Center) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 font-label text-[15px] uppercase tracking-[0.2em] transition-all hover:text-secondary group ${location.pathname === link.path
                  ? 'text-secondary font-bold'
                  : (isTransparent ? 'text-white/80 hover:text-white' : 'text-on-surface-variant')
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-300 origin-left ${location.pathname === link.path
                  ? 'bg-secondary scale-x-100'
                  : (isTransparent ? 'bg-white scale-x-0 group-hover:scale-x-100' : 'bg-secondary scale-x-0 group-hover:scale-x-100')
                  }`}></span>
              </Link>
            ))}
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className={`font-label text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${isTransparent ? 'text-secondary-fixed-dim hover:text-white' : 'text-secondary hover:text-primary'}`}>Admin Panel</Link>
                  )}
                  <Link to="/profile" className={`font-label text-[10px] uppercase tracking-[0.3em] transition-all ${isTransparent ? 'text-white/80 hover:text-white' : 'text-on-surface-variant hover:text-secondary'}`}>
                    {user.name.split(' ')[0]}
                  </Link>
                  <button onClick={logout} className="editorial-gradient text-on-primary px-6 py-3 rounded-DEFAULT font-label text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`font-label text-[10px] uppercase tracking-[0.3em] transition-all ${isTransparent ? 'text-white/80 hover:text-white' : 'text-on-surface-variant hover:text-secondary'}`}>Sign In</Link>
                  <Link to="/register" className="editorial-gradient text-on-primary px-6 py-3 rounded-DEFAULT font-label text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">Join Atelier</Link>
                </>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative group">
              <ShoppingBag className={`w-6 h-6 transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-secondary text-on-secondary text-[8px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setIsMobileMenuOpen(true)} className={`lg:hidden p-2 transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary'}`}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-headline text-2xl font-black text-primary tracking-tighter">ETC.</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-headline text-3xl font-bold text-primary hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="mt-auto flex flex-col gap-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center border border-primary text-primary font-label text-xs uppercase tracking-widest font-bold">My Profile</Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-4 text-center bg-primary text-white font-label text-xs uppercase tracking-widest font-bold">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center border border-primary text-primary font-label text-xs uppercase tracking-widest font-bold">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center bg-primary text-white font-label text-xs uppercase tracking-widest font-bold">Join Atelier</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-[65]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-headline text-xl font-bold text-primary">Your Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-outline-variant mb-4" />
                    <p className="font-headline text-lg text-on-surface-variant">Your bag is empty.</p>
                    <Link to="/shop" onClick={() => setIsCartOpen(false)} className="mt-6 text-secondary font-label text-xs uppercase tracking-widest hover:underline">Browse Collections</Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center group">
                      <div className="w-16 h-20 bg-surface-container-low rounded overflow-hidden flex-shrink-0">
                        <img src={item.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm text-primary leading-tight">{item.name}</p>
                        <p className="text-xs text-on-surface-variant font-label mt-1">{item.category}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-headline font-bold text-secondary text-sm">${parseFloat(item.price).toFixed(2)}</span>
                          <div className="flex items-center border border-outline-variant/30 rounded bg-surface p-0.5">
                            <button
                              onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                              className="p-1 hover:bg-surface-container-low text-primary transition-colors rounded-sm"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 font-label text-[10px] text-primary font-bold min-w-[16px] text-center">
                              {item.qty || 1}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                              className="p-1 hover:bg-surface-container-low text-primary transition-colors rounded-sm"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-outline-variant hover:text-red-600 transition-colors flex-shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="p-8 border-t border-outline-variant/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Subtotal</span>
                  <span className="font-headline text-xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full editorial-gradient text-on-primary py-4 text-center font-label text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity rounded-lg shadow-lg">Finalize Atelier Order</Link>
                <Link to="/shop" onClick={() => setIsCartOpen(false)} className="block w-full mt-4 text-center font-label text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all">Continue Exploring</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
