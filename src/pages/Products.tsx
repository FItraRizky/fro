import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, X, Search, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockProducts, mockCategories } from '../data/mockData';
import * as Types from '../types/index';

type Product = Types.Product;
type FilterOptions = Types.FilterOptions;
import ProductCard from '../components/Product/ProductCard';
import './Products.css';

const Products: React.FC = () => {
  const { addToCart, addToWishlist } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: 10000000 },
    rating: 0,
    inStock: false,
    onSale: false
  });

  const itemsPerPage = 12;

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const sale = searchParams.get('sale');
    const search = searchParams.get('search');
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    }
    
    if (sale === 'true') {
      setFilters(prev => ({
        ...prev,
        onSale: true
      }));
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.some(cat => 
          product.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => 
        product.originalPrice && product.originalPrice > product.price
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    handleFilterChange({ categories: newCategories });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 10000000 },
      rating: 0,
      inStock: false,
      onSale: false
    });
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Semua Produk</h1>
            <p className="page-subtitle">
              Temukan {filteredProducts.length} produk yang sesuai dengan kebutuhan Anda
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filter Produk</h3>
              <button
                className="clear-filters"
                onClick={clearFilters}
              >
                Hapus Semua
              </button>
            </div>

            {/* Categories Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Kategori</h4>
              <div className="filter-options">
                {mockCategories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.slug)}
                      onChange={() => handleCategoryToggle(category.slug)}
                    />
                    <span className="checkmark"></span>
                    <span className="option-label">
                      {category.name}
                      <span className="option-count">({category.productCount})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Rentang Harga</h4>
              <div className="price-range">
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min || ''}
                    onChange={(e) => handleFilterChange({
                      priceRange: {
                        ...filters.priceRange,
                        min: Number(e.target.value) || 0
                      }
                    })}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max === 10000000 ? '' : filters.priceRange.max}
                    onChange={(e) => handleFilterChange({
                      priceRange: {
                        ...filters.priceRange,
                        max: Number(e.target.value) || 10000000
                      }
                    })}
                  />
                </div>
                <div className="price-presets">
                  <button
                    className="price-preset"
                    onClick={() => handleFilterChange({
                      priceRange: { min: 0, max: 100000 }
                    })}
                  >
                    {formatPrice(100000)}
                  </button>
                  <button
                    className="price-preset"
                    onClick={() => handleFilterChange({
                      priceRange: { min: 100000, max: 500000 }
                    })}
                  >
                    {formatPrice(100000)} - {formatPrice(500000)}
                  </button>
                  <button
                    className="price-preset"
                    onClick={() => handleFilterChange({
                      priceRange: { min: 500000, max: 1000000 }
                    })}
                  >
                    {formatPrice(500000)} - {formatPrice(1000000)}
                  </button>
                  <button
                    className="price-preset"
                    onClick={() => handleFilterChange({
                      priceRange: { min: 1000000, max: 10000000 }
                    })}
                  >
                    {formatPrice(1000000)}
                  </button>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Rating Minimum</h4>
              <div className="rating-filter">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="filter-option">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange({ rating })}
                    />
                    <span className="radio-mark"></span>
                    <span className="rating-stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`star ${i < rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                      & ke atas
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Other Filters */}
            <div className="filter-group">
              <h4 className="filter-title">Lainnya</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  <span className="option-label">Tersedia</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange({ onSale: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  <span className="option-label">Sedang Diskon</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-left">
                <button
                  className="filters-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={20} />
                  Filter
                </button>
                
                <div className="results-count">
                  Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
                </div>
              </div>
              
              <div className="toolbar-right">
                <div className="sort-dropdown">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Terbaru</option>
                    <option value="popular">Terpopuler</option>
                    <option value="rating">Rating Tertinggi</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="name">Nama A-Z</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
                
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.onSale || filters.inStock || searchQuery) && (
              <div className="active-filters">
                <span className="active-filters-label">Filter aktif:</span>
                
                {searchQuery && (
                  <span className="active-filter">
                    Pencarian: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.categories.map(category => (
                  <span key={category} className="active-filter">
                    {mockCategories.find(c => c.slug === category)?.name || category}
                    <button onClick={() => handleCategoryToggle(category)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
                
                {filters.onSale && (
                  <span className="active-filter">
                    Sedang Diskon
                    <button onClick={() => handleFilterChange({ onSale: false })}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.inStock && (
                  <span className="active-filter">
                    Tersedia
                    <button onClick={() => handleFilterChange({ inStock: false })}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                <button className="clear-all-filters" onClick={clearFilters}>
                  Hapus Semua
                </button>
              </div>
            )}

            {/* Products Grid/List */}
            {paginatedProducts.length > 0 ? (
              <div className={`products-container ${viewMode}`}>
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                    onAddToWishlist={() => addToWishlist(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-content">
                  <h3>Tidak ada produk ditemukan</h3>
                  <p>Coba ubah filter atau kata kunci pencarian Anda</p>
                  <button className="btn btn-primary" onClick={clearFilters}>
                    Hapus Semua Filter
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Sebelumnya
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 2
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="pagination-ellipsis">...</span>
                        )}
                        <button
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))
                  }
                </div>
                
                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="filter-overlay" onClick={() => setShowFilters(false)} />
      )}
    </div>
  );
};

export default Products;