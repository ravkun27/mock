import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

// Navbar Component
export const Navbar = ({ cartCount = 0 }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#111518] shadow-sm relative top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-26">
          <div className="flex items-center justify-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-white">ShopBrand</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-8 text-md">
            <a
              href="/"
              className="border-b-2 border-gray-200 px-1 pt-1 font-medium text-gray-500"
            >
              Home
            </a>
            <a
              href="/products"
              className="border-transparent border-b-2 px-1 pt-1 font-medium text-gray-500 hover:text-gray-100"
            >
              Products
            </a>
            <a
              href="/categories"
              className="border-transparent border-b-2 px-1 pt-1 font-medium text-gray-500 hover:text-gray-100"
            >
              Categories
            </a>
            <a
              href="/deals"
              className="border-transparent border-b-2 px-1 pt-1 font-medium text-gray-500 hover:text-gray-100"
            >
              Deals
            </a>
          </div>

          <div className="flex items-center ">
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-700">
                <Search size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <User size={20} />
              </button>
              <a
                href="/cart"
                className="relative text-gray-500 hover:text-gray-700"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-black text-base font-medium text-gray-900 bg-gray-50"
            >
              Home
            </a>
            <a
              href="/products"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Products
            </a>
            <a
              href="/categories"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Categories
            </a>
            <a
              href="/deals"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Deals
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Search size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <User size={20} />
              </button>
              <a
                href="/cart"
                className="relative text-gray-500 hover:text-gray-700"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
