import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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

    if (!formData.password) {
      localErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      localErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      localErrors.confirmPassword = 'Passwords do not match.';
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
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration Error:', err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6 noise-bg pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl shadow-primary/5 p-12 border border-outline-variant/10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-primary tracking-tighter mb-4 font-headline">Join the <span className="italic font-normal">Collective.</span></h1>
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Create your editorial profile</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Full Name</label>
              <div className="relative">
                <User className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.name ? 'text-red-500' : 'text-outline'}`} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-8 py-3 bg-transparent border-0 border-b ${errors.name ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all font-body text-sm`}
                  placeholder="Alexander Reed"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.name}</p>}
            </div>

            <div className="relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? 'text-red-500' : 'text-outline'}`} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-8 py-3 bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all font-body text-sm`}
                  placeholder="alexander@editorial.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.email}</p>}
            </div>

            <div className="relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Password</label>
              <div className="relative">
                <Lock className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? 'text-red-500' : 'text-outline'}`} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-8 py-3 bg-transparent border-0 border-b ${errors.password ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all font-body text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.password}</p>}
            </div>

            <div className="relative">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.confirmPassword ? 'text-red-500' : 'text-outline'}`} />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-8 py-3 bg-transparent border-0 border-b ${errors.confirmPassword ? 'border-red-500' : 'border-outline-variant'} focus:ring-0 focus:border-primary transition-all font-body text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[11px] mt-1 font-label">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full editorial-gradient text-on-primary py-5 rounded-DEFAULT font-label font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
          <p className="text-xs text-on-surface-variant font-body">
            Already a member? <Link to="/login" className="text-primary font-bold hover:text-secondary transition-colors">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default Register;
