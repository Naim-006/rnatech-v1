-- RNAtech Enterprise Authentication & Profiles Schema

-- Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'CUSTOMER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Profiles Table (Exclusively for Customers)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admins Table (NEW: Dedicated for Administrative Clearance)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Helper function for Admin check ( Revamped to check dedicated table )
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE id = auth.uid()
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (is_admin());

-- RLS Policies for Admins table
DROP POLICY IF EXISTS "Admins are viewable by everyone" ON public.admins;
CREATE POLICY "Admins are viewable by everyone" ON public.admins FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only Admins can manage the admin table" ON public.admins;
CREATE POLICY "Only Admins can manage the admin table" ON public.admins FOR ALL USING (is_admin());

-- Admin Access Control (Allowlist)
CREATE TABLE IF NOT EXISTS public.admin_allowlist (
  email TEXT PRIMARY KEY,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for allowlist
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage allowlist" ON public.admin_allowlist;
CREATE POLICY "Admins can manage allowlist" ON public.admin_allowlist FOR ALL USING (is_admin());
DROP POLICY IF EXISTS "Public can check allowlist" ON public.admin_allowlist;
CREATE POLICY "Public can check allowlist" ON public.admin_allowlist FOR SELECT USING (true);

-- Trigger to create profile or admin on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Check if email is in the admin allowlist
  IF EXISTS (SELECT 1 FROM public.admin_allowlist WHERE email = new.email) THEN
    -- Create Admin
    INSERT INTO public.admins (id, email, full_name)
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'full_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
  ELSE
    -- Create Standard Customer Profile
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
      new.id, 
      new.email, 
      COALESCE(new.raw_user_meta_data->>'full_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Saved Addresses Table
CREATE TABLE IF NOT EXISTS public.saved_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT NOT NULL, -- 'Home', 'Office', etc.
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.saved_addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own addresses" ON public.saved_addresses;
CREATE POLICY "Users can manage their own addresses" ON public.saved_addresses 
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all addresses" ON public.saved_addresses;
CREATE POLICY "Admins can view all addresses" ON public.saved_addresses 
  FOR SELECT USING (is_admin());

-- Re-create trigger safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Logistics Logs Table (Moved down)

-- Promo Codes Table
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_value NUMERIC NOT NULL,
  discount_type TEXT DEFAULT 'fixed',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can check promos" ON public.promo_codes;
CREATE POLICY "Public can check promos" ON public.promo_codes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage promos" ON public.promo_codes;
CREATE POLICY "Admins can manage promos" ON public.promo_codes FOR ALL USING (is_admin());

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  original_price DECIMAL(12,2) DEFAULT 0.00,
  is_on_sale BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 0,
  category TEXT,
  image_url TEXT,
  sku TEXT UNIQUE,
  is_featured BOOLEAN DEFAULT false,
  tag TEXT,
  last_restock_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure all columns exist (Migration safety)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS original_price DECIMAL(12,2) DEFAULT 0.00;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_on_sale BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tag TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS last_restock_at TIMESTAMP WITH TIME ZONE;

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  type TEXT,
  tier TEXT,
  timeline TEXT,
  features TEXT[],
  images TEXT[],
  base_price DECIMAL(12,2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tracking_number TEXT UNIQUE,
  status TEXT DEFAULT 'PENDING',
  total_amount DECIMAL(12,2) NOT NULL,
  subtotal DECIMAL(12,2),
  delivery_fee DECIMAL(12,2),
  discount_amount DECIMAL(12,2) DEFAULT 0,
  promo_code_applied TEXT,
  payment_status TEXT DEFAULT 'UNPAID',
  payment_type TEXT,
  shipping_address TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  delivery_district TEXT,
  mobile_payment_provider TEXT,
  mobile_payment_number TEXT,
  mobile_payment_trxid TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL
);

-- Service Requests (Projects)
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id),
  status TEXT DEFAULT 'INQUIRY', -- INQUIRY, PROPOSAL, ACTIVE, COMPLETED
  description TEXT,
  project_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for all new tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- RLS: Products & Services (Viewable by all, managed by Admin)
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Public can view services" ON public.services;
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (is_admin());

-- RLS: Orders (Users see own, Admins see all, Public can create)
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL); -- Logic for guest tracking can be added later
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (is_admin());
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (true); -- Usually linked to order tracking
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage all order items" ON public.order_items;
CREATE POLICY "Admins can manage all order items" ON public.order_items FOR ALL USING (is_admin());

-- RLS: Service Requests
DROP POLICY IF EXISTS "Users can view own requests" ON public.service_requests;
CREATE POLICY "Users can view own requests" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can submit requests" ON public.service_requests;
CREATE POLICY "Users can submit requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Admins can manage all requests" ON public.service_requests;
CREATE POLICY "Admins can manage all requests" ON public.service_requests FOR ALL USING (is_admin());

