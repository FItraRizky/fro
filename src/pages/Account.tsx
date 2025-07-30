import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Lock, 
  Heart, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Account.css';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

const Account: React.FC = () => {
  const { state, dispatch, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+62 812 3456 7890',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    postalCode: '12345'
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: true,
    email: true
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const handleProfileUpdate = () => {
    setIsEditing(false);
    showToast('Profil berhasil diperbarui', 'success');
  };
  
  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Password baru dan konfirmasi password tidak cocok', 'error');
      return;
    }
    
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Password berhasil diubah', 'success');
  };
  
  const handleNotificationUpdate = () => {
    showToast('Pengaturan notifikasi berhasil disimpan', 'success');
  };
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    showToast('Anda telah keluar dari akun', 'info');
  };
  
  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    showToast('Produk dihapus dari wishlist', 'info');
  };
  
  const mockOrders = [
    {
      id: 'FRO-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 1250000,
      items: 3
    },
    {
      id: 'FRO-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 750000,
      items: 2
    },
    {
      id: 'FRO-003',
      date: '2024-01-05',
      status: 'processing',
      total: 2100000,
      items: 5
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#22c55e';
      case 'shipped': return '#3b82f6';
      case 'processing': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Terkirim';
      case 'shipped': return 'Dikirim';
      case 'processing': return 'Diproses';
      case 'cancelled': return 'Dibatalkan';
      default: return 'Unknown';
    }
  };
  
  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'orders', label: 'Pesanan', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Alamat', icon: MapPin },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];
  
  return (
    <div className="account-page">
      <div className="container">
        {/* Header */}
        <div className="account-header">
          <div className="user-info">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <div className="user-details">
              <h1>Halo, {profile.firstName}!</h1>
              <p>Kelola akun dan preferensi Anda</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Keluar
          </button>
        </div>
        
        <div className="account-content">
          {/* Sidebar */}
          <div className="account-sidebar">
            <nav className="account-nav">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="account-main">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Informasi Profil</h2>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                    {isEditing ? 'Batal' : 'Edit'}
                  </button>
                </div>
                
                <div className="profile-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nama Depan</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Nama Belakang</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Nomor Telepon</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Tanggal Lahir</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Jenis Kelamin</label>
                      <select
                        value={profile.gender}
                        onChange={(e) => setProfile({...profile, gender: e.target.value})}
                        disabled={!isEditing}
                      >
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h3>Alamat</h3>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Alamat Lengkap</label>
                        <textarea
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Kota</label>
                        <input
                          type="text"
                          value={profile.city}
                          onChange={(e) => setProfile({...profile, city: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Provinsi</label>
                        <input
                          type="text"
                          value={profile.province}
                          onChange={(e) => setProfile({...profile, province: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Kode Pos</label>
                        <input
                          type="text"
                          value={profile.postalCode}
                          onChange={(e) => setProfile({...profile, postalCode: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={handleProfileUpdate}>
                        <Save size={16} />
                        Simpan Perubahan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Riwayat Pesanan</h2>
                </div>
                
                <div className="orders-list">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>Pesanan #{order.id}</h3>
                          <p>{new Date(order.date).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                          {getStatusText(order.status)}
                        </div>
                      </div>
                      
                      <div className="order-details">
                        <div className="order-meta">
                          <span>{order.items} item</span>
                          <span>•</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                        
                        <div className="order-actions">
                          <button className="btn btn-secondary">Lihat Detail</button>
                          {order.status === 'delivered' && (
                            <button className="btn btn-primary">Beli Lagi</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Wishlist Saya</h2>
                  <p>{state.wishlist.length} produk</p>
                </div>
                
                {state.wishlist.length === 0 ? (
                  <div className="empty-state">
                    <Heart size={60} />
                    <h3>Wishlist Kosong</h3>
                    <p>Belum ada produk yang ditambahkan ke wishlist</p>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {state.wishlist.map((item) => (
                      <div key={item.id} className="wishlist-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-info">
                          <h3>{item.name}</h3>
                          <div className="item-price">{formatPrice(item.price || 0)}</div>
                          <div className="item-actions">
                            <button className="btn btn-primary">Tambah ke Keranjang</button>
                            <button 
                              className="btn btn-secondary"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Keamanan Akun</h2>
                </div>
                
                <div className="security-section">
                  <h3>Ubah Password</h3>
                  <div className="password-form">
                    <div className="form-group">
                      <label>Password Saat Ini</label>
                      <div className="password-input">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Password Baru</label>
                      <div className="password-input">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Konfirmasi Password Baru</label>
                      <div className="password-input">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary" onClick={handlePasswordChange}>
                      Ubah Password
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Pengaturan Notifikasi</h2>
                </div>
                
                <div className="notifications-form">
                  <div className="notification-group">
                    <h3>Notifikasi Pesanan</h3>
                    <label className="notification-item">
                      <input
                        type="checkbox"
                        checked={notifications.orderUpdates}
                        onChange={(e) => setNotifications({...notifications, orderUpdates: e.target.checked})}
                      />
                      <div className="notification-info">
                        <strong>Update Pesanan</strong>
                        <p>Terima notifikasi tentang status pesanan Anda</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="notification-group">
                    <h3>Promosi & Penawaran</h3>
                    <label className="notification-item">
                      <input
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={(e) => setNotifications({...notifications, promotions: e.target.checked})}
                      />
                      <div className="notification-info">
                        <strong>Promosi Khusus</strong>
                        <p>Dapatkan info tentang diskon dan penawaran menarik</p>
                      </div>
                    </label>
                    
                    <label className="notification-item">
                      <input
                        type="checkbox"
                        checked={notifications.newsletter}
                        onChange={(e) => setNotifications({...notifications, newsletter: e.target.checked})}
                      />
                      <div className="notification-info">
                        <strong>Newsletter</strong>
                        <p>Berlangganan newsletter mingguan kami</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="notification-group">
                    <h3>Metode Notifikasi</h3>
                    <label className="notification-item">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      />
                      <div className="notification-info">
                        <strong>Email</strong>
                        <p>Terima notifikasi melalui email</p>
                      </div>
                    </label>
                    
                    <label className="notification-item">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                      />
                      <div className="notification-info">
                        <strong>SMS</strong>
                        <p>Terima notifikasi melalui SMS</p>
                      </div>
                    </label>
                  </div>
                  
                  <button className="btn btn-primary" onClick={handleNotificationUpdate}>
                    Simpan Pengaturan
                  </button>
                </div>
              </div>
            )}
            
            {/* Other tabs can be implemented similarly */}
            {(activeTab === 'addresses' || activeTab === 'settings') && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>
                    {activeTab === 'addresses' ? 'Alamat Tersimpan' : 'Pengaturan Umum'}
                  </h2>
                </div>
                
                <div className="coming-soon">
                  <Settings size={60} />
                  <h3>Segera Hadir</h3>
                  <p>Fitur ini sedang dalam pengembangan</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;