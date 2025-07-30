import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Shield, 
  Truck, 
  Clock, 
  Star,
  CheckCircle,
  Globe,
  Leaf,
  Zap
} from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Pelanggan Puas', value: '50,000+' },
    { icon: Award, label: 'Produk Berkualitas', value: '10,000+' },
    { icon: Globe, label: 'Kota Terjangkau', value: '100+' },
    { icon: Star, label: 'Rating Kepuasan', value: '4.8/5' }
  ];
  
  const values = [
    {
      icon: Heart,
      title: 'Kepuasan Pelanggan',
      description: 'Kami mengutamakan kepuasan pelanggan dengan memberikan pelayanan terbaik dan produk berkualitas tinggi.'
    },
    {
      icon: Shield,
      title: 'Kualitas Terjamin',
      description: 'Setiap produk telah melalui kontrol kualitas ketat untuk memastikan standar terbaik sampai ke tangan Anda.'
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Sistem logistik yang efisien memastikan pesanan Anda sampai dengan cepat dan aman.'
    },
    {
      icon: Leaf,
      title: 'Ramah Lingkungan',
      description: 'Kami berkomitmen pada praktik bisnis yang berkelanjutan dan ramah lingkungan.'
    }
  ];
  
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face', // Sarah Johnson - CEO
      description: 'Visioner di balik FRO dengan pengalaman 15 tahun di industri e-commerce.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', // Michael Chen - CTO
      description: 'Ahli teknologi yang memimpin inovasi platform dan pengalaman pengguna.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', // Emily Rodriguez - Head of Operations
      description: 'Mengoptimalkan operasional untuk memastikan efisiensi dan kualitas layanan.'
    },
    {
      name: 'David Kim',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', // David Kim - Head of Marketing
      description: 'Strategi pemasaran kreatif untuk menghubungkan brand dengan pelanggan.'
    }
  ];
  
  const milestones = [
    {
      year: '2018',
      title: 'Berdirinya FRO',
      description: 'Memulai perjalanan sebagai platform e-commerce dengan visi memberikan pengalaman belanja terbaik.'
    },
    {
      year: '2019',
      title: 'Ekspansi Produk',
      description: 'Menambah kategori produk dan bermitra dengan 100+ brand ternama.'
    },
    {
      year: '2020',
      title: 'Jangkauan Nasional',
      description: 'Memperluas layanan ke seluruh Indonesia dengan jaringan distribusi yang kuat.'
    },
    {
      year: '2021',
      title: 'Inovasi Digital',
      description: 'Meluncurkan fitur-fitur canggih seperti AR try-on dan AI recommendation.'
    },
    {
      year: '2022',
      title: 'Sustainability Focus',
      description: 'Mengimplementasikan program ramah lingkungan dan packaging berkelanjutan.'
    },
    {
      year: '2023',
      title: 'Market Leader',
      description: 'Menjadi salah satu platform e-commerce terdepan dengan 50,000+ pelanggan aktif.'
    }
  ];
  
  const features = [
    {
      icon: Clock,
      title: 'Layanan 24/7',
      description: 'Customer service siap membantu Anda kapan saja'
    },
    {
      icon: Shield,
      title: 'Pembayaran Aman',
      description: 'Sistem pembayaran terenkripsi dan terpercaya'
    },
    {
      icon: Truck,
      title: 'Gratis Ongkir',
      description: 'Gratis ongkos kirim untuk pembelian minimal Rp 100.000'
    },
    {
      icon: CheckCircle,
      title: 'Garansi Kualitas',
      description: 'Jaminan kualitas produk atau uang kembali'
    },
    {
      icon: Zap,
      title: 'Proses Cepat',
      description: 'Pemrosesan pesanan dalam 24 jam'
    },
    {
      icon: Heart,
      title: 'Loyalty Program',
      description: 'Dapatkan poin dan reward untuk setiap pembelian'
    }
  ];
  
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Tentang FRO</h1>
              <p className="hero-subtitle">
                Platform e-commerce terdepan yang menghadirkan pengalaman belanja online terbaik 
                dengan produk berkualitas, layanan prima, dan inovasi berkelanjutan.
              </p>
              <div className="hero-stats">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="stat-item">
                      <Icon size={24} />
                      <div className="stat-info">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center" // About FRO hero image 
                alt="About FRO" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-item">
              <div className="mission-icon">
                <Target size={40} />
              </div>
              <h3>Misi Kami</h3>
              <p>
                Menyediakan platform e-commerce yang mudah, aman, dan terpercaya untuk 
                menghubungkan pelanggan dengan produk berkualitas dari berbagai brand terbaik, 
                sambil memberikan pengalaman belanja yang tak terlupakan.
              </p>
            </div>
            
            <div className="mission-item">
              <div className="mission-icon">
                <Star size={40} />
              </div>
              <h3>Visi Kami</h3>
              <p>
                Menjadi platform e-commerce pilihan utama di Indonesia yang dikenal karena 
                inovasi, kualitas layanan, dan komitmen terhadap kepuasan pelanggan serta 
                keberlanjutan lingkungan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Nilai-Nilai Kami</h2>
            <p>Prinsip-prinsip yang memandu setiap langkah perjalanan FRO</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Perjalanan Kami</h2>
            <p>Milestone penting dalam perkembangan FRO</p>
          </div>
          
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">{milestone.year}</div>
                </div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Tim Kami</h2>
            <p>Orang-orang hebat di balik kesuksesan FRO</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Mengapa Memilih FRO?</h2>
            <p>Keunggulan yang membuat FRO berbeda dari yang lain</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Bergabunglah dengan Jutaan Pelanggan Puas</h2>
            <p>
              Rasakan pengalaman belanja online terbaik bersama FRO. 
              Dapatkan produk berkualitas dengan layanan yang memuaskan.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Mulai Belanja</button>
              <button className="btn btn-secondary">Hubungi Kami</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;