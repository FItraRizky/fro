import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import * as Types from '../types/index';

type AppState = Types.AppState;
type CartItem = Types.CartItem;
type WishlistItem = Types.WishlistItem;
type User = Types.User;
type Product = Types.Product;

interface AppContextType {
  state: AppState;
  addToCart: (product: Product, quantity?: number, variants?: { [key: string]: string }) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; variants?: { [key: string]: string } } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, variants } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        item => item.productId === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;
        updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price;
        return { ...state, cart: updatedCart };
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedVariants: variants,
          price: product.price,
          totalPrice: product.price * quantity,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== itemId),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === itemId
            ? { ...item, quantity, totalPrice: item.price * quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_TO_WISHLIST': {
      const product = action.payload;
      const exists = state.wishlist.some(item => item.productId === product.id);
      if (exists) return state;

      const newWishlistItem: WishlistItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        product,
        addedAt: new Date(),
      };
      return { ...state, wishlist: [...state.wishlist, newWishlistItem] };
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.productId !== action.payload),
      };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'LOAD_CART':
      return { ...state, cart: action.payload };

    case 'LOAD_WISHLIST':
      return { ...state, wishlist: action.payload };

    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fro-cart');
    const savedWishlist = localStorage.getItem('fro-wishlist');
    const savedUser = localStorage.getItem('fro-user');

    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    if (savedWishlist) {
      try {
        const wishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fro-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fro-wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('fro-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('fro-user');
    }
  }, [state.user]);

  const addToCart = (product: Product, quantity = 1, variants?: { [key: string]: string }) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, variants } });
    showToast(`${product.name} ditambahkan ke keranjang`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    showToast('Produk dihapus dari keranjang', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    showToast('Keranjang dikosongkan', 'info');
  };

  const addToWishlist = (product: Product) => {
    const exists = state.wishlist.some(item => item.productId === product.id);
    if (exists) {
      showToast('Produk sudah ada di wishlist', 'warning');
      return;
    }
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    showToast(`${product.name} ditambahkan ke wishlist`, 'success');
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    showToast('Produk dihapus dari wishlist', 'info');
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  };

  const value: AppContextType = {
    state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    setUser,
    setLoading,
    setError,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}