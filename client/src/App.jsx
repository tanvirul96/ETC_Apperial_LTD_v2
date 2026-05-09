import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Management from './pages/Management';
import Contact from './pages/Contact';
import Journal from './pages/Journal';
import NewsDetail from './pages/NewsDetail';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import NewsFeed from './pages/NewsFeed';
import Inquiries from './pages/Inquiries';
import Curators from './pages/Curators';
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
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <div className="flex bg-surface min-h-screen">
            <AdminSidebar />
            <div className="flex-grow lg:ml-64">
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="orders" element={<Orders />} />
                <Route path="news" element={<NewsFeed />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="curators" element={<Curators />} />
              </Routes>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      {/* Nested Admin Routes for deep links */}
      <Route path="/admin/*" element={
        <ProtectedRoute requireAdmin={true}>
          <div className="flex bg-surface min-h-screen">
            <AdminSidebar />
            <div className="flex-grow lg:ml-64">
              <Routes>
                <Route path="inventory" element={<Inventory />} />
                <Route path="orders" element={<Orders />} />
                <Route path="news" element={<NewsFeed />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="curators" element={<Curators />} />
              </Routes>
            </div>
          </div>
        </ProtectedRoute>
      } />

      {/* Main Layout Routes */}
      <Route path="/" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Home />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/shop" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Shop />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/login" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Login />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/register" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Register />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/about" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <About />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/management" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Management />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/contact" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Contact />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/checkout" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Checkout />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/news" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Journal />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/news/:id" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <NewsDetail />
          </div>
          <Footer />
        </div>
      } />

      <Route path="/account" element={
        <ProtectedRoute>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <MyAccount />
            </div>
            <Footer />
          </div>
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <MyAccount />
            </div>
            <Footer />
          </div>
        </ProtectedRoute>
      } />

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
