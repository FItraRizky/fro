import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Masukkan alamat email yang valid', 'warning');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      showToast('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">FRO</span>
            </div>
            <p className="footer-description">
              FRO adalah destinasi fashion terpercaya yang menghadirkan koleksi terbaru dengan kualitas premium. 
              Kami berkomitmen memberikan pengalaman berbelanja terbaik untuk Anda.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={16} />
                <span>Jl. Fashion Street No. 123, Jakarta Selatan</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@fro.co.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Tautan Cepat</h3>
            <ul className="footer-links">
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/produk">Semua Produk</Link></li>
              <li><Link to="/produk?category=fashion">Fashion</Link></li>
              <li><Link to="/produk?category=accessories">Aksesoris</Link></li>
              <li><Link to="/tentang">Tentang Kami</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3 className="footer-title">Layanan Pelanggan</h3>
            <ul className="footer-links">
              <li><Link to="/bantuan">Pusat Bantuan</Link></li>
              <li><Link to="/cara-pemesanan">Cara Pemesanan</Link></li>
              <li><Link to="/pengiriman">Info Pengiriman</Link></li>
              <li><Link to="/pengembalian">Kebijakan Pengembalian</Link></li>
              <li><Link to="/syarat-ketentuan">Syarat & Ketentuan</Link></li>
              <li><Link to="/kebijakan-privasi">Kebijakan Privasi</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="newsletter-description">
              Dapatkan update terbaru tentang produk baru, promo menarik, dan tips fashion langsung di email Anda.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button
                  type="submit"
                  className="newsletter-btn"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <div className="spinner-small"></div>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </form>
            
            {/* Social Media */}
            <div className="social-media">
              <h4 className="social-title">Ikuti Kami</h4>
              <div className="social-links">
                <a href="https://facebook.com/fro" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com/fro" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Instagram size={20} />
                </a>
                <a href="https://twitter.com/fro" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com/fro" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 FRO. Semua hak cipta dilindungi.
            </p>
            <div className="payment-methods">
              <span className="payment-text">Metode Pembayaran:</span>
              <div className="payment-icons">
                <div className="payment-icon">VISA</div>
                <div className="payment-icon">MC</div>
                <div className="payment-icon">BCA</div>
                <div className="payment-icon">OVO</div>
                <div className="payment-icon">DANA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;