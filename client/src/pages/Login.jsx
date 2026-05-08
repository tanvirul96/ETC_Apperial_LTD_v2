import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.user, response.data.token);
      
      // If server confirmed it's an admin, go to admin
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else if (isAdminMode) {
        // User forced admin mode but server says customer
        setError('Unauthorized access. This portal is for curators only.');
        setLoading(false);
        return;
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login Error:', err);
      const message = err.response?.data?.message || 'Server error. Please verify the backend is running and connected.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6 noise-bg relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${isAdminMode ? 'bg-primary/40' : 'bg-secondary/20'}`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${isAdminMode ? 'bg-secondary/40' : 'bg-primary/20'}`}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-primary/5 border border-outline-variant/10 relative z-10 overflow-hidden"
      >
        {/* Role Toggle Tabs */}
        <div className="flex border-b border-outline-variant/10">
          <button 
            onClick={() => setIsAdminMode(false)}
            className={`flex-1 py-6 font-label text-[10px] uppercase tracking-[0.3em] transition-all ${!isAdminMode ? 'text-primary font-bold bg-white' : 'text-on-surface-variant bg-surface/50 hover:bg-surface'}`}
          >
            Customer Access
          </button>
          <button 
            onClick={() => setIsAdminMode(true)}
            className={`flex-1 py-6 font-label text-[10px] uppercase tracking-[0.3em] transition-all ${isAdminMode ? 'text-secondary font-bold bg-white' : 'text-on-surface-variant bg-surface/50 hover:bg-surface'}`}
          >
            Curator Access
          </button>
        </div>

        <div className="p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-primary tracking-tighter mb-4 font-headline italic">
              {isAdminMode ? 'Atelier Management.' : 'Welcome Back.'}
            </h1>
            <p className="text-on-surface-variant font-label text-[10px] uppercase tracking-[0.3em]">
              {isAdminMode ? 'Secured Administrative Portal' : 'Enter the editorial archive'}
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 py-3 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all font-body text-sm outline-none"
                    placeholder="name@atelier.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Security Cipher</label>
                <div className="relative group">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 py-3 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all font-body text-sm outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-label font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-50 active:scale-[0.98] ${isAdminMode ? 'bg-primary text-white' : 'editorial-gradient text-on-primary'}`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Access Atelier <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-xs text-on-surface-variant font-body">
              {isAdminMode ? 'Lost access credentials? Contact the lead developer.' : (
                <>New to the collective? <Link to="/register" className="text-primary font-bold hover:text-secondary transition-colors">Join Atelier</Link></>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
