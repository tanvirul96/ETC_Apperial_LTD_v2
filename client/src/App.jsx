import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
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
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
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
    return <Loader fullScreen />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <AdminLayout>
             <Routes>
              <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
              <Route path="inventory" element={<PageTransition><Inventory /></PageTransition>} />
              <Route path="orders" element={<PageTransition><Orders /></PageTransition>} />
              <Route path="news" element={<PageTransition><NewsFeed /></PageTransition>} />
              <Route path="analytics" element={<PageTransition><Analytics /></PageTransition>} />
              <Route path="inquiries" element={<PageTransition><Inquiries /></PageTransition>} />
              <Route path="curators" element={<PageTransition><Curators /></PageTransition>} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      {/* Nested Admin Routes for deep links */}
      <Route path="/admin/*" element={
        <ProtectedRoute requireAdmin={true}>
          <AdminLayout>
            <Routes>
              <Route path="inventory" element={<PageTransition><Inventory /></PageTransition>} />
              <Route path="orders" element={<PageTransition><Orders /></PageTransition>} />
              <Route path="news" element={<PageTransition><NewsFeed /></PageTransition>} />
              <Route path="analytics" element={<PageTransition><Analytics /></PageTransition>} />
              <Route path="inquiries" element={<PageTransition><Inquiries /></PageTransition>} />
              <Route path="curators" element={<PageTransition><Curators /></PageTransition>} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />

      {/* Main Layout Routes */}
      <Route path="/" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Home />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/shop" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Shop />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/login" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Login />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/register" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Register />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/about" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <About />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/management" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Management />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/contact" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Contact />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/checkout" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Checkout />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/news" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <Journal />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/news/:id" element={
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <PageTransition>
              <NewsDetail />
            </PageTransition>
          </div>
          <Footer />
        </div>
      } />

      <Route path="/account" element={
        <ProtectedRoute>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <PageTransition>
                <MyAccount />
              </PageTransition>
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
              <PageTransition>
                <MyAccount />
              </PageTransition>
            </div>
            <Footer />
          </div>
        </ProtectedRoute>
      } />

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
};

export default App;
