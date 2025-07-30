import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import * as Types from '../../types/index';

type Product = Types.Product;
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  showQuickView = true
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      layout
    >
      <Link to={`/produk/${product.id}`} className="product-link">
        <motion.div 
          className="product-image-container"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: imageLoaded ? 1 : 1.1, 
              opacity: imageLoaded ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Product Badges */}
          <div className="product-badges">
            {product.isNew && (
              <motion.span 
                className="badge badge-new"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15,
                  delay: 0.1 
                }}
              >
                Baru
              </motion.span>
            )}
            {product.isBestseller && (
              <motion.span 
                className="badge badge-bestseller"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15,
                  delay: 0.2 
                }}
              >
                <Zap size={12} />
                Terlaris
              </motion.span>
            )}
            {discountPercentage > 0 && (
              <motion.span 
                className="badge badge-discount"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15,
                  delay: 0.3 
                }}
              >
                -{discountPercentage}%
              </motion.span>
            )}
            {product.stock === 0 && (
              <motion.span 
                className="badge badge-out-of-stock"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15,
                  delay: 0.4 
                }}
              >
                Habis
              </motion.span>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div 
            className="product-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.button
              className={`action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleAddToWishlist}
              title="Tambah ke Wishlist"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={{ 
                  scale: isWishlisted ? [1, 1.3, 1] : 1,
                  rotate: isWishlisted ? [0, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <Heart size={18} />
              </motion.div>
            </motion.button>
            
            {showQuickView && (
              <motion.button
                className="action-btn quick-view-btn"
                title="Lihat Cepat"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Eye size={18} />
              </motion.button>
            )}
          </motion.div>

          {/* Hover Overlay */}
          <motion.div 
            className="product-overlay"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ShoppingCart size={18} />
              </motion.div>
              {product.stock === 0 ? 'Habis' : 'Tambah ke Keranjang'}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="product-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Category */}
          <motion.div 
            className="product-category"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {product.category}
          </motion.div>
          
          {/* Product Name */}
          <motion.h3 
            className="product-name"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {product.name}
          </motion.h3>
          
          {/* Rating */}
          <motion.div 
            className="product-rating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviewCount} ulasan)
            </span>
          </motion.div>
          
          {/* Price */}
          <motion.div 
            className="product-price"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <motion.span 
              className="current-price"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              {formatPrice(product.price)}
            </motion.span>
            {product.originalPrice && product.originalPrice > product.price && (
              <motion.span 
                className="original-price"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                {formatPrice(product.originalPrice)}
              </motion.span>
            )}
          </motion.div>
          
          {/* Variants Preview */}
          {product.variants && product.variants.length > 0 && (
            <motion.div 
              className="product-variants"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="variant-colors">
                {product.variants.slice(0, 4).map((variant, index) => (
                  <motion.div
                    key={variant.id}
                    className="variant-color"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.7 + (index * 0.1),
                      type: "spring",
                      stiffness: 500
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ backgroundColor: variant.color }}
                    title={variant.name}
                  />
                ))}
                {product.variants.length > 4 && (
                  <motion.span 
                    className="variant-more"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 1.1 }}
                  >
                    +{product.variants.length - 4}
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Stock Status */}
          {product.stock <= 5 && product.stock > 0 && (
            <motion.div 
              className="stock-warning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              Tersisa {product.stock} item
            </motion.div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;