import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Gift, Truck, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts, mockPromoCodes, mockShippingMethods } from '../data/mockData';
import './Cart.css';

const Cart: React.FC = () => {
  const { state, dispatch, showToast } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('regular');
  const [estimatedLocation, setEstimatedLocation] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      showToast('Produk dihapus dari keranjang', 'info');
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { itemId, quantity: newQuantity }
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    const cartItem = state.cart.find(item => item.id === itemId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    showToast(`${cartItem?.product?.name || 'Produk'} dihapus dari keranjang`, 'info');
  };

  const applyPromoCode = () => {
    const promo = mockPromoCodes.find(p => p.code === promoCode.toUpperCase());
    if (promo && promo.isActive) {
      setAppliedPromo(promo.code);
      showToast(`Kode promo ${promo.code} berhasil diterapkan!`, 'success');
    } else {
      showToast('Kode promo tidak valid atau sudah kedaluwarsa', 'error');
    }
  };

  const calculateShipping = () => {
    if (!estimatedLocation) return;
    
    const selectedShipping = mockShippingMethods.find(s => s.id === shippingMethod);
    if (selectedShipping) {
      // Simulasi perhitungan ongkir berdasarkan lokasi
      const baseCost = selectedShipping.price;
      const locationMultiplier = estimatedLocation.toLowerCase().includes('jakarta') ? 1 : 1.5;
      setShippingCost(baseCost * locationMultiplier);
      
      showToast('Ongkos kirim berhasil dihitung', 'success');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCartItemsWithProducts = () => {
    return state.cart.map(cartItem => {
      const product = mockProducts.find(p => p.id === cartItem.productId);
      return { ...cartItem, product };
    }).filter(item => item.product);
  };

  const cartItems = getCartItemsWithProducts();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  
  const appliedPromoData = appliedPromo ? mockPromoCodes.find(p => p.code === appliedPromo) : null;
  const discount = appliedPromoData ? 
    (appliedPromoData.type === 'percentage' ? 
      subtotal * (appliedPromoData.value / 100) : 
      appliedPromoData.value) : 0;
  
  const total = subtotal - discount + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>Keranjang Belanja Kosong</h2>
            <p>Belum ada produk yang ditambahkan ke keranjang Anda</p>
            <Link to="/produk" className="btn btn-primary">
              <ArrowLeft size={20} />
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <h1>Keranjang Belanja</h1>
          <p>{cartItems.length} item dalam keranjang</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <h3>Produk yang Dipilih</h3>
              <Link to="/produk" className="continue-shopping">
                <ArrowLeft size={16} />
                Lanjut Belanja
              </Link>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${JSON.stringify(item.selectedVariants)}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.product!.images[0]} alt={item.product!.name} />
                  </div>
                  
                  <div className="item-details">
                    <Link to={`/produk/${item.productId}`} className="item-name">
                      {item.product!.name}
                    </Link>
                    <div className="item-category">{item.product!.category}</div>
                    
                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <div className="item-variants">
                        {Object.entries(item.selectedVariants).map(([key, value]) => (
                          <span key={key} className="variant-tag">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="item-price">
                      {formatPrice(item.product!.price)}
                    </div>
                  </div>
                  
                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        max={item.product!.stockQuantity}
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product!.stockQuantity}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="stock-info">
                      Stok: {item.product!.stockQuantity}
                    </div>
                  </div>
                  
                  <div className="item-total">
                    {formatPrice(item.product!.price * item.quantity)}
                  </div>
                  
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                    title="Hapus dari keranjang"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Ringkasan Pesanan</h3>
              
              {/* Promo Code */}
              <div className="promo-section">
                <h4>
                  <Gift size={18} />
                  Kode Promo
                </h4>
                <div className="promo-input">
                  <input
                    type="text"
                    placeholder="Masukkan kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  />
                  <button 
                    className="btn btn-secondary"
                    onClick={applyPromoCode}
                    disabled={!promoCode}
                  >
                    Terapkan
                  </button>
                </div>
                {appliedPromo && (
                  <div className="applied-promo">
                    <span className="promo-code">{appliedPromo}</span>
                    <button 
                      className="remove-promo"
                      onClick={() => {
                        setAppliedPromo(null);
                        setPromoCode('');
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Shipping Calculator */}
              <div className="shipping-section">
                <h4>
                  <Truck size={18} />
                  Pengiriman
                </h4>
                
                <div className="shipping-input">
                  <input
                    type="text"
                    placeholder="Masukkan kota tujuan"
                    value={estimatedLocation}
                    onChange={(e) => setEstimatedLocation(e.target.value)}
                  />
                </div>
                
                <div className="shipping-methods">
                  {mockShippingMethods.map((method) => (
                    <label key={method.id} className="shipping-option">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div className="method-info">
                        <div className="method-name">{method.name}</div>
                        <div className="method-time">{method.estimatedDays}</div>
                      </div>
                      <div className="method-price">
                        {formatPrice(method.price)}
                      </div>
                    </label>
                  ))}
                </div>
                
                <button 
                  className="btn btn-secondary calculate-shipping"
                  onClick={calculateShipping}
                  disabled={!estimatedLocation}
                >
                  Hitung Ongkir
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal ({cartItems.length} item)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="price-row discount">
                    <span>Diskon ({appliedPromo})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                
                {shippingCost > 0 && (
                  <div className="price-row">
                    <span>Ongkos Kirim</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                )}
                
                <div className="price-row total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Security Info */}
              <div className="security-info">
                <Shield size={16} />
                <span>Pembayaran aman dan terpercaya</span>
              </div>

              {/* Checkout Button */}
              <Link 
                to="/checkout" 
                className="btn btn-primary checkout-btn"
                state={{ 
                  cartItems, 
                  subtotal, 
                  discount, 
                  shippingCost, 
                  total,
                  appliedPromo,
                  shippingMethod,
                  estimatedLocation
                }}
              >
                Lanjut ke Pembayaran
              </Link>
              
              <div className="continue-shopping-mobile">
                <Link to="/produk" className="btn btn-secondary">
                  <ArrowLeft size={16} />
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-item">
            <Shield size={24} />
            <div>
              <h4>Pembayaran Aman</h4>
              <p>Transaksi dilindungi enkripsi SSL</p>
            </div>
          </div>
          <div className="trust-item">
            <Truck size={24} />
            <div>
              <h4>Pengiriman Cepat</h4>
              <p>Gratis ongkir untuk pembelian di atas Rp 500.000</p>
            </div>
          </div>
          <div className="trust-item">
            <Gift size={24} />
            <div>
              <h4>Garansi Kualitas</h4>
              <p>Jaminan uang kembali 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;