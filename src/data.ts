import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Purple Peshwai Nauvari Saree',
    category: 'Nawari',
    price: 4899,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Silk & Zari Weave',
    sizes: ['Free Size (9 Yards)', 'Standard (6 Yards)'],
    description: 'Traditional Maharashtrian Peshwai Nauvari saree featuring intricate gold zari borders and rich deep purple pallu.',
    badge: 'Bestseller'
  },
  {
    id: '2',
    name: 'Maratha Pride Paithani Nauvari',
    category: 'Nawari',
    price: 5499,
    originalPrice: 7499,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Art Silk with Peacock Pallu',
    sizes: ['Free Size (9 Yards)'],
    description: 'Authentic weave with traditional peacock motif pallu, handcrafted by master artisans of Maharashtra.',
    badge: 'Limited Edition'
  },
  {
    id: '3',
    name: 'Gold Zari Peshwai Nauvari',
    category: 'Nawari',
    price: 4299,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Soft Silk Blend',
    sizes: ['Free Size (9 Yards)', 'Standard (6 Yards)'],
    description: 'Drape yourself in heritage with this lightweight yet grand gold-bordered traditional drape.',
  },
  {
    id: '4',
    name: 'Kashibai Royal Festive Nauvari',
    category: 'Nawari',
    price: 5999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Chanderi Silk',
    sizes: ['Free Size (9 Yards)'],
    description: 'Designed for grandeur and festive celebrations, pairing royal purple with lustrous gold motifs.',
    badge: 'Trending'
  },
  {
    id: '5',
    name: 'Summer Breeze Pastel Organza Saree',
    category: 'Summer',
    price: 2899,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Sheer Organza',
    sizes: ['Standard (6.3m with Blouse)'],
    description: 'Lightweight floral organza saree crafted to make you look bold and effortless this summer season.',
    badge: 'Summer 26'
  },
  {
    id: '6',
    name: 'Bold Fuchsia Chiffon Statement Saree',
    category: 'Summer',
    price: 3199,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Georgette Chiffon',
    sizes: ['Standard (6.3m with Blouse)'],
    description: 'Vibrant hues and fluid drape for the modern woman who loves to stand out with bold styling.',
  },
  {
    id: '7',
    name: 'Sunshine Yellow Bold Linen Saree',
    category: 'Summer',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Breathable Summer Linen',
    sizes: ['Standard (6.3m with Blouse)'],
    description: 'Crisp, vibrant and comfortable linen saree tailored for daytime elegance and casual chic events.',
  },
  {
    id: '8',
    name: 'Aquamarine Silk Blend Party Saree',
    category: 'Summer',
    price: 3699,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Lustrous Silk Blend',
    sizes: ['Standard (6.3m with Blouse)'],
    description: 'Cool aquatic tones with delicate silver thread work for evenings that demand graceful elegance.',
  },
  {
    id: '9',
    name: 'Handcrafted Mulmul Cotton Daily Saree',
    category: 'Cotton',
    price: 1899,
    originalPrice: 2599,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '100% Pure Mulmul Cotton',
    sizes: ['Standard (6.3m)'],
    description: 'Ultra-soft breathable cotton saree featuring block prints from Jaipur, perfect for daily wear.',
  },
  {
    id: '10',
    name: 'Glossy Silk Nylon Blend Saree',
    category: 'Nylon',
    price: 2299,
    originalPrice: 3199,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Silk Nylon Shimmer',
    sizes: ['Standard (6.3m)'],
    description: 'Wrinkle-resistant glossy nylon blend with effortless drape and modern metallic sheen.',
  },
  {
    id: '11',
    name: 'Handloom Organic Linen Saree',
    category: 'Linen',
    price: 3499,
    originalPrice: 4899,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Handloom Linen',
    sizes: ['Standard (6.3m)'],
    description: 'Earthy textures and rich border craftsmanship embodying sustainable luxury.',
  },
  {
    id: '12',
    name: 'Royal Zari Embroidered Wedding Lehenga Saree',
    category: 'Wedding Lehnga',
    price: 12999,
    originalPrice: 21999,
    image: 'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Katan Silk & Heavy Zardozi',
    sizes: ['Custom Stitched', 'Semi-Stitched (Free Size)'],
    description: 'Exquisite bridal lehenga saree with heavy resham embroidery and gold zardozi craftsmanship.',
    badge: '40% Off Wedding Splendour'
  },
  {
    id: '13',
    name: 'Banarasi Katan Silk Masterpiece',
    category: 'Banarsi Silk',
    price: 8999,
    originalPrice: 13999,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Katan Silk',
    sizes: ['Standard (6.3m)'],
    description: 'Genuine Banarasi weave hand-crafted in Varanasi with dense gold kadwa bootis.',
    badge: 'Heritage Collection'
  },
  {
    id: '14',
    name: 'Jaipuri Bandhani Bridal Bandhej Saree',
    category: 'Rajasthan',
    price: 6499,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Gaji Silk Bandhani',
    sizes: ['Standard (6.3m)'],
    description: 'Authentic tie-dye bandhani from Rajasthan adorned with Gotta Patti handwork borders.',
    badge: 'Royal Bride'
  }
];

export const CATEGORIES = [
  { name: 'Georgette Sarees', image: 'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Pattu Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Fancy Sarees', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Chinon Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Chiffon Sarees', image: 'https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Matka Crepe Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Digital Sarees', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Tussure Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
  { name: 'Instagram Trending', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80', count: 'Explore' }
];
