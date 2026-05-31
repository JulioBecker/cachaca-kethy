import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useProductStore } from "./store/useProductStore";
import { useOrderStore } from "./store/useOrderStore";
import { initializeDatabase } from "./data/database";

// Global Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/ui/Toast";

// Pages
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import ProductDetail from "./pages/product/ProductDetail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Recovery from "./pages/auth/Recovery";
import ClientDashboard from "./pages/client/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Route Guard for logged-in Customers
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Route Guard for Administrators
function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!user?.isAdmin) {
    return <Navigate to="/minha-conta" replace />;
  }

  return children;
}

// ScrollToTop on Route Change Helper
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Wait a tiny bit for the page/DOM to render
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const loadCustomers = useAuthStore((state) => state.loadCustomers);
  const loadProducts = useProductStore((state) => state.loadProducts);
  const loadOrders = useOrderStore((state) => state.loadOrders);

  // Initialize DB and load stores on mount
  useEffect(() => {
    initializeDatabase();
    loadCustomers();
    loadProducts();
    loadOrders();
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Public Routes Layout */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/catalogo" element={<MainLayout><Catalog /></MainLayout>} />
        <Route path="/produto/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
        <Route path="/carrinho" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/cadastro" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/recuperar-senha" element={<MainLayout><Recovery /></MainLayout>} />
        
        {/* Protected Client Routes Layout */}
        <Route 
          path="/minha-conta" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <ClientDashboard />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes Layout */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            </AdminRoute>
          } 
        />

        {/* Checkout is standalone to look clean and secure */}
        <Route 
          path="/checkout" 
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          } 
        />

        {/* Wildcard Fallback redirects to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Global Slide-up Alerts */}
      <Toast />
    </HashRouter>
  );
}
