import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import { useEffect, useState } from "react";
import SignupPage from "./pages/SignUpPage";
import { fetchProducts } from "././lib/api"; // adjust path as needed

interface User {
  id: string;
  email: string;
  role: string;
}

const App = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user data in localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);

    // Fetch products
    fetchProducts()
      .then((data: any) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Invalid data returned:", data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleLogin = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Protected Route Component
  const ProtectedRoute = ({
    children,
    requireAdmin = false,
  }: {
    children: React.ReactNode;
    requireAdmin?: boolean;
  }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (requireAdmin && user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  // Public Route Component (redirect if already logged in)
  const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (user) {
      return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
    }

    return <>{children}</>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage onLogin={handleLogin} />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage
              products={products}
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductPage
              handleAddToCart={handleAddToCart}
              products={products}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
