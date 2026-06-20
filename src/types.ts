export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  description: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  hindiName?: string;
  icon: string; // Lucide icon name
  description: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  status?: string; // e.g. "Verified Buyer"
}

export interface PromoOffer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  expiryDate: string;
  bgGradient: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
