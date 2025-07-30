import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Checkout.css';

interface CheckoutData {
  cartItems: any[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  appliedPromo?: string;
  shippingMethod: string;
  estimatedLocation: string;
}

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  
  // Payment
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  
  // Additional
  notes: string;
  saveInfo: boolean;
  newsletter: boolean;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch, showToast } = useApp();
  
  const checkoutData = location.state as CheckoutData;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Indonesia',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    notes: '',
    saveInfo: false,
    newsletter: false
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  useEffect(() => {
    if (!checkoutData) {
      navigate('/keranjang');
    }
  }, [checkoutData, navigate]);
  
  if (!checkoutData) {
    return null;
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'Nama depan wajib diisi';
      if (!formData.lastName) newErrors.lastName = 'Nama belakang wajib diisi';
      if (!formData.email) newErrors.email = 'Email wajib diisi';
      if (!formData.phone) newErrors.phone = 'Nomor telepon wajib diisi';
      if (!formData.address) newErrors.address = 'Alamat wajib diisi';
      if (!formData.city) newErrors.city = 'Kota wajib diisi';
      if (!formData.province) newErrors.province = 'Provinsi wajib diisi';
      if (!formData.postalCode) newErrors.postalCode = 'Kode pos wajib diisi';
    }
    
    if (step === 2) {
      if (formData.paymentMethod === 'credit-card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Nomor kartu wajib diisi';
        if (!formData.expiryDate) newErrors.expiryDate = 'Tanggal kedaluwarsa wajib diisi';
        if (!formData.cvv) newErrors.cvv = 'CVV wajib diisi';
        if (!formData.cardName) newErrors.cardName = 'Nama di kartu wajib diisi';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setIsProcessing(true);
    
    try {
      // Simulasi proses pembayaran
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Show success message
      showToast('Pesanan berhasil dibuat! Terima kasih atas pembelian Anda.', 'success');
      
      // Redirect to success page
      navigate('/pesanan-berhasil', {
        state: {
          orderData: {
            ...formData,
            ...checkoutData,
            orderId: 'FRO-' + Date.now(),
            orderDate: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      showToast('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const steps = [
    { number: 1, title: 'Informasi Pengiriman', icon: Truck },
    { number: 2, title: 'Pembayaran', icon: CreditCard },
    { number: 3, title: 'Konfirmasi', icon: CheckCircle }
  ];
  
  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <button 
            className="back-btn"
            onClick={() => navigate('/keranjang')}
          >
            <ArrowLeft size={20} />
            Kembali ke Keranjang
          </button>
          <h1>Checkout</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="checkout-steps">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
              >
                <div className="step-icon">
                  <Icon size={20} />
                </div>
                <div className="step-info">
                  <div className="step-number">Langkah {step.number}</div>
                  <div className="step-title">{step.title}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="checkout-content">
          {/* Main Form */}
          <div className="checkout-form">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="form-step">
                <h2>
                  <User size={24} />
                  Informasi Pengiriman
                </h2>
                
                <div className="form-section">
                  <h3>Informasi Pribadi</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nama Depan *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Nama Belakang *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Nomor Telepon *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3>
                    <MapPin size={20} />
                    Alamat Pengiriman
                  </h3>
                  <div className="form-group">
                    <label>Alamat Lengkap *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={errors.address ? 'error' : ''}
                      rows={3}
                      placeholder="Jalan, nomor rumah, RT/RW, kelurahan"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Kota *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Provinsi *</label>
                      <select
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className={errors.province ? 'error' : ''}
                      >
                        <option value="">Pilih Provinsi</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="Jawa Tengah">Jawa Tengah</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                        <option value="Banten">Banten</option>
                        <option value="Yogyakarta">Yogyakarta</option>
                      </select>
                      {errors.province && <span className="error-message">{errors.province}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Kode Pos *</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className={errors.postalCode ? 'error' : ''}
                      />
                      {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Negara</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <div className="form-group">
                    <label>Catatan Pengiriman (Opsional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      placeholder="Instruksi khusus untuk kurir atau catatan tambahan"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="form-step">
                <h2>
                  <CreditCard size={24} />
                  Metode Pembayaran
                </h2>
                
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <div className="method-info">
                      <CreditCard size={20} />
                      <span>Kartu Kredit/Debit</span>
                    </div>
                  </label>
                  
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <div className="method-info">
                      <div className="bank-icon">🏦</div>
                      <span>Transfer Bank</span>
                    </div>
                  </label>
                  
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="e-wallet"
                      checked={formData.paymentMethod === 'e-wallet'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <div className="method-info">
                      <div className="wallet-icon">💳</div>
                      <span>E-Wallet (OVO, GoPay, DANA)</span>
                    </div>
                  </label>
                </div>
                
                {formData.paymentMethod === 'credit-card' && (
                  <div className="form-section">
                    <h3>Informasi Kartu</h3>
                    <div className="form-group">
                      <label>Nomor Kartu *</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={errors.cardNumber ? 'error' : ''}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Tanggal Kedaluwarsa *</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className={errors.expiryDate ? 'error' : ''}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className={errors.cvv ? 'error' : ''}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Nama di Kartu *</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className={errors.cardName ? 'error' : ''}
                        placeholder="Nama sesuai kartu"
                      />
                      {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'bank-transfer' && (
                  <div className="bank-info">
                    <h3>Informasi Transfer Bank</h3>
                    <div className="bank-accounts">
                      <div className="bank-account">
                        <strong>Bank BCA</strong><br />
                        No. Rekening: 1234567890<br />
                        Atas Nama: PT FRO Indonesia
                      </div>
                      <div className="bank-account">
                        <strong>Bank Mandiri</strong><br />
                        No. Rekening: 0987654321<br />
                        Atas Nama: PT FRO Indonesia
                      </div>
                    </div>
                    <div className="transfer-note">
                      <AlertCircle size={16} />
                      <span>Silakan transfer sesuai total pembayaran dan kirim bukti transfer ke WhatsApp kami</span>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'e-wallet' && (
                  <div className="ewallet-info">
                    <h3>Pembayaran E-Wallet</h3>
                    <p>Anda akan diarahkan ke aplikasi e-wallet pilihan Anda untuk menyelesaikan pembayaran.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="form-step">
                <h2>
                  <CheckCircle size={24} />
                  Konfirmasi Pesanan
                </h2>
                
                <div className="confirmation-sections">
                  <div className="confirmation-section">
                    <h3>Informasi Pengiriman</h3>
                    <div className="info-grid">
                      <div><strong>Nama:</strong> {formData.firstName} {formData.lastName}</div>
                      <div><strong>Email:</strong> {formData.email}</div>
                      <div><strong>Telepon:</strong> {formData.phone}</div>
                      <div><strong>Alamat:</strong> {formData.address}, {formData.city}, {formData.province} {formData.postalCode}</div>
                    </div>
                  </div>
                  
                  <div className="confirmation-section">
                    <h3>Metode Pembayaran</h3>
                    <div className="payment-summary">
                      {formData.paymentMethod === 'credit-card' && (
                        <div>Kartu Kredit/Debit (**** **** **** {formData.cardNumber.slice(-4)})</div>
                      )}
                      {formData.paymentMethod === 'bank-transfer' && (
                        <div>Transfer Bank</div>
                      )}
                      {formData.paymentMethod === 'e-wallet' && (
                        <div>E-Wallet</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.saveInfo}
                        onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                      />
                      <span>Simpan informasi untuk pembelian selanjutnya</span>
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                      />
                      <span>Berlangganan newsletter untuk penawaran eksklusif</span>
                    </label>
                  </div>
                </div>
                
                <div className="security-notice">
                  <Shield size={20} />
                  <div>
                    <strong>Pembayaran Aman</strong>
                    <p>Informasi pembayaran Anda dienkripsi dan aman. Kami tidak menyimpan detail kartu kredit Anda.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button 
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                  disabled={isProcessing}
                >
                  <ArrowLeft size={16} />
                  Sebelumnya
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  Selanjutnya
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Bayar Sekarang
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Ringkasan Pesanan</h3>
              
              <div className="order-items">
                {checkoutData.cartItems.map((item) => (
                  <div key={item.productId} className="order-item">
                    <img src={item.product.images[0]} alt={item.product.name} />
                    <div className="item-info">
                      <div className="item-name">{item.product.name}</div>
                      <div className="item-quantity">Qty: {item.quantity}</div>
                    </div>
                    <div className="item-price">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(checkoutData.subtotal)}</span>
                </div>
                
                {checkoutData.discount > 0 && (
                  <div className="price-row discount">
                    <span>Diskon</span>
                    <span>-{formatPrice(checkoutData.discount)}</span>
                  </div>
                )}
                
                <div className="price-row">
                  <span>Ongkos Kirim</span>
                  <span>{formatPrice(checkoutData.shippingCost)}</span>
                </div>
                
                <div className="price-row total">
                  <span>Total</span>
                  <span>{formatPrice(checkoutData.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;