
import React from 'react';

export const ICONS = {
  Logo: ({ theme }: { theme: 'dark' | 'light' }) => (
    <img src={theme === 'dark' ? "/logo.png" : "/logo-transparent.png"} alt="RNATECH Logo" className="w-10 h-10 object-contain" />
  ),
  ShoppingCart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  Messenger: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.304 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.293 14.943l-3.064-3.268-5.973 3.268 6.571-6.975 3.129 3.268 5.908-3.268-6.571 6.975z" />
    </svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.257.257-.527.257l.21-3.03 5.51-4.97c.24-.21-.054-.33-.37-.12l-6.81 4.28-2.94-.92c-.64-.2-.65-.64.13-.94l11.5-4.43c.53-.19 1 .13.84.89z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
  ),
  Layout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
};

export const TRANSLATIONS: Record<string, { bn: string; en: string }> = {
  nav_home: { bn: 'হোম', en: 'Home' },
  nav_services: { bn: 'সার্ভিসসমূহ', en: 'Services' },
  nav_shop: { bn: 'হার্ডওয়্যার শপ', en: 'IoT Shop' },
  nav_portfolio: { bn: 'পোর্টফোলিও', en: 'Portfolio' },
  nav_contact: { bn: 'যোগাযোগ', en: 'Contact' },
  nav_about: { bn: 'আমাদের সম্পর্কে', en: 'About Us' },
  hero_badge: { bn: 'ডিজিটাল বাংলাদেশ ভিশন ২০৪১', en: 'Digital Bangladesh Vision 2041' },
  hero_title_1: { bn: 'আপনার ব্যবসাকে করুন', en: 'Make Your Business' },
  hero_title_2: { bn: 'স্মার্ট ও আধুনিক', en: 'Smart & Modern' },
  hero_desc: { bn: 'আমরা দিচ্ছি আপনার ছোট বা বড় ব্যবসার জন্য পূর্ণাঙ্গ আইটি সলিউশন। ওয়েবসাইট, মোবাইল অ্যাপ এবং স্মার্ট আইওটি হার্ডওয়্যার—সবই এক জায়গায়।', en: 'We provide comprehensive IT solutions for small or large businesses. Website, mobile app, and smart IoT hardware—all in one place.' },
  btn_start: { bn: 'সার্ভিস শুরু করুন', en: 'Start Service' },
  btn_shop: { bn: 'হার্ডওয়্যার দেখুন', en: 'Explore Hardware' },
  section_solutions: { bn: 'আমাদের বিশেষ সলিউশনসমূহ', en: 'Our Specialized Solutions' },
  solutions_desc: { bn: 'আপনার ব্যবসার ধরন অনুযায়ী আমরা দিচ্ছি সেরা সার্ভিস', en: 'We provide the best services according to your business type' },
  support_title: { bn: 'দেশি সাপোর্ট, বিশ্বমানের প্রযুক্তি।', en: 'Local Support, Global Technology.' },
  support_desc: { bn: 'আমরা জানি আমাদের দেশের ব্যবসায়ীদের চাহিদা। তাই আমরা দিচ্ছি ২৪/৭ সরাসরি বাংলা সাপোর্ট এবং খুব সহজে ব্যবহারযোগ্য ইন্টারফেস।', en: 'We know the needs of businessmen in our country. So we provide 24/7 direct Bangla support and easy-to-use interfaces.' },
  footer_copy: { bn: '© ২০২৪ নেক্সাসটেক বাংলাদেশ লিমিটেড। সকল অধিকার সংরক্ষিত।', en: '© 2024 NexusTech Bangladesh Ltd. All rights reserved.' }
};

export const MOCK_SERVICES: any[] = [
  {
    id: 'sv-startup',
    name_bn: 'স্টার্টআপ ল্যান্ডিং পেজ',
    name_en: 'Startup Landing Page',
    desc_bn: 'নতুন ব্যবসার জন্য আকর্ষণীয় ও প্রফেশনাল ল্যান্ডিং পেজ।',
    desc_en: 'Attractive and professional landing page for new businesses.',
    extended_desc_en: 'A high-conversion landing page optimized for lead generation. Perfect for new product launches or local business presence.',
    extended_desc_bn: 'লিড জেনারেশনের জন্য অপ্টিমাইজ করা একটি হাই-কনভার্সন ল্যান্ডিং পেজ। নতুন পণ্য লঞ্চ বা স্থানীয় ব্যবসার উপস্থিতির জন্য আদর্শ।',
    price: 12000,
    timeline_bn: '৫-৭ দিন',
    timeline_en: '5-7 Days',
    type: 'website',
    details_en: 'Our Startup Package is designed to give you an instant web presence. We focus on conversion-ready designs that speak to your target audience.',
    details_bn: 'আমাদের স্টার্টআপ প্যাকেজটি আপনার ব্যবসার তাৎক্ষণিক অনলাইন উপস্থিতির জন্য ডিজাইন করা হয়েছে। আমরা কনভার্সন-ফ্রেন্ডলি ডিজাইনের ওপর গুরুত্ব দিই।',
    features_bn: ['.com ডোমেইন (১ বছর ফ্রি)', '৫জিবি সুপার ফাস্ট হোস্টিং', 'ফ্রি এসএসএল (SSL)', 'অন-পেজ এসইও (SEO)', '১টি বিজনেস ইমেল'],
    features_en: ['.com Domain (1yr Free)', '5GB Super Fast Hosting', 'Free SSL Certificate', 'On-Page SEO', '1 Business Email']
  },
  {
    id: 'sv-business',
    name_bn: 'কর্পোরেট বিজনেস প্রো',
    name_en: 'Corporate Business Pro',
    desc_bn: 'প্রতিষ্ঠিত কোম্পানির জন্য পূর্ণাঙ্গ ডায়নামিক ওয়েবসাইট।',
    desc_en: 'Complete dynamic website for established companies.',
    extended_desc_en: 'Multi-page dynamic CMS website with high-end performance, custom graphics, and full management dashboard.',
    extended_desc_bn: 'হাই-এন্ড পারফরম্যান্স, কাস্টম গ্রাফিক্স এবং পূর্ণাঙ্গ ম্যানেজমেন্ট ড্যাশবোর্ড সহ মাল্টি-পেজ ডায়নামিক সিএমএস ওয়েবসাইট।',
    price: 35000,
    timeline_bn: '১৫-২০ দিন',
    timeline_en: '15-20 Days',
    type: 'website',
    details_en: 'The Corporate Pro tier offers a dynamic CMS-based solution. Perfect for companies needing frequent updates and a strong professional image.',
    details_bn: 'কর্পোরেট প্রো টায়ারটি একটি ডায়নামিক সিএমএস-ভিত্তিক সলিউশন প্রদান করে। এটি নিয়মিত আপডেট এবং প্রফেশনাল ইমেজের জন্য আদর্শ।',
    features_bn: ['.com.bd ডোমেইন সাপোর্ট', 'আনলিমিটেড হোস্টিং', 'অ্যাডভান্সড এসইও অপ্টিমাইজেশন', 'গুগল ম্যাপ ইন্টিগ্রেশন', '১০টি প্রফেশনাল ইমেল', 'লাইভ চ্যাট সাপোর্ট'],
    features_en: ['.com.bd Domain Support', 'Unlimited SSD Hosting', 'Advanced SEO Optimization', 'Google Maps Integration', '10 Professional Emails', 'Live Chat Support']
  },
  {
    id: 'sv-ecommerce',
    name_bn: 'ফুল ই-কমার্স সলিউশন',
    name_en: 'Full E-commerce Solution',
    desc_bn: 'বিকাশ, নগদ পেমেন্ট সহ অনলাইনে পণ্য বিক্রির সেরা প্ল্যাটফর্ম।',
    desc_en: 'Best platform for online sales including bKash, Nagad payments.',
    extended_desc_en: 'Complete store management with automated SMS notifications, inventory tracking, and multi-vendor capabilities.',
    extended_desc_bn: 'অটোমেটেড এসএমএস নোটিফিকেশন, ইনভেন্টরি ট্র্যাকিং এবং মাল্টি-ভেন্ডার সুবিধা সহ পূর্ণাঙ্গ স্টোর ম্যানেজমেন্ট।',
    price: 55000,
    timeline_bn: '২৫-৩০ দিন',
    timeline_en: '25-30 Days',
    type: 'website',
    details_en: 'A high-conversion e-commerce engine tailored for the Bangladeshi market. Includes seamless payment gateway integration and inventory tools.',
    details_bn: 'বাংলাদেশি বাজারের জন্য তৈরি একটি হাই-কনভার্সন ই-কমার্স ইঞ্জিন। এতে পেমেন্ট গেটওয়ে এবং ইনভেন্টরি টুলস অন্তর্ভুক্ত রয়েছে।',
    features_bn: ['বিকাশ/নগদ/কার্ড পেমেন্ট', 'ইনভেন্টরি ম্যানেজমেন্ট', 'কাস্টমার ড্যাশবোর্ড', 'অর্ডার ট্র্যাকিং সিস্টেম', 'প্রোডাক্ট এসইও প্রো', '১ বছরের মেইনটেইনেন্স'],
    features_en: ['bKash/Nagad/Card Payment', 'Inventory Management', 'Customer Dashboard', 'Order Tracking System', 'Product SEO Pro', '1 Year Maintenance']
  },
  {
    id: 'sv-app-custom',
    name_bn: 'কাস্টম মোবাইল অ্যাপ (Android/iOS)',
    name_en: 'Custom Mobile App (Hybrid)',
    desc_bn: 'আধুনিক ইউজার ইন্টারফেস সহ হাই-পারফরম্যান্স মোবাইল অ্যাপ্লিকেশন।',
    desc_en: 'High-performance mobile application with modern user interface.',
    extended_desc_en: 'Cross-platform mobile experience with real-time updates, secure authentication, and cloud infrastructure.',
    extended_desc_bn: 'রিয়েল-টাইম আপডেট, সুরক্ষিত প্রমাণীকরণ এবং ক্লাউড ইনফ্রাস্ট্রাকচার সহ ক্রস-প্ল্যাটফর্ম মোবাইল অভিজ্ঞতা।',
    price: 95000,
    timeline_bn: '২-৩ মাস',
    timeline_en: '2-3 Months',
    type: 'app',
    details_en: 'Next-gen mobile applications built with React Native or Flutter. We ensure 60fps performance and native-like experiences on both platforms.',
    details_bn: 'নেক্সট-জেন মোবাইল অ্যাপ যা রিঅ্যাক্ট নেটিভ বা ফ্লাটার দিয়ে তৈরি। আমরা উভয় প্ল্যাটফর্মে সর্বোচ্চ পারফরম্যান্স নিশ্চিত করি।',
    features_bn: ['প্লে-স্টোর পাবলিশিং', 'পুশ নোটিফিকেশন', 'অফলাইন ডেটা সাপোর্ট', 'অ্যাডমিন প্যানেল', 'রিয়েল-টাইম ডেটাবেস', '৬ মাসের ফ্রি সাপোর্ট'],
    features_en: ['Play Store Publishing', 'Push Notifications', 'Offline Data Support', 'Admin Control Panel', 'Real-time Database', '6 Months Free Support']
  },
  {
    id: 'sv-erp-factory',
    name_bn: 'ফ্যাক্টরি ও ইআরপি (ERP) সলিউশন',
    name_en: 'Factory & ERP Solution',
    desc_bn: 'বড় ফ্যাক্টরি বা গার্মেন্টস এর জন্য পূর্ণাঙ্গ অটোমেশন সফটওয়্যার।',
    desc_en: 'Full automation software for large factories or garments.',
    extended_desc_en: 'Comprehensive enterprise-grade system integrating supply chain, factory operations, and centralized accounting.',
    extended_desc_bn: 'সাপ্লাই চেইন, ফ্যাক্টরি অপারেশন এবং সেন্ট্রালাইজড অ্যাকাউন্টিং সংহত করে পূর্ণাঙ্গ এন্টারপ্রাইজ-গ্রেড সিস্টেম।',
    price: 250000,
    timeline_bn: '৪-৬ মাস',
    timeline_en: '4-6 Months',
    type: 'enterprise',
    details_en: 'A comprehensive enterprise resource planning system. Integrates IoT monitoring for real-time factory floor data and automated HR/Payroll.',
    details_bn: 'একটি পূর্ণাঙ্গ এন্টারপ্রাইজ রিসোর্স প্ল্যানিং সিস্টেম। এটি ফ্যাক্টরির রিয়েল-টাইম ডেটা এবং অটোমেটেড এইচআর/পেরোল পরিচালনা করে।',
    features_bn: ['প্রোডাকশন ট্র্যাকিং', 'এইচআর ও পেরোল', 'অ্যাকাউন্টস ও লেজার', 'আইওটি (IoT) সেন্সর সাপোর্ট', 'ক্লাউড ব্যাকআপ সিস্টেম', 'ডেডিকেটেড সাপোর্ট টিম'],
    features_en: ['Production Tracking', 'HR & Payroll', 'Accounts & Ledger', 'IoT Sensor Support', 'Cloud Backup System', 'Dedicated Support Team']
  }
];

