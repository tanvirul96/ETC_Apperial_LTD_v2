import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, RefreshCw, AlertCircle, ShieldCheck, Mail, Calendar, Key, CheckCircle, Eye, EyeOff } from 'lucide-react';
import api from '../utils/api';

const Curators = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const fetchAdmins = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/auth/admins');
      setAdmins(response.data);
    } catch (err) {
      console.error('Error fetching admin curators:', err);
      setError('Unable to fetch administrative roster.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await api.post('/auth/add-admin', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', password: '' });
      fetchAdmins();
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error registering admin:', err);
      setError(err.response?.data?.message || 'Failed to register new administrator.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-surface min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-black text-primary tracking-tight mb-2 italic">Atelier <span className="font-normal not-italic">Curators.</span></h1>
          <p className="text-on-surface-variant font-body">Manage administrative rosters, grant curator level clearances, and provision accounts.</p>
        </div>
        <button 
          onClick={fetchAdmins} 
          className="p-4 bg-white border border-outline-variant/10 rounded-2xl hover:bg-surface transition-all shadow-sm group flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-primary font-bold"
        >
          <RefreshCw className={`w-4 h-4 text-primary ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          Refresh Roster
        </button>
      </header>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl font-body text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Registration form panel */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-outline-variant/5 p-5 md:p-8 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-4 mb-8">
              <UserPlus className="w-5 h-5 text-secondary" />
              <h3 className="font-headline text-2xl font-black text-primary italic">Provision Curator.</h3>
            </div>

            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
                <h4 className="font-headline text-xl font-bold text-primary mb-2">Account Provisioned</h4>
                <p className="text-on-surface-variant font-body text-sm">The new admin can now authenticate using their email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleAddAdmin} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Full Name</label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    placeholder="e.g. Liam Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface border border-outline-variant/10 rounded-xl p-4 font-body text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Email Address</label>
                  <input
                    type="email"
                    required
                    disabled={submitting}
                    placeholder="e.g. liam@etc.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface border border-outline-variant/10 rounded-xl p-4 font-body text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">Security Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={submitting}
                      placeholder="Min 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-surface border border-outline-variant/10 rounded-xl p-4 pr-12 font-body text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-primary transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full editorial-gradient text-white py-4 rounded-xl font-label text-[10px] font-bold uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-xl shadow-primary/15 disabled:opacity-50"
                >
                  {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  {submitting ? 'Provisioning...' : 'Provision Clearance'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* List of administrators */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-outline-variant/5 p-5 md:p-8 shadow-2xl shadow-primary/5 h-auto lg:h-[calc(100vh-280px)] overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <Users className="w-5 h-5 text-secondary" />
            <h3 className="font-label text-xs font-black tracking-widest text-on-surface-variant uppercase">Clearance Registry ({admins.length})</h3>
          </div>

          {loading ? (
            <div className="h-[30vh] flex flex-col items-center justify-center gap-4">
              <RefreshCw className="w-6 h-6 text-primary animate-spin" />
              <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">Syncing roster...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {admins.map((adm) => (
                <div 
                  key={adm.id}
                  className="p-5 bg-surface/40 rounded-2xl border border-outline-variant/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6"
                >
                  <div className="flex items-center gap-4">
                    {adm.avatar_url ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-outline-variant/10">
                        <img src={adm.avatar_url} alt={adm.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center font-headline text-lg font-bold text-primary shrink-0">
                        {adm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-headline font-bold text-base text-primary leading-snug">{adm.name}</h4>
                      <div className="flex items-center gap-2 text-on-surface-variant font-body text-xs mt-0.5">
                        <Mail className="w-3.5 h-3.5 opacity-60" />
                        <span className="break-all">{adm.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-[8px] font-label font-bold uppercase tracking-widest rounded-full mb-1.5 shadow-sm">
                      Curator
                    </span>
                    <div className="flex items-center sm:justify-end gap-1 text-[9px] font-label text-on-surface-variant/75 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(adm.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Curators;
