import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import NewsFeed from './pages/NewsFeed';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" />;
  return children;
};

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-surface italic font-headline text-3xl">ETC.</div>;
  }

  return (
    <Routes>
      {/* Admin Layout */}
      <Route path="/admin/*" element={
        <ProtectedRoute requireAdmin={true}>
          <div className="flex bg-surface min-h-screen">
            <AdminSidebar />
            <div className="flex-grow lg:ml-64">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/news" element={<NewsFeed />} />
                <Route path="/analytics" element={<AdminDashboard />} />
              </Routes>
            </div>
          </div>
        </ProtectedRoute>
      } />

      {/* Main Layout */}
      <Route path="*" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<div className="pt-40 pb-20 text-center font-headline text-4xl font-bold">Our Story. <p className="text-sm font-label mt-4 text-on-surface-variant font-normal">Coming Soon</p></div>} />
              <Route path="/management" element={<div className="pt-40 pb-20 text-center font-headline text-4xl font-bold">Management. <p className="text-sm font-label mt-4 text-on-surface-variant font-normal">Coming Soon</p></div>} />
              <Route path="/contact" element={<div className="pt-40 pb-20 text-center font-headline text-4xl font-bold">Contact Us. <p className="text-sm font-label mt-4 text-on-surface-variant font-normal">Coming Soon</p></div>} />
              <Route path="/news" element={<div className="pt-40 pb-20 text-center font-headline text-4xl font-bold">Journal. <p className="text-sm font-label mt-4 text-on-surface-variant font-normal">Coming Soon</p></div>} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <div className="pt-40 pb-20 text-center font-headline text-4xl font-bold">My Account. <p className="text-sm font-label mt-4 text-on-surface-variant font-normal">Coming Soon</p></div>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      } />
    </Routes>
  );
};

export default App;
