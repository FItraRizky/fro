// Types untuk aplikasi e-commerce FRO

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  sold?: number;
  inStock: boolean;
  stockQuantity: number;
  variants?: ProductVariant[];
  specifications?: { [key: string]: string };
  features?: string[];
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  weight?: string;
  dimensions?: string;
  material?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  type: 'color' | 'size' | 'material';
  name: string;
  value: string;
  color?: string;
  price: number;
  image?: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants?: { [key: string]: string };
  price: number;
  totalPrice: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  image?: string;
  name?: string;
  price?: number;
  addedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: WishlistItem[];
  rewardPoints: number;
  createdAt: Date;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
  selectedVariants?: { [key: string]: string };
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  carrier: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  helpfulCount?: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
  isActive: boolean;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  expiresAt?: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  readTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  position?: string;
  company?: string;
  createdAt: Date;
}

export interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

export interface FilterOptions {
  category?: string;
  categories?: string[];
  priceRange?: { min: number; max: number };
  rating?: number;
  brand?: string[];
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'bestseller';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  brand: string;
  sortBy: string;
}