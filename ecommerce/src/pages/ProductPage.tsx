import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import { fetchSmartphones, type Product } from "../lib/api";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  useEffect(() => {
    fetchSmartphones().then((data) => {
      const filtered = data.filter(
        (product) =>
          product.id !== undefined &&
          product.title &&
          product.price !== undefined
      ) as Product[]; // Cast since we validated required fields
      setProducts(filtered.slice(0, 5)); // Take only first 5 valid products
    });
  }, []);

  const selectedProduct = products[selectedProductIndex];

  return (
    <>
      <Navbar />

      {products.length === 0 ? (
        <div className="p-10 text-center">Loading products...</div>
      ) : (
        <div className="flex">
          {/* Sidebar to choose a product */}
          <div className="w-1/4 p-4 border-r">
            <h2 className="font-bold mb-4">Select a Product</h2>
            <ul>
              {products.map((product, index) => (
                <li key={product.id} className="mb-2">
                  <button
                    className={`w-full text-left p-2 rounded ${
                      index === selectedProductIndex
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedProductIndex(index)}
                  >
                    {product.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Details */}
          {/* Product Details */}
          <div className="w-3/4 p-6">
            {selectedProduct && <ProductDetails product={selectedProduct} />}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductPage;
