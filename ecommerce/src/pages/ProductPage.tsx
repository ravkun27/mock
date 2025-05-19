import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import { fetchProductById } from "../lib/api";

// Single Product Detail Page Component
const ProductPage = (handleAddToCart: any) => {
  const { id } = useParams(); // Get the product ID from URL
  const location = useLocation();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // First check if product was passed in location state (for faster loading)
        if (location.state?.product) {
          setProduct(location.state.product);
          setLoading(false);
          return;
        }

        // Otherwise fetch product by ID
        const productId = id || location.state?.productId;
        if (!productId) {
          throw new Error("Product ID is missing");
        }

        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.state]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Error Loading Product
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : product ? (
          <ProductDetails handleAddToCart={handleAddToCart} product={product} />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-600">
              The product you're looking for does not exist or has been removed.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
