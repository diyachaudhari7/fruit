import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProfileProvider } from './context/ProfileContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Categories } from './pages/Categories';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderTracking } from './pages/OrderTracking';
import { OrderHistory } from './pages/OrderHistory';
import { OrderDetail } from './pages/OrderDetail';
import { AdminRoutes } from './pages/admin/AdminDashboard';

import { Profile } from './pages/Profile';
import { Footer } from './components/Footer';
import { Signup } from './pages/Signup';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ProfileProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-background font-body text-textMain overflow-x-hidden w-full max-w-full">
            <main className="flex-none md:flex-1 bg-white w-full max-w-full">
              <Routes>
                <Route path="/" element={<Navigate to="/signup" replace />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:id" element={<Categories />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-success" element={<OrderConfirmation />} />
                <Route path="/tracking/:id" element={<OrderTracking />} />
                <Route path="/history" element={<OrderHistory />} />
                <Route path="/order/:id" element={<OrderDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
            </main>
            <Footer />
          </div>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ProfileProvider>
  );
}

export default App;