export const MOCK_HARDWARE: any[] = [
  {
    id: 'hw-bd-1',
    name_bn: 'নেক্সাস স্মার্ট পজ হাব',
    name_en: 'Nexus Smart POS Hub',
    desc_bn: 'ঢাকার ছোট এবং বড় দোকানের জন্য বিশেষ ইনভেন্টরি ও সেলস ম্যানেজমেন্ট সিস্টেম।',
    desc_en: 'Specialized inventory and sales management system for small and large shops in Dhaka.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
    category: 'Retail Systems',
    stock: 50,
    specs: { language: 'Proper Bangla Support', storage: '128GB SSD', connectivity: 'Local Network + Cloud' },
    warranty: '১ বছরের সার্ভিস ওয়ারেন্টি',
    tag: 'Bestseller'
  },
  {
    id: 'hw-bd-2',
    name_bn: 'নেক্সাস আইওটি গেটওয়ে',
    name_en: 'Nexus IoT Gateway',
    desc_bn: 'গার্মেন্টস এবং ফ্যাক্টরির জন্য রিয়েল-টাইম মেশিন মনিটরিং সেন্সর।',
    desc_en: 'Real-time machine monitoring sensor for garments and factories.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    category: 'Industrial',
    stock: 12,
    specs: { endurance: '24/7 Runtime', protection: 'IP65 Rated', cloud: 'Azure/Nexus Managed' },
    warranty: '২ বছরের রিপ্লেমেন্ট গ্যারান্টি',
    tag: 'Enterprise'
  },
  {
    id: 'hw-bd-3',
    name_bn: 'রিয়েল-টাইম টেম্প সেন্সর',
    name_en: 'Real-time Temp Sensor',
    desc_bn: 'ফ্রিজ বা সার্ভার রুমের জন্য আধুনিক ওয়্যারলেস টেম্পারেচার মনিটরিং।',
    desc_en: 'Modern wireless temperature monitoring for fridges or server rooms.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
    category: 'Sensors',
    stock: 150,
    specs: { accuracy: '+/- 0.1C', range: '100m wireless', battery: '2 Years' },
    warranty: '৬ মাসের রিপ্লেমেন্ট',
    tag: 'New'
  }
];
