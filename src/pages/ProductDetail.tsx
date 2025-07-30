import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Heart, Star, Minus, Plus, Share2, 
  ChevronLeft, ChevronRight, Truck, Shield, RotateCcw,
  MessageCircle, ThumbsUp, Eye, Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts, mockReviews } from '../data/mockData';
import * as Types from '../types/index';

type Product = Types.Product;
import ProductCard from '../components/Product/ProductCard';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, showToast } = useApp();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewsFilter, setReviewsFilter] = useState('all');
  const [showImageModal, setShowImageModal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0].id);
        }
        
        // Get related products
        const related = mockProducts
          .filter(p => p.id !== id && p.category === foundProduct.category)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate('/404');
      }
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="product-detail-loading">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-description"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedVariant: selectedVariant || undefined,
      quantity
    };
    addToCart(cartItem);
    showToast('Produk berhasil ditambahkan ke keranjang!', 'success');
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    addToWishlist(product);
    showToast(
      isWishlisted ? 'Produk dihapus dari wishlist' : 'Produk ditambahkan ke wishlist!',
      'success'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showToast('Link produk berhasil disalin!', 'success');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const productReviews = mockReviews.filter(review => review.productId === product.id);
  const filteredReviews = reviewsFilter === 'all' 
    ? productReviews 
    : productReviews.filter(review => review.rating === parseInt(reviewsFilter));

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = productReviews.filter(review => review.rating === rating).length;
    const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Beranda</Link>
          <span>/</span>
          <Link to="/produk">Produk</Link>
          <span>/</span>
          <Link to={`/produk?category=${product.category.toLowerCase()}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                onClick={() => setShowImageModal(true)}
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    className="image-nav image-prev"
                    onClick={() => setSelectedImageIndex(
                      selectedImageIndex === 0 ? product.images.length - 1 : selectedImageIndex - 1
                    )}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className="image-nav image-next"
                    onClick={() => setSelectedImageIndex(
                      selectedImageIndex === product.images.length - 1 ? 0 : selectedImageIndex + 1
                    )}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Product Badges */}
              <div className="product-badges">
                {product.isNew && (
                  <span className="badge badge-new">Baru</span>
                )}
                {product.isBestseller && (
                  <span className="badge badge-bestseller">
                    <Zap size={12} />
                    Terlaris
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="badge badge-discount">-{discountPercentage}%</span>
                )}
              </div>
              
              {/* Zoom Icon */}
              <div className="zoom-icon">
                <Eye size={16} />
                Klik untuk memperbesar
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{product.name}</h1>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviewCount} ulasan)
                </span>
                <span className="separator">•</span>
                <span className="sold-count">{product.sold || 0} terjual</span>
              </div>
            </div>

            {/* Price */}
            <div className="product-price">
              <div className="current-price">{formatPrice(product.price)}</div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="price-comparison">
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount-badge">Hemat {formatPrice(product.originalPrice - product.price)}</span>
                </div>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="product-variants">
                <h3 className="variant-title">Pilih Varian:</h3>
                <div className="variant-options">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      className={`variant-option ${selectedVariant === variant.id ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(variant.id)}
                    >
                      {variant.color && (
                        <div 
                          className="variant-color"
                          style={{ backgroundColor: variant.color }}
                        />
                      )}
                      <span className="variant-name">{variant.name}</span>
                      {variant.price !== product.price && (
                        <span className="variant-price">+{formatPrice(variant.price - product.price)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="quantity-section">
              <h3 className="quantity-title">Jumlah:</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stockQuantity}
                />
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="stock-info">
                {product.inStock ? `${product.stockQuantity} tersedia` : 'Stok habis'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn btn-primary add-to-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} />
                {!product.inStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
              </button>
              
              <button
                className={`btn btn-outline wishlist ${isWishlisted ? 'active' : ''}`}
                onClick={handleAddToWishlist}
              >
                <Heart size={20} />
                {isWishlisted ? 'Tersimpan' : 'Simpan'}
              </button>
              
              <button className="btn btn-outline share" onClick={handleShare}>
                <Share2 size={20} />
                Bagikan
              </button>
            </div>

            {/* Features */}
            <div className="product-features">
              <div className="feature">
                <Truck size={20} />
                <div>
                  <strong>Gratis Ongkir</strong>
                  <p>Untuk pembelian minimal Rp 300.000</p>
                </div>
              </div>
              <div className="feature">
                <Shield size={20} />
                <div>
                  <strong>Jaminan Kualitas</strong>
                  <p>Produk original dengan kualitas terjamin</p>
                </div>
              </div>
              <div className="feature">
                <RotateCcw size={20} />
                <div>
                  <strong>Easy Return</strong>
                  <p>Pengembalian mudah dalam 30 hari</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Deskripsi
            </button>
            <button
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Spesifikasi
            </button>
            <button
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Ulasan ({productReviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h3>Deskripsi Produk</h3>
                <div className="description-text">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                {product.features && (
                  <div className="product-features-list">
                    <h4>Fitur Utama:</h4>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specifications-content">
                <h3>Spesifikasi</h3>
                <div className="specs-table">
                  <div className="spec-row">
                    <span className="spec-label">Kategori</span>
                    <span className="spec-value">{product.category}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Berat</span>
                    <span className="spec-value">{product.weight || 'N/A'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Dimensi</span>
                    <span className="spec-value">{product.dimensions || 'N/A'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Material</span>
                    <span className="spec-value">{product.material || 'N/A'}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Warna</span>
                    <span className="spec-value">
                      {product.variants?.map(v => v.name).join(', ') || 'Default'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="overall-rating">
                      <div className="rating-number">{product.rating}</div>
                      <div className="rating-stars">
                        {renderStars(product.rating)}
                      </div>
                      <div className="rating-count">{productReviews.length} ulasan</div>
                    </div>
                    
                    <div className="rating-breakdown">
                      {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="rating-bar">
                          <span className="rating-label">{rating} ★</span>
                          <div className="bar-container">
                            <div 
                              className="bar-fill" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="rating-count">({count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="reviews-filter">
                  <select
                    value={reviewsFilter}
                    onChange={(e) => setReviewsFilter(e.target.value)}
                  >
                    <option value="all">Semua Ulasan</option>
                    <option value="5">5 Bintang</option>
                    <option value="4">4 Bintang</option>
                    <option value="3">3 Bintang</option>
                    <option value="2">2 Bintang</option>
                    <option value="1">1 Bintang</option>
                  </select>
                </div>

                <div className="reviews-list">
                  {filteredReviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName}
                            className="reviewer-avatar"
                          />
                          <div>
                            <div className="reviewer-name">{review.userName}</div>
                            <div className="review-date">
                              {new Date(review.createdAt).toLocaleDateString('id-ID')}
                            </div>
                          </div>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <div className="review-content">
                        <p>{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="review-images">
                            {review.images.map((image, index) => (
                              <img key={index} src={image} alt={`Review ${index + 1}`} />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="review-actions">
                        <button className="review-action">
                          <ThumbsUp size={16} />
                          Membantu ({review.helpfulCount || 0})
                        </button>
                        <button className="review-action">
                          <MessageCircle size={16} />
                          Balas
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">Produk Terkait</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => addToCart(relatedProduct)}
                  onAddToWishlist={() => addToWishlist(relatedProduct)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowImageModal(false)}
            >
              ×
            </button>
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name}
            />
            {product.images.length > 1 && (
              <>
                <button
                  className="modal-nav modal-prev"
                  onClick={() => setSelectedImageIndex(
                    selectedImageIndex === 0 ? product.images.length - 1 : selectedImageIndex - 1
                  )}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="modal-nav modal-next"
                  onClick={() => setSelectedImageIndex(
                    selectedImageIndex === product.images.length - 1 ? 0 : selectedImageIndex + 1
                  )}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;