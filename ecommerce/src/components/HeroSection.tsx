import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../lib/api";

interface HeroSectionProps {
  products: Product[];
}

export const HeroSection = ({ products }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const autoSlideInterval = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [current, products.length]);

  const nextSlide = () => {
    if (transitioning || products.length === 0) return;
    setTransitioning(true);
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    setTimeout(() => setTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (transitioning || products.length === 0) return;
    setTransitioning(true);
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    setTimeout(() => setTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (transitioning || index === current) return;
    setTransitioning(true);
    setCurrent(index);
    setTimeout(() => setTransitioning(false), 500);
  };

  if (products.length === 0) {
    return <div className="h-96 bg-gray-900"></div>;
  }

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0 min-h-96">
          <div className="flex flex-col items-start justify-center p-8 md:p-12 lg:p-16">
            <div className="max-w-md">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Summer Collection 2025
              </h1>
              <p className="text-gray-300 mb-8 text-lg">
                Discover the latest trends and styles for the upcoming season.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Shop Now</Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center py-12 px-6 md:py-16 md:px-8 h-96">
            <div className="relative w-full h-full">
              {Array.isArray(products) &&
                products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                      index === current
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <div className="bg-white text-black rounded-lg overflow-hidden shadow-xl h-full flex flex-col">
                      <div className="relative h-64 bg-gray-100">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          ${product.price}
                        </p>
                        <p className="mt-2 text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Controls */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-20">
              <button
                onClick={prevSlide}
                className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? "bg-white w-4"
                      : "bg-gray-400 bg-opacity-60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
