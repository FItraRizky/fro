import * as Types from '../types/index';

type Product = Types.Product;
type Category = Types.Category;
type Review = Types.Review;
type Testimonial = Types.Testimonial;
type BlogPost = Types.BlogPost;
type ShippingMethod = Types.ShippingMethod;
type PromoCode = Types.PromoCode;

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kemeja Kasual Premium',
    description: 'Kemeja kasual dengan bahan katun premium yang nyaman dipakai sehari-hari. Desain modern dengan detail yang elegan.',
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop&crop=center', // Kemeja kasual pria biru
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop&crop=center', // Kemeja kasual detail
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&crop=center'  // Kemeja kasual putih
    ],
    category: 'fashion',
    subcategory: 'kemeja',
    brand: 'FRO Premium',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 50,
    variants: [
      { id: 'v1', type: 'color', name: 'Warna', value: 'Biru', inStock: true },
      { id: 'v2', type: 'color', name: 'Warna', value: 'Putih', inStock: true },
      { id: 'v3', type: 'size', name: 'Ukuran', value: 'M', inStock: true },
      { id: 'v4', type: 'size', name: 'Ukuran', value: 'L', inStock: true },
      { id: 'v5', type: 'size', name: 'Ukuran', value: 'XL', inStock: true }
    ],
    specifications: {
      'Bahan': 'Katun 100%',
      'Perawatan': 'Cuci dengan air dingin',
      'Asal': 'Indonesia'
    },
    features: ['Bahan premium', 'Nyaman dipakai', 'Tahan lama'],
    tags: ['kemeja', 'kasual', 'premium'],
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Celana Jeans Slim Fit',
    description: 'Celana jeans dengan potongan slim fit yang memberikan tampilan modern dan stylish. Bahan denim berkualitas tinggi.',
    price: 450000,
    originalPrice: 550000,
    discount: 18,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&crop=center', // Celana jeans slim fit
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=500&fit=crop&crop=center'  // Celana jeans detail
    ],
    category: 'fashion',
    subcategory: 'celana',
    brand: 'FRO Denim',
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 30,
    variants: [
      { id: 'v6', type: 'color', name: 'Warna', value: 'Dark Blue', inStock: true },
      { id: 'v7', type: 'color', name: 'Warna', value: 'Light Blue', inStock: true },
      { id: 'v8', type: 'size', name: 'Ukuran', value: '30', inStock: true },
      { id: 'v9', type: 'size', name: 'Ukuran', value: '32', inStock: true },
      { id: 'v10', type: 'size', name: 'Ukuran', value: '34', inStock: true }
    ],
    specifications: {
      'Bahan': 'Denim 98% Cotton, 2% Elastane',
      'Fit': 'Slim Fit',
      'Perawatan': 'Cuci terpisah'
    },
    features: ['Slim fit', 'Stretch denim', 'Tahan lama'],
    tags: ['jeans', 'celana', 'slim fit'],
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: '3',
    name: 'Sepatu Sneakers Casual',
    description: 'Sepatu sneakers dengan desain casual yang cocok untuk berbagai aktivitas. Sol yang empuk memberikan kenyamanan maksimal.',
    price: 650000,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&crop=center', // Sepatu sneakers putih
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop&crop=center'  // Sepatu sneakers hitam
    ],
    category: 'fashion',
    subcategory: 'sepatu',
    brand: 'FRO Footwear',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 25,
    variants: [
      { id: 'v11', type: 'color', name: 'Warna', value: 'Putih', inStock: true },
      { id: 'v12', type: 'color', name: 'Warna', value: 'Hitam', inStock: true },
      { id: 'v13', type: 'size', name: 'Ukuran', value: '40', inStock: true },
      { id: 'v14', type: 'size', name: 'Ukuran', value: '41', inStock: true },
      { id: 'v15', type: 'size', name: 'Ukuran', value: '42', inStock: true }
    ],
    specifications: {
      'Bahan Upper': 'Synthetic Leather',
      'Sol': 'Rubber',
      'Lining': 'Textile'
    },
    features: ['Ringan', 'Tahan air', 'Anti slip'],
    tags: ['sepatu', 'sneakers', 'casual'],
    isFeatured: false,
    isNew: true,
    isBestseller: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '4',
    name: 'Tas Ransel Laptop',
    description: 'Tas ransel dengan kompartemen khusus laptop hingga 15 inci. Desain ergonomis dengan banyak kantong penyimpanan.',
    price: 350000,
    originalPrice: 450000,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&crop=center', // Tas ransel laptop hitam
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop&crop=center'  // Tas ransel laptop abu-abu
    ],
    category: 'accessories',
    subcategory: 'tas',
    brand: 'FRO Bags',
    rating: 4.4,
    reviewCount: 73,
    inStock: true,
    stockQuantity: 40,
    variants: [
      { id: 'v16', type: 'color', name: 'Warna', value: 'Hitam', inStock: true },
      { id: 'v17', type: 'color', name: 'Warna', value: 'Abu-abu', inStock: true }
    ],
    specifications: {
      'Kapasitas': '25 Liter',
      'Bahan': 'Polyester 600D',
      'Dimensi': '45 x 30 x 15 cm'
    },
    features: ['Tahan air', 'Kompartemen laptop', 'Ergonomis'],
    tags: ['tas', 'ransel', 'laptop'],
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '5',
    name: 'Jam Tangan Sport',
    description: 'Jam tangan sport dengan fitur tahan air dan stopwatch. Desain sporty yang cocok untuk aktivitas outdoor.',
    price: 850000,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop&crop=center', // Jam tangan sport hitam
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&h=500&fit=crop&crop=center'  // Jam tangan sport biru
    ],
    category: 'accessories',
    subcategory: 'jam',
    brand: 'FRO Time',
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
    stockQuantity: 15,
    variants: [
      { id: 'v18', type: 'color', name: 'Warna', value: 'Hitam', inStock: true },
      { id: 'v19', type: 'color', name: 'Warna', value: 'Biru', inStock: true }
    ],
    specifications: {
      'Movement': 'Quartz',
      'Water Resistance': '50M',
      'Case Material': 'Stainless Steel'
    },
    features: ['Tahan air 50M', 'Stopwatch', 'Backlight'],
    tags: ['jam', 'sport', 'tahan air'],
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-25')
  },
  {
    id: '6',
    name: 'Hoodie Premium',
    description: 'Hoodie dengan bahan fleece premium yang hangat dan nyaman. Perfect untuk cuaca dingin atau santai di rumah.',
    price: 425000,
    originalPrice: 525000,
    discount: 19,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&crop=center', // Hoodie abu-abu
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center'  // Hoodie hitam
    ],
    category: 'fashion',
    subcategory: 'outerwear',
    brand: 'FRO Comfort',
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    stockQuantity: 35,
    variants: [
      { id: 'v20', type: 'color', name: 'Warna', value: 'Abu-abu', inStock: true },
      { id: 'v21', type: 'color', name: 'Warna', value: 'Hitam', inStock: true },
      { id: 'v22', type: 'color', name: 'Warna', value: 'Navy', inStock: true },
      { id: 'v23', type: 'size', name: 'Ukuran', value: 'M', inStock: true },
      { id: 'v24', type: 'size', name: 'Ukuran', value: 'L', inStock: true },
      { id: 'v25', type: 'size', name: 'Ukuran', value: 'XL', inStock: true }
    ],
    specifications: {
      'Bahan': 'Cotton Fleece 80%, Polyester 20%',
      'Fit': 'Regular Fit',
      'Features': 'Kangaroo Pocket, Drawstring Hood'
    },
    features: ['Bahan hangat', 'Kantong depan', 'Hood adjustable'],
    tags: ['hoodie', 'hangat', 'casual'],
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Koleksi fashion terbaru dan terlengkap',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop&crop=center', // Fashion koleksi pakaian
    productCount: 150,
    isActive: true,
    children: [
      {
        id: '1-1',
        name: 'Kemeja',
        slug: 'kemeja',
        parentId: '1',
        productCount: 25,
        isActive: true
      },
      {
        id: '1-2',
        name: 'Celana',
        slug: 'celana',
        parentId: '1',
        productCount: 30,
        isActive: true
      },
      {
        id: '1-3',
        name: 'Sepatu',
        slug: 'sepatu',
        parentId: '1',
        productCount: 40,
        isActive: true
      },
      {
        id: '1-4',
        name: 'Outerwear',
        slug: 'outerwear',
        parentId: '1',
        productCount: 20,
        isActive: true
      }
    ]
  },
  {
    id: '2',
    name: 'Aksesoris',
    slug: 'accessories',
    description: 'Aksesoris pelengkap gaya Anda',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop&crop=center', // Aksesoris tas dan perhiasan
    productCount: 80,
    isActive: true,
    children: [
      {
        id: '2-1',
        name: 'Tas',
        slug: 'tas',
        parentId: '2',
        productCount: 35,
        isActive: true
      },
      {
        id: '2-2',
        name: 'Jam Tangan',
        slug: 'jam',
        parentId: '2',
        productCount: 25,
        isActive: true
      },
      {
        id: '2-3',
        name: 'Perhiasan',
        slug: 'perhiasan',
        parentId: '2',
        productCount: 20,
        isActive: true
      }
    ]
  },
  {
    id: '3',
    name: 'Elektronik',
    slug: 'electronics',
    description: 'Gadget dan elektronik terbaru',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=300&fit=crop&crop=center', // Elektronik gadget
    productCount: 60,
    isActive: true
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'Ahmad Rizki',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', // Pria dewasa
    rating: 5,
    title: 'Kualitas sangat bagus!',
    comment: 'Kemeja ini sangat nyaman dipakai dan bahannya premium. Sesuai dengan deskripsi dan foto. Pengiriman juga cepat.',
    verified: true,
    helpful: 12,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    userName: 'Sari Dewi',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', // Wanita dewasa
    rating: 4,
    title: 'Bagus tapi agak kekecilan',
    comment: 'Kualitas bagus, tapi ukurannya agak kecil dari biasanya. Mungkin perlu order 1 size lebih besar.',
    verified: true,
    helpful: 8,
    createdAt: new Date('2024-01-28')
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    userName: 'Budi Santoso',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', // Pria muda
    rating: 5,
    title: 'Jeans terbaik yang pernah saya beli',
    comment: 'Potongannya pas, bahan stretch jadi nyaman dipakai. Warna tidak luntur setelah dicuci berkali-kali.',
    verified: true,
    helpful: 15,
    createdAt: new Date('2024-02-05')
  }
];

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maya Sari',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', // Maya Sari - Fashion Blogger
    rating: 5,
    comment: 'Pelayanan FRO sangat memuaskan. Produk berkualitas dengan harga yang reasonable. Pengiriman cepat dan packaging rapi.',
    position: 'Fashion Blogger',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Andi Pratama',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', // Andi Pratama - Entrepreneur
    rating: 5,
    comment: 'Sudah berbelanja di FRO berkali-kali dan selalu puas. Kualitas produk konsisten dan customer service yang responsif.',
    position: 'Entrepreneur',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Lisa Permata',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', // Lisa Permata - Content Creator
    rating: 5,
    comment: 'Website yang user-friendly dan proses checkout yang mudah. Produk sesuai ekspektasi dan pengiriman tepat waktu.',
    position: 'Content Creator',
    createdAt: new Date('2024-02-01')
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tren Fashion 2024: Apa yang Harus Anda Ketahui',
    slug: 'tren-fashion-2024',
    excerpt: 'Simak tren fashion terbaru tahun 2024 yang wajib Anda ikuti untuk tampil stylish dan up-to-date.',
    content: 'Konten lengkap artikel...',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center', // Tren fashion 2024
    author: 'Tim FRO',
    category: 'Fashion',
    tags: ['fashion', 'trend', '2024'],
    publishedAt: new Date('2024-02-01'),
    readTime: 5
  },
  {
    id: '2',
    title: 'Tips Merawat Pakaian Agar Awet dan Tahan Lama',
    slug: 'tips-merawat-pakaian',
    excerpt: 'Pelajari cara merawat pakaian dengan benar agar tetap awet dan terlihat seperti baru dalam jangka waktu lama.',
    content: 'Konten lengkap artikel...',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop&crop=center', // Tips merawat pakaian
    author: 'Sarah Fashion',
    category: 'Tips',
    tags: ['perawatan', 'pakaian', 'tips'],
    publishedAt: new Date('2024-01-25'),
    readTime: 7
  },
  {
    id: '3',
    title: 'Panduan Memilih Sepatu yang Tepat untuk Setiap Aktivitas',
    slug: 'panduan-memilih-sepatu',
    excerpt: 'Temukan sepatu yang tepat untuk berbagai aktivitas Anda, dari casual hingga formal, dari olahraga hingga traveling.',
    content: 'Konten lengkap artikel...',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center', // Panduan memilih sepatu
    author: 'Alex Footwear',
    category: 'Guide',
    tags: ['sepatu', 'guide', 'aktivitas'],
    publishedAt: new Date('2024-01-20'),
    readTime: 6
  }
];

