import { useState } from "react";
import { FeaturedGrid } from "../components/FeaturedGrid";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/Button";
import { ShoppingCartIcon } from "lucide-react";
import { CartSidebar } from "../components/CartSidebar";

const HomePage = ({ products, cart, handleAddToCart }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cartCount: any = Object.values(cart).reduce(
    (sum: any, qty): any => sum + qty,
    0
  );

  return (
    <div className="h-full w-full">
      <Navbar cartCount={cartCount} />
      <HeroSection products={products} />
      <FeaturedGrid products={products} onAddToCart={handleAddToCart} />
      <Footer />

      <div className="fixed right-4 bottom-8">
        <Button
          onClick={() => setSidebarOpen(true)}
          className="relative rounded-full h-14 w-14"
        >
          <ShoppingCartIcon />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Button>
      </div>

      {sidebarOpen && (
        <CartSidebar
          products={products}
          cart={cart}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
