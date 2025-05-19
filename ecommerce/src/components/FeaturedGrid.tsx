import type { Product } from "../lib/api";
import { ProductCard } from "./ProductCard";

type FeaturedGridProps = {
  products: Product[];
  onAddToCart?: (id: number) => void;
};

// Featured Products Grid Component
export const FeaturedGrid = ({ products, onAddToCart }: FeaturedGridProps) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              name={product.title}
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
