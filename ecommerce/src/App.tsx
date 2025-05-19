import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import { useEffect, useState } from "react";
import { fetchSmartphones } from "./lib/api";
import ProductPage from "./pages/ProductPage";

const App = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    fetchSmartphones().then((data: any) => {
      if (Array.isArray(data)) {
        setProducts(data.slice(0, 5));
      } else {
        console.error("Invalid data returned:", data);
        setProducts([]); // fallback
      }
    });
  }, []);

  const handleAddToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            products={products}
            cart={cart}
            setCart={setCart}
            handleAddToCart={handleAddToCart}
          />
        }
      />
      <Route
        path="/product/:id"
        element={<ProductPage handleAddToCart={handleAddToCart} />}
      />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default App;
