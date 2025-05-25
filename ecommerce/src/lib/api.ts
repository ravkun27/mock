// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
export type Product = {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: ProductDimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: ProductReview[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: ProductMeta;
  images?: string[];
  thumbnail?: string;
};

export const fetchProducts = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.products)) {
      return data.products as any;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // fallback: return an empty array
  }
};


export const fetchProductById = async (
  id: string | number
): Promise<Product> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
