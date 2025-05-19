import { Heart } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";

// Product Card Component
export const ProductCard = ({
  id,
  name,
  price,
  thumbnail,
  category,
  rating,
  onAddToCart,
}: any) => {
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt={name} className="w-full h-64 object-cover" />
        <button
          onClick={() => setIsWishlist(!isWishlist)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={20}
            className={
              isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
        {category && (
          <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-900 mb-1">{name}</h3>

        {rating !== undefined && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
          <Button variant="default" size="sm" onClick={() => onAddToCart?.(id)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