// Mock Shipping Methods
export const mockShippingMethods: ShippingMethod[] = [
  {
    id: '1',
    name: 'Reguler',
    description: 'Pengiriman standar 3-5 hari kerja',
    price: 15000,
    estimatedDays: 4,
    carrier: 'JNE'
  },
  {
    id: '2',
    name: 'Express',
    description: 'Pengiriman cepat 1-2 hari kerja',
    price: 25000,
    estimatedDays: 1,
    carrier: 'JNT'
  },
  {
    id: '3',
    name: 'Same Day',
    description: 'Pengiriman hari yang sama (area tertentu)',
    price: 35000,
    estimatedDays: 0,
    carrier: 'GoSend'
  }
];

// Mock Promo Codes
export const mockPromoCodes: PromoCode[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderAmount: 200000,
    maxDiscount: 50000,
    expiresAt: new Date('2024-12-31'),
    usageLimit: 1000,
    usedCount: 245,
    isActive: true
  },
  {
    id: '2',
    code: 'FREESHIP',
    type: 'fixed',
    value: 15000,
    minOrderAmount: 300000,
    usageLimit: 500,
    usedCount: 123,
    isActive: true
  },
  {
    id: '3',
    code: 'FLASH25',
    type: 'percentage',
    value: 25,
    minOrderAmount: 500000,
    maxDiscount: 100000,
    expiresAt: new Date('2024-03-31'),
    usageLimit: 100,
    usedCount: 67,
    isActive: true
  }
];