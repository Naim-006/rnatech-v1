
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
  userId: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  type: 'hardware' | 'service';
  createdAt: string;
  trackingNumber?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface AppState {
  user: { id: string; email: string; role: UserRole } | null;
  cart: CartItem[];
  isDark: boolean;
}
