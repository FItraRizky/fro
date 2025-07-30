import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
}

const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon',
      details: ['+62 21 1234 5678', '+62 812 3456 7890'],
      description: 'Senin - Jumat: 08:00 - 17:00 WIB'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@fro.com', 'support@fro.com'],
      description: 'Respon dalam 24 jam'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      details: ['Jl. Sudirman No. 123', 'Jakarta Pusat 10220'],
      description: 'Indonesia'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 09:00 - 15:00'],
      description: 'Minggu: Tutup'
    }
  ];
  
  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat langsung dengan tim support kami',
      action: 'Mulai Chat',
      available: true
    },
    {
      icon: Headphones,
      title: 'Customer Service',
      description: 'Hubungi customer service melalui telepon',
      action: 'Hubungi Sekarang',
      available: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Kirim pertanyaan melalui email',
      action: 'Kirim Email',
      available: true
    },
    {
      icon: Globe,
      title: 'Help Center',
      description: 'Temukan jawaban di pusat bantuan',
      action: 'Kunjungi',
      available: true
    }
  ];
  
  const socialMedia = [
    { icon: Facebook, name: 'Facebook', url: '#', color: '#1877f2' },
    { icon: Twitter, name: 'Twitter', url: '#', color: '#1da1f2' },
    { icon: Instagram, name: 'Instagram', url: '#', color: '#e4405f' },
    { icon: Youtube, name: 'YouTube', url: '#', color: '#ff0000' }
  ];
  
  const categories = [
    { value: 'general', label: 'Pertanyaan Umum' },
    { value: 'order', label: 'Pesanan' },
    { value: 'product', label: 'Produk' },
    { value: 'shipping', label: 'Pengiriman' },
    { value: 'payment', label: 'Pembayaran' },
    { value: 'return', label: 'Pengembalian' },
    { value: 'technical', label: 'Teknis' },
    { value: 'partnership', label: 'Kemitraan' }
  ];
  
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek wajib diisi';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('Pesan berhasil dikirim! Kami akan merespons dalam 24 jam.', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
      
    } catch (error) {
      showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSupportAction = (channel: string) => {
    showToast(`Menghubungkan ke ${channel}...`, 'info');
  };
  
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hubungi Kami</h1>
            <p>
              Kami siap membantu Anda! Hubungi tim customer service kami yang ramah 
              dan berpengalaman untuk mendapatkan bantuan terbaik.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="contact-info-card">
                  <div className="info-icon">
                    <Icon size={28} />
                  </div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="info-detail">{detail}</p>
                    ))}
                    <p className="info-description">{info.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Support Channels */}
      <section className="support-section">
        <div className="container">
          <div className="section-header">
            <h2>Cara Lain Menghubungi Kami</h2>
            <p>Pilih channel yang paling nyaman untuk Anda</p>
          </div>
          
          <div className="support-grid">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div key={index} className="support-card">
                  <div className="support-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{channel.title}</h3>
                  <p>{channel.description}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleSupportAction(channel.title)}
                    disabled={!channel.available}
                  >
                    {channel.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2>Kirim Pesan</h2>
                <p>Isi form di bawah ini dan kami akan merespons secepatnya</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="nama@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Nomor Telepon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="category">Kategori</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subjek *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? 'error' : ''}
                    placeholder="Ringkasan singkat pertanyaan Anda"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Pesan *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Jelaskan pertanyaan atau masalah Anda secara detail..."
                    rows={6}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                  <div className="character-count">
                    {formData.message.length}/500 karakter
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Map & Additional Info */}
            <div className="map-container">
              <div className="map-placeholder">
                <MapPin size={48} />
                <h3>Lokasi Kantor Kami</h3>
                <p>Jl. Sudirman No. 123<br />Jakarta Pusat 10220<br />Indonesia</p>
                <button className="btn btn-secondary">Lihat di Maps</button>
              </div>
              
              <div className="additional-info">
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Respon dalam 24 jam</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Tim support berpengalaman</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Layanan dalam Bahasa Indonesia</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Support 7 hari seminggu</span>
                </div>
              </div>
              
              <div className="social-media">
                <h4>Ikuti Kami</h4>
                <div className="social-links">
                  {socialMedia.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a 
                        key={index} 
                        href={social.url} 
                        className="social-link"
                        style={{ backgroundColor: social.color }}
                        title={social.name}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <p>Temukan jawaban cepat untuk pertanyaan umum</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Bagaimana cara melacak pesanan saya?</h3>
              <p>Anda dapat melacak pesanan melalui halaman "Pesanan Saya" di akun Anda atau menggunakan nomor resi yang dikirim via email.</p>
            </div>
            
            <div className="faq-item">
              <h3>Berapa lama waktu pengiriman?</h3>
              <p>Waktu pengiriman bervariasi tergantung lokasi. Umumnya 1-3 hari untuk Jabodetabek dan 3-7 hari untuk luar kota.</p>
            </div>
            
            <div className="faq-item">
              <h3>Bagaimana kebijakan pengembalian?</h3>
              <p>Kami menerima pengembalian dalam 7 hari setelah barang diterima, dengan syarat barang masih dalam kondisi asli.</p>
            </div>
            
            <div className="faq-item">
              <h3>Metode pembayaran apa saja yang tersedia?</h3>
              <p>Kami menerima transfer bank, kartu kredit/debit, e-wallet, dan cicilan 0% untuk pembelian tertentu.</p>
            </div>
          </div>
          
          <div className="faq-cta">
            <p>Tidak menemukan jawaban yang Anda cari?</p>
            <button className="btn btn-primary">Lihat Semua FAQ</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;