export interface Product {
  id: string;
  name: string;
  category: 'Cotton' | 'Nylon' | 'Linen' | 'Wedding Lehnga' | 'Nawari' | 'Summer' | 'Banarsi Silk' | 'Rajasthan';
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  fabric: string;
  sizes: string[];
  description: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}
