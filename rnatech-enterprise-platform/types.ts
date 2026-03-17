
export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  DEVELOPER = 'DEVELOPER'
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  specs: Record<string, string>;
  warranty: string;
};

export type ServicePackage = {
  id: string;
  name_en: string;
  name_bn: string;
  description_en: string;
  description_bn: string;
  price: number;
  timeline: string;
  features_en: string[];
  features_bn: string[];
  type: 'website' | 'app' | 'pos';
  category?: string;
  tier?: 'Beginner' | 'Standard' | 'Enterprise' | '2 PC' | '4 PC' | '8 PC' | 'Staff' | 'Pro' | 'Starter';
};

export type Order = {
  id: string;
  user_id: string;
  tracking_number: string;
  items: any[];
  total_amount: number;
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
  payment_status: 'UNPAID' | 'PAID';
  payment_type: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  delivery_district: string;
  created_at: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface AppState {
  cart: CartItem[];
  isDark: boolean;
}