-- Logistics Logs (Tracking History)
CREATE TABLE IF NOT EXISTS public.logistics_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.logistics_logs ENABLE ROW LEVEL SECURITY;

-- RLS: Logistics Logs
DROP POLICY IF EXISTS "Anyone can view logistics" ON public.logistics_logs;
CREATE POLICY "Anyone can view logistics" ON public.logistics_logs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can insert logistics" ON public.logistics_logs;
CREATE POLICY "Anyone can insert logistics" ON public.logistics_logs FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage all logistics" ON public.logistics_logs;
CREATE POLICY "Admins can manage all logistics" ON public.logistics_logs FOR ALL USING (is_admin());

-- Portfolio Table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  images TEXT[], -- Array of image URLs
  tech_stack TEXT[],
  client_name TEXT,
  project_url TEXT,
  completion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Settings Table (Single row for global config)
CREATE TABLE IF NOT EXISTS public.company_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  company_name TEXT DEFAULT 'RNAtech',
  logo_url TEXT,
  favicon_url TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  operating_hours JSONB DEFAULT '{"mon_fri": "9am-6pm", "sat_sun": "Closed"}'::jsonb,
  social_links JSONB DEFAULT '{"facebook": "", "twitter": "", "instagram": "", "linkedin": ""}'::jsonb,
  map_coordinates JSONB,
  shipping_fee_inside_dhaka DECIMAL(10,2) DEFAULT 60.00,
  shipping_fee_outside_dhaka DECIMAL(10,2) DEFAULT 120.00,
  free_shipping_threshold DECIMAL(10,2) DEFAULT 5000.00,
  currency_symbol TEXT DEFAULT '৳',
  vat_percentage DECIMAL(5,2) DEFAULT 0.00,
  primary_color TEXT DEFAULT '#2563eb',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure global row exists
INSERT INTO public.company_settings (id, company_name)
VALUES ('global', 'RNAtech')
ON CONFLICT (id) DO NOTHING;

-- Product Reviews Table (Social Proof)
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT, -- Fallback for anonymous or named reviews
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'APPROVED', -- 'PENDING', 'APPROVED', 'REJECTED'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Reviews
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view reviews" ON public.product_reviews;
CREATE POLICY "Public can view reviews" ON public.product_reviews FOR SELECT USING (status = 'APPROVED');
DROP POLICY IF EXISTS "Auth users can post reviews" ON public.product_reviews;
CREATE POLICY "Auth users can post reviews" ON public.product_reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.product_reviews;
CREATE POLICY "Admins can manage reviews" ON public.product_reviews FOR ALL USING (is_admin());

-- Audit Logs Table (For tracking Admin Actions)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.admins(id),
  action TEXT NOT NULL, -- e.g., 'CREATE_PRODUCT', 'UPDATE_ORDER'
  entity_type TEXT,    -- e.g., 'products', 'orders'
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Audit Logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (is_admin());

-- Locations Table
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  is_headquarters BOOLEAN DEFAULT false,
  coordinates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Public can view portfolio" ON public.portfolio;
CREATE POLICY "Public can view portfolio" ON public.portfolio FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage portfolio" ON public.portfolio;
CREATE POLICY "Admins can manage portfolio" ON public.portfolio FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Public can view settings" ON public.company_settings;
CREATE POLICY "Public can view settings" ON public.company_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage settings" ON public.company_settings;
CREATE POLICY "Admins can manage settings" ON public.company_settings FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Public can view locations" ON public.locations;
CREATE POLICY "Public can view locations" ON public.locations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage locations" ON public.locations;
CREATE POLICY "Admins can manage locations" ON public.locations FOR ALL USING (is_admin());

-- Inquiries Table (For Contact Form)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
CREATE POLICY "Anyone can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
CREATE POLICY "Admins can view inquiries" ON public.inquiries FOR SELECT USING (is_admin());
-- RPC Function for Daily Revenue (for Admin Analytics)
CREATE OR REPLACE FUNCTION public.get_daily_revenue(days_limit INTEGER DEFAULT 14)
RETURNS TABLE (date DATE, total NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    date_trunc('day', created_at)::DATE as date,
    COALESCE(SUM(total_amount), 0) as total
  FROM public.orders
  WHERE payment_status = 'PAID'
    AND created_at >= NOW() - (days_limit || ' days')::INTERVAL
  GROUP BY 1
  ORDER BY 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Global Announcements for Offers/Promo Banners
CREATE TABLE IF NOT EXISTS public.global_announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_en TEXT NOT NULL,
  content_bn TEXT NOT NULL,
  bg_gradient TEXT DEFAULT 'from-brand-600 to-brand-400',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.global_announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view announcements" ON public.global_announcements;
CREATE POLICY "Public can view announcements" ON public.global_announcements FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage announcements" ON public.global_announcements;
CREATE POLICY "Admins can manage announcements" ON public.global_announcements FOR ALL USING (is_admin());
