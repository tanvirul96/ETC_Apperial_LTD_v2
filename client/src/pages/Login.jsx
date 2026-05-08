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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6 noise-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl shadow-primary/5 p-12 border border-outline-variant/10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-primary tracking-tighter mb-4 font-headline">Welcome <span className="italic font-normal">Back.</span></h1>
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Enter the editorial archive</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 py-3 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all font-body text-sm"
                  placeholder="name@atelier.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 py-3 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all font-body text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full editorial-gradient text-on-primary py-5 rounded-DEFAULT font-label font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Access Atelier <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
          <p className="text-xs text-on-surface-variant font-body">
            New to the collective? <Link to="/register" className="text-primary font-bold hover:text-secondary transition-colors">Join Atelier</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
