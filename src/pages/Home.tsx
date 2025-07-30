import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { mockProducts, mockCategories, mockTestimonials, mockBlogPosts } from '../data/mockData';
import ProductCard from '../components/Product/ProductCard';
import './Home.css';

const Home: React.FC = () => {
  const { addToCart, addToWishlist } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: 'Koleksi Fashion Terbaru 2024',
      subtitle: 'Temukan Gaya Terdepan',
      description: 'Eksplorasi koleksi fashion terbaru dengan desain modern dan kualitas premium yang akan membuat Anda tampil percaya diri.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center', // Fashion koleksi terbaru
      cta: 'Belanja Sekarang',
      link: '/produk?category=fashion'
    },
    {
      id: 2,
      title: 'Aksesoris Premium',
      subtitle: 'Sempurnakan Penampilan Anda',
      description: 'Koleksi aksesoris eksklusif yang dirancang untuk melengkapi gaya hidup modern Anda dengan sentuhan elegan.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop&crop=center', // Aksesoris premium
      cta: 'Lihat Koleksi',
      link: '/produk?category=accessories'
    },
    {
      id: 3,
      title: 'Diskon Hingga 50%',
      subtitle: 'Sale Spektakuler',
      description: 'Jangan lewatkan kesempatan emas untuk mendapatkan produk favorit Anda dengan harga terbaik tahun ini.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop&crop=center', // Sale spektakuler
      cta: 'Belanja Sale',
      link: '/produk?sale=true'
    }
  ];

  const featuredProducts = mockProducts.filter(product => product.isFeatured).slice(0, 8);
  const newProducts = mockProducts.filter(product => product.isNew).slice(0, 4);
  const bestsellerProducts = mockProducts.filter(product => product.isBestseller).slice(0, 4);

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
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

  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          <AnimatePresence mode="wait">
            {heroSlides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  className="hero-slide active"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="hero-overlay"></div>
                  <div className="container">
                    <motion.div 
                      className="hero-content"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <motion.span 
                        className="hero-subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        {slide.subtitle}
                      </motion.span>
                      <motion.h1 
                        className="hero-title"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        className="hero-description"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        <Link to={slide.link} className="btn btn-primary hero-cta">
                          {slide.cta}
                          <ArrowRight size={20} />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        <motion.button 
          className="hero-nav hero-prev" 
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button 
          className="hero-nav hero-next" 
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ChevronRight size={24} />
        </motion.button>
        
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <motion.section 
        className="categories-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Jelajahi Kategori</h2>
            <p className="section-subtitle">Temukan produk sesuai kebutuhan Anda</p>
          </motion.div>
          <motion.div 
            className="categories-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {mockCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                  <Link
                    to={`/produk?category=${category.slug}`}
                    className="category-card"
                  >
                    <div className="category-image">
                      <img src={category.image} alt={category.name} />
                    </div>
                    <div className="category-content">
                      <h3 className="category-name">{category.name}</h3>
                      <p className="category-count">{category.productCount} produk</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

      {/* Featured Products */}
      <motion.section 
        className="featured-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Produk Unggulan</h2>
            <p className="section-subtitle">Koleksi terbaik pilihan kami</p>
          </motion.div>
          <motion.div 
            className="products-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product)}
                  onAddToWishlist={() => addToWishlist(product)}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="section-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/produk" className="btn btn-outline">
              Lihat Semua Produk
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Promo Banner */}
      <motion.section 
        className="promo-banner"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="promo-content">
            <motion.div 
              className="promo-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="promo-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Penawaran Terbatas
              </motion.span>
              <motion.h2 
                className="promo-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Diskon Hingga 50% untuk Member Baru
              </motion.h2>
              <motion.p 
                className="promo-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Bergabunglah dengan komunitas FRO dan nikmati berbagai keuntungan eksklusif, 
                termasuk diskon spesial, akses early bird, dan poin reward.
              </motion.p>
              <motion.div 
                className="promo-actions"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/register" className="btn btn-primary">
                    Daftar Sekarang
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/produk?sale=true" className="btn btn-outline">
                    Lihat Promo
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="promo-image"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=400&fit=crop&crop=center" // Gambar promo member 
                alt="Promo" 
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* New Arrivals */}
      <motion.section 
        className="new-arrivals-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Produk Terbaru</h2>
            <p className="section-subtitle">Koleksi terdepan yang baru saja tiba</p>
          </motion.div>
          <motion.div 
            className="products-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product)}
                  onAddToWishlist={() => addToWishlist(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Bestsellers */}
      <motion.section 
        className="bestsellers-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Produk Terlaris</h2>
            <p className="section-subtitle">Pilihan favorit pelanggan kami</p>
          </motion.div>
          <motion.div 
            className="products-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {bestsellerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product)}
                  onAddToWishlist={() => addToWishlist(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="features-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: Truck, title: "Gratis Ongkir", description: "Gratis ongkos kirim untuk pembelian minimal Rp 300.000 ke seluruh Indonesia" },
              { icon: Shield, title: "Jaminan Kualitas", description: "Semua produk telah melalui quality control ketat untuk memastikan kualitas terbaik" },
              { icon: RotateCcw, title: "Easy Return", description: "Kebijakan pengembalian mudah dalam 30 hari jika produk tidak sesuai ekspektasi" },
              { icon: Headphones, title: "Customer Support 24/7", description: "Tim customer service kami siap membantu Anda kapan saja melalui berbagai channel" }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div 
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="feature-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 + (0.1 * index),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <IconComponent size={32} />
                  </motion.div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="testimonials-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Apa Kata Pelanggan</h2>
            <p className="section-subtitle">Testimoni dari pelanggan yang puas</p>
          </motion.div>
          <motion.div 
            className="testimonials-slider"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="testimonial-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {mockTestimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id} 
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === currentTestimonial ? 1 : 0.7,
                    y: index === currentTestimonial ? 0 : 10,
                    scale: index === currentTestimonial ? 1 : 0.95
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="testimonial-content">
                    <motion.div 
                      className="testimonial-rating"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {renderStars(testimonial.rating)}
                    </motion.div>
                    <motion.p 
                      className="testimonial-comment"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      "{testimonial.comment}"
                    </motion.p>
                    <motion.div 
                      className="testimonial-author"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-position">{testimonial.position}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="testimonial-indicators">
            {mockTestimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`testimonial-indicator ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Blog & Tips</h2>
            <p className="section-subtitle">Artikel terbaru seputar fashion dan lifestyle</p>
          </div>
          <div className="blog-grid">
            {mockBlogPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-author">By {post.author}</span>
                    <span className="blog-read-time">{post.readTime} min read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/blog" className="btn btn-outline">
              Baca Artikel Lainnya
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Siap Memulai Perjalanan Fashion Anda?</h2>
            <p className="cta-description">
              Bergabunglah dengan ribuan pelanggan yang telah merasakan pengalaman berbelanja terbaik di FRO. 
              Dapatkan akses ke koleksi eksklusif dan penawaran menarik.
            </p>
            <div className="cta-actions">
              <Link to="/produk" className="btn btn-primary">
                Mulai Belanja
                <ShoppingCart size={20} />
              </Link>
              <Link to="/tentang" className="btn btn-outline">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;