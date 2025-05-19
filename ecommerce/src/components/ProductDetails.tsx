import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

// Product Details Component
const ProductDetails = ({
  product,
  handleAddToCart,
}: {
  product: any;
  handleAddToCart: any;
}) => {
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity);
  const [isWishlist, setIsWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviews, setShowReviews] = useState(false);
  const navigate = useNavigate();

  // Calculate the discounted price
  const discountedPrice =
    product.price - product.price * (product.discountPercentage / 100);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (
      newQuantity >= product.minimumOrderQuantity &&
      newQuantity <= product.stock
    ) {
      setQuantity(newQuantity);
    }
  };

  // Function to render rating stars
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
              aria-label="Toggle wishlist"
            >
              <Heart
                size={20}
                className={
                  isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image: any, index: any) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-md overflow-hidden ${
                  selectedImage === index
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
            <div className="mt-2 flex items-center">
              {renderRatingStars(product.rating)}
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline mb-1">
              <span className="text-2xl font-bold text-blue-600">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center text-sm mb-2">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span>
                {product.availabilityStatus} - {product.stock} available
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <Truck size={16} className="inline mr-1" />{" "}
              {product.shippingInformation}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <Shield size={16} className="inline mr-1" />{" "}
              {product.warrantyInformation}
            </p>
            <p className="text-sm text-gray-700">
              <RotateCcw size={16} className="inline mr-1" />{" "}
              {product.returnPolicy}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                className="px-2"
              >
                -
              </Button>
              <span className="mx-4 min-w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="px-2"
              >
                +
              </Button>
              <span className="ml-4 text-sm text-gray-500">
                Minimum order: {product.minimumOrderQuantity}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleAddToCart}
              className="flex-grow"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <Heart
                size={20}
                className={isWishlist ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: any, index: any) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`mr-6 pb-3 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`mr-6 pb-3 text-sm font-medium ${
              activeTab === "specifications"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </button>
          <button
            className={`pb-3 text-sm font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>

        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Brand</td>
                    <td className="py-3 font-medium">{product.brand}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Category</td>
                    <td className="py-3 font-medium">{product.category}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">SKU</td>
                    <td className="py-3 font-medium">{product.sku}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Weight</td>
                    <td className="py-3 font-medium">{product.weight} kg</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-500">Barcode</td>
                    <td className="py-3 font-medium">{product.meta.barcode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Dimensions</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Width</td>
                    <td className="py-3 font-medium">
                      {product.dimensions.width} cm
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Height</td>
                    <td className="py-3 font-medium">
                      {product.dimensions.height} cm
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-500">Depth</td>
                    <td className="py-3 font-medium">
                      {product.dimensions.depth} cm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="flex mr-4">
                  {renderRatingStars(product.rating)}
                </div>
                <span className="text-xl font-medium">
                  {product.rating.toFixed(1)}/5
                </span>
                <span className="ml-2 text-gray-500">
                  ({product.reviews.length} reviews)
                </span>
              </div>

              <Button variant="outline">Write a Review</Button>
            </div>

            <div className="space-y-6">
              {product.reviews
                .slice(0, showReviews ? product.reviews.length : 2)
                .map((review: any, index: any) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      {renderRatingStars(review.rating)}
                      <span className="ml-2 font-medium">
                        {review.reviewerName}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}

              {product.reviews.length > 2 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowReviews(!showReviews)}
                  className="flex items-center"
                >
                  {showReviews ? (
                    <>
                      Show Less <ChevronUp size={16} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Show All Reviews{" "}
                      <ChevronDown size={16} className="ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
