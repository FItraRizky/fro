import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockCategories } from '../../data/mockData';

const Header: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produk?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-text">FRO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
              Beranda
            </Link>
            <div className="nav-dropdown">
              <Link to="/produk" className={location.pathname.startsWith('/produk') ? 'nav-link active' : 'nav-link'}>
                Produk
              </Link>
              <div className="dropdown-content">
                {mockCategories.map(category => (
                  <div key={category.id} className="dropdown-section">
                    <Link to={`/produk?category=${category.slug}`} className="dropdown-title">
                      {category.name}
                    </Link>
                    {category.children && (
                      <div className="dropdown-items">
                        {category.children.map(child => (
                          <Link
                            key={child.id}
                            to={`/produk?category=${child.slug}`}
                            className="dropdown-item"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Link to="/tentang" className={location.pathname === '/tentang' ? 'nav-link active' : 'nav-link'}>
              Tentang
            </Link>
            <Link to="/kontak" className={location.pathname === '/kontak' ? 'nav-link active' : 'nav-link'}>
              Kontak
            </Link>
          </nav>

          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          {/* Action Icons */}
          <div className="header-actions">
            <Link to="/akun" className="action-icon" title="Akun">
              <User size={24} />
            </Link>
            <Link to="/wishlist" className="action-icon" title="Wishlist">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/keranjang" className="action-icon" title="Keranjang">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="badge">{cartItemsCount}</span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
          <div className="mobile-nav-content">
            <Link to="/" className="mobile-nav-link">
              Beranda
            </Link>
            <Link to="/produk" className="mobile-nav-link">
              Semua Produk
            </Link>
            {mockCategories.map(category => (
              <div key={category.id} className="mobile-nav-section">
                <Link to={`/produk?category=${category.slug}`} className="mobile-nav-category">
                  {category.name}
                </Link>
                {category.children && (
                  <div className="mobile-nav-subcategories">
                    {category.children.map(child => (
                      <Link
                        key={child.id}
                        to={`/produk?category=${child.slug}`}
                        className="mobile-nav-subcategory"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/tentang" className="mobile-nav-link">
              Tentang
            </Link>
            <Link to="/kontak" className="mobile-nav-link">
              Kontak
            </Link>
            <div className="mobile-nav-divider"></div>
            <Link to="/akun" className="mobile-nav-link">
              Akun Saya
            </Link>
            <Link to="/wishlist" className="mobile-nav-link">
              Wishlist ({wishlistCount})
            </Link>
            <Link to="/keranjang" className="mobile-nav-link">
              Keranjang ({cartItemsCount})
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search">
        <div className="container">
          <form className="search-form-mobile" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;