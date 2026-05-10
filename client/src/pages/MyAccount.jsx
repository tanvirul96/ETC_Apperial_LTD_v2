import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Edit3, ShoppingBag, Heart, Package, Bell, Settings, X, CheckCircle, Loader2, Key, Camera, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const MyAccount = () => {
  const { user, logout, isAdmin, syncUserLocal } = useAuth();
  const { cartCount } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [profileErrors, setProfileErrors] = useState({});

  // Password Update States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Avatar Upload States
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await api.get('/orders');
        // In a real app, the backend should filter by user_id
        // For now, we'll just show the latest 5 orders
        setOrders(response.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
    if (user) {
      setEditFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setProfileErrors({});

    const localErrors = {};
    if (!editFormData.name.trim()) {
      localErrors.name = 'Full name is required.';
    } else if (editFormData.name.trim().length < 2) {
      localErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editFormData.email.trim()) {
      localErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(editFormData.email.trim())) {
      localErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(localErrors).length > 0) {
      setProfileErrors(localErrors);
      return;
    }

    setUpdating(true);
    try {
      const response = await api.put('/auth/update-profile', {
        name: editFormData.name,
        email: editFormData.email
      });
      syncUserLocal(response.data.user);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
        setIsEditModalOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
      if (err.response?.data?.errors) {
        setProfileErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      }
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordErrors({});

    const localErrors = {};
    if (!passwordData.currentPassword) {
      localErrors.currentPassword = 'Current password is required.';
    }
    if (!passwordData.newPassword) {
      localErrors.newPassword = 'New password is required.';
    } else if (passwordData.newPassword.length < 6) {
      localErrors.newPassword = 'New password must be at least 6 characters.';
    } else if (passwordData.newPassword === passwordData.currentPassword) {
      localErrors.newPassword = 'New password cannot be the same as current password.';
    }

    if (Object.keys(localErrors).length > 0) {
      setPasswordErrors(localErrors);
      return;
    }

    setPasswordUpdating(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '' });
      setTimeout(() => {
        setPasswordSuccess(false);
        setIsPasswordModalOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Error changing password:', err);
      if (err.response?.data?.errors) {
        setPasswordErrors(err.response.data.errors);
      } else {
        setPasswordError(err.response?.data?.message || 'Failed to update password. Please try again.');
      }
    } finally {
      setPasswordUpdating(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Profile picture size should be less than 2MB.');
      return;
    }

    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        const response = await api.put('/auth/update-profile', {
          name: user.name,
          email: user.email,
          avatar_url: base64String
        });
        syncUserLocal(response.data.user);
      } catch (err) {
        console.error('Error uploading profile picture:', err);
        alert('Failed to update profile picture. Please try again.');
      } finally {
        setUploadingAvatar(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const statusStyles = {
    Pending: 'bg-orange-100 text-orange-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-indigo-100 text-indigo-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  if (!user) return null;

  return (
    <main className="pt-32 pb-24 px-6 md:px-16 max-w-5xl mx-auto bg-surface noise-bg min-h-screen">
      {/* Account Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16"
      >
        <div className="flex items-center gap-6">
          <div className="relative group w-24 h-24 shrink-0">
            {user.avatar_url ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border border-outline-variant/10 shadow-2xl">
                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full editorial-gradient flex items-center justify-center text-3xl font-bold text-white font-headline shadow-2xl">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
            )}
            <label className="absolute inset-0 bg-primary/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer text-white gap-1 select-none">
              <Camera className="w-4 h-4 text-white" />
              <span className="font-label text-[8px] font-bold uppercase tracking-wider text-center px-2">
                {uploadingAvatar ? 'Saving...' : 'Upload Picture'}
              </span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
                className="hidden" 
                disabled={uploadingAvatar}
              />
            </label>
          </div>
          <div>
            <h1 className="font-headline text-4xl font-bold text-primary">{user.name}</h1>
            <p className="font-label text-sm text-on-surface-variant mt-1">{user.email}</p>
            <span className={`inline-block mt-4 px-4 py-1 text-[10px] font-label font-bold uppercase tracking-widest rounded-full ${isAdmin ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-secondary-fixed text-on-secondary-fixed'}`}>
              {isAdmin ? 'Administrator' : 'Atelier Member'}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-8 py-4 border border-primary text-primary font-label text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-lg shadow-sm"
          >
            <Edit3 className="w-3 h-3" /> Edit Profile
          </button>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-2 px-8 py-4 border border-outline-variant/30 text-on-surface-variant font-label text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all rounded-lg"
          >
            <Key className="w-3 h-3" /> Security
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-8 py-4 border border-outline-variant/20 text-on-surface-variant font-label text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all rounded-lg"
          >
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 rounded-2xl text-center shadow-2xl shadow-primary/5 border border-outline-variant/10"
        >
          <p className="font-headline text-4xl font-bold text-primary mb-2">{orders.length}</p>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Archives</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-2xl text-center shadow-2xl shadow-primary/5 border border-outline-variant/10"
        >
          <p className="font-headline text-4xl font-bold text-secondary mb-2">0</p>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Wishlist</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-10 rounded-2xl text-center shadow-2xl shadow-primary/5 border border-outline-variant/10"
        >
          <p className="font-headline text-4xl font-bold text-primary mb-2">{cartCount}</p>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">In Bag</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Order History */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-bold text-primary">Journal of Orders</h2>
            <button className="text-[10px] font-label font-bold text-secondary uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white/50 backdrop-blur p-12 rounded-2xl text-center border border-dashed border-outline-variant italic text-on-surface-variant">Opening archives...</div>
            ) : orders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-outline-variant/10 shadow-sm">
                <ShoppingBag className="w-12 h-12 text-outline-variant mx-auto mb-4 opacity-20" />
                <p className="font-headline text-xl text-primary mb-6">No entries yet.</p>
                <button className="editorial-gradient text-on-primary px-8 py-3 rounded-lg font-label text-[10px] uppercase tracking-widest font-bold">Explore Collections</button>
              </div>
            ) : orders.map((order, i) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-outline-variant/5 shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60 mb-1">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p className="font-body font-bold text-primary group-hover:text-secondary transition-colors">{order.order_number}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-headline font-bold text-primary">${parseFloat(order.amount).toFixed(2)}</span>
                  <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm ${statusStyles[order.status] || 'bg-gray-100 text-gray-700'}`}>{order.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-12">
          {/* Preferences */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-8">Atelier Preferences</h2>
            <div className="bg-white rounded-2xl divide-y divide-outline-variant/5 shadow-xl shadow-primary/5 border border-outline-variant/10 overflow-hidden">
              <div className="flex justify-between items-center p-6 hover:bg-surface-container-low transition-colors">
                <div>
                  <p className="text-sm font-bold text-primary">Newsletter</p>
                  <p className="text-[10px] text-on-surface-variant font-label mt-1">Editorial drops & updates</p>
                </div>
                <div className="w-10 h-5 bg-secondary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
              <div className="flex justify-between items-center p-6 hover:bg-surface-container-low transition-colors">
                <div>
                  <p className="text-sm font-bold text-primary">SMS Updates</p>
                  <p className="text-[10px] text-on-surface-variant font-label mt-1">Order tracking via text</p>
                </div>
                <div className="w-10 h-5 bg-outline-variant rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-primary text-on-primary p-6 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer shadow-xl shadow-primary/20">
                <Package className="w-6 h-6 text-secondary" />
                <span className="font-label text-[10px] font-bold uppercase tracking-widest">Track My Orders</span>
              </div>
              <div className="bg-white p-6 rounded-2xl flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/10 shadow-sm">
                <Bell className="w-6 h-6 text-secondary" />
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-primary">Notifications</span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsEditModalOpen(false)} 
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative bg-white w-full max-w-md p-12 rounded-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-headline font-bold text-primary italic">Edit Profile.</h2>
                <button onClick={() => setIsEditModalOpen(false)}><X className="w-6 h-6 text-outline" /></button>
              </div>

              {updateSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
                  <p className="font-headline text-2xl text-primary font-bold">Profile Updated.</p>
                  <p className="text-on-surface-variant font-body text-sm mt-2">The changes have been committed to the archive.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-8">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-xs font-body rounded-xl">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">Full Name</label>
                    <input 
                      required 
                      disabled={updating}
                      value={editFormData.name} 
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className={`w-full bg-surface-container-low border ${profileErrors.name ? 'border-red-500' : 'border-none'} rounded-lg p-4 font-body text-sm focus:ring-2 focus:ring-primary/10 disabled:opacity-50`} 
                    />
                    {profileErrors.name && <p className="text-red-500 text-[11px] font-label">{profileErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      disabled={updating}
                      value={editFormData.email} 
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      className={`w-full bg-surface-container-low border ${profileErrors.email ? 'border-red-500' : 'border-none'} rounded-lg p-4 font-body text-sm focus:ring-2 focus:ring-primary/10 disabled:opacity-50`} 
                    />
                    {profileErrors.email && <p className="text-red-500 text-[11px] font-label">{profileErrors.email}</p>}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={updating}
                      className="flex-grow editorial-gradient text-on-primary py-4 font-label text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                      {updating ? 'Committing...' : 'Commit Changes'}
                    </button>
                    <button 
                      type="button" 
                      disabled={updating}
                      onClick={() => setIsEditModalOpen(false)} 
                      className="px-8 py-4 font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30"
                    >
                      Abort
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsPasswordModalOpen(false)} 
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative bg-white w-full max-w-md p-12 rounded-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-headline font-bold text-primary italic">Change Password.</h2>
                <button onClick={() => setIsPasswordModalOpen(false)}><X className="w-6 h-6 text-outline" /></button>
              </div>

              {passwordSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
                  <p className="font-headline text-2xl text-primary font-bold">Password Updated.</p>
                  <p className="text-on-surface-variant font-body text-sm mt-2">Your credentials have been securely refreshed.</p>
                </motion.div>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-8">
                  {passwordError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-xs font-body rounded-xl">
                      {passwordError}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">Current Password</label>
                    <div className="relative">
                      <input 
                        type={showCurrentPassword ? "text" : "password"}
                        required 
                        disabled={passwordUpdating}
                        value={passwordData.currentPassword} 
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className={`w-full bg-surface-container-low border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-none'} rounded-lg p-4 pr-12 font-body text-sm focus:ring-2 focus:ring-primary/10 disabled:opacity-50`} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-primary transition-colors focus:outline-none"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && <p className="text-red-500 text-[11px] font-label">{passwordErrors.currentPassword}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">New Password</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        required 
                        disabled={passwordUpdating}
                        value={passwordData.newPassword} 
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className={`w-full bg-surface-container-low border ${passwordErrors.newPassword ? 'border-red-500' : 'border-none'} rounded-lg p-4 pr-12 font-body text-sm focus:ring-2 focus:ring-primary/10 disabled:opacity-50`} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-primary transition-colors focus:outline-none"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.newPassword && <p className="text-red-500 text-[11px] font-label">{passwordErrors.newPassword}</p>}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={passwordUpdating}
                      className="flex-grow editorial-gradient text-on-primary py-4 font-label text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {passwordUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                      {passwordUpdating ? 'Updating...' : 'Update Password'}
                    </button>
                    <button 
                      type="button" 
                      disabled={passwordUpdating}
                      onClick={() => setIsPasswordModalOpen(false)} 
                      className="px-8 py-4 font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30"
                    >
                      Abort
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MyAccount;
