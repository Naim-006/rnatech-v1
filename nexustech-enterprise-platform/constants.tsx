
import React from 'react';

export const ICONS = {
  Logo: ({ theme }: { theme: 'dark' | 'light' }) => (
    <img src={theme === 'dark' ? "/logo-dark.png" : "/logo-transparent.png"} alt="RNATECH Logo" className="w-10 h-10 object-contain" />
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
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 4s-1 2.17-2.67 3a4.42 4.42 0 0 1 .17 1c0 2.83-2 5-5 5-2.67 0-4-1.33-4-1.33s.67 1 2 2.67-1 2-3 2c-2.33 0-3-1.67-3-1.67S4.67 18.67 6 20c-1.33 0-2.67-.67-3.33-1.33.67 0 1.33-.33 1.67-1-.67-.67-1.33-1.67-1-2.67.67.33 1.33.33 2 .33a1.69 1.69 0 0 1-1-1.33 1.58 1.58 0 0 1 0-.67c.67.33 1.33.33 2 .33.33 0 .67-.17.67-.5s-.33-1.33-1.33-1.67c-1-.33-1.67-1.67-1.33-3.33A5.92 5.92 0 0 1 12 11a4.42 4.42 0 0 1-1-2c0-1 .67-2.33 1.67-3a4.42 4.42 0 0 1 2-.33c1 0 2 .67 2.67 1.33-.33 0-.67.17-.67.33 0 0 1.33-.33 2.33.33" />
    </svg>
  ),
  TwitterX: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
  footer_copy: { bn: '© ২০২৪ আরএনএটেক বাংলাদেশ লিমিটেড। সকল অধিকার সংরক্ষিত।', en: '© 2024 RNATech Bangladesh Ltd. All rights reserved.' },
  btn_dashboard: { bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  btn_login: { bn: 'লগইন', en: 'Login' },
  explore_packages: { bn: 'বিস্তারিত', en: 'Explore Packages' },
  switch_language: { bn: 'ভাষা পরিবর্তন করুন', en: 'Switch Language' },
  connect_with_us: { bn: 'আমাদের সাথে যোগাযোগ করুন', en: 'Connect with us' },
  reliable_digitization: { bn: 'নির্ভরযোগ্য ডিজিটাল সেবা', en: 'Reliable Digitization' },
  nav_navigation: { bn: 'নেভিগেশন', en: 'Navigation' },
  nav_solutions: { bn: 'সলিউশন', en: 'Solutions' },
  nav_inquiry: { bn: 'অনুসন্ধান', en: 'Inquiry' },
  stat_projects: { bn: 'সফল প্রজেক্ট', en: 'Projects Done' },
  stat_clients: { bn: 'হ্যাপি ক্লায়েন্ট', en: 'Happy Clients' },
  stat_team: { bn: 'এক্সপার্ট টিম', en: 'Expert Team' },
  stat_districts: { bn: 'সার্ভিস এরিয়া', en: 'Service Areas' },
  service_web_title: { bn: 'ওয়েবসাইট সলিউশন', en: 'Web Engineering' },
  service_web_desc: { bn: 'ই-কমার্স থেকে শুরু করে কাস্টম পোর্টফোলিও - আপনার ব্যবসার জন্য সেরা ওয়েবসাইট।', en: 'From high-conversion e-commerce engines to luxury digital portfolios.' },
  service_pos_title: { bn: 'স্মার্ট পজ সিস্টেম', en: 'Smart POS Hub' },
  service_pos_desc: { bn: 'রিটেল বা রেস্টুরেন্টের জন্য ক্লাউড-ভিত্তিক পজ সফটওয়্যার এবং হার্ডওয়্যার সেটআপ।', en: 'Cloud-based POS software and full hardware setups for retail & restaurants.' },
  service_app_title: { bn: 'মোবাইল অ্যাপ্লিকেশন', en: 'Mobile Ecosystems' },
  service_app_desc: { bn: 'আইওএস (iOS) এবং অ্যান্ড্রয়েড (Android) এর জন্য নেক্সট-জেন এবং হাই-পারফরম্যান্স অ্যাপ।', en: 'Next-gen, high-performance applications for iOS and Android platforms.' },
  tag_support: { bn: '২৪/৭ সরাসরি কল', en: '24/7 Enterprise Support' },
  tag_data_center: { bn: 'লোকাল ডাটা সেন্টার', en: 'On-Shore Data Centers' },
  tag_custom_design: { bn: 'কাস্টম ডিজাইন', en: 'Bespoke Engineering' },
  btn_partnership: { bn: 'আজই শুরু করুন', en: 'Start Partnership' },
  about_title_1: { bn: 'প্রযুক্তির মাধ্যমে', en: 'Transforming Bangladesh' },
  about_title_2: { bn: 'বাংলাদেশকে বদলে দিচ্ছি', en: 'With Technology' },
  about_desc: { bn: 'আরএনএটেক একটি নেতৃস্থানীয় প্রযুক্তি প্রতিষ্ঠান যা বাংলাদেশের ব্যবসায়ী এবং শিল্প খাতের ডিজিটালাইজেশনে কাজ করছে।', en: 'RNATECH is a leading technology company working on the digitalization of business and industrial sectors in Bangladesh.' },
  about_mission_title: { bn: 'আমাদের লক্ষ্য', en: 'Our Mission' },
  about_mission_desc: { bn: 'প্রতিটি ছোট এবং মাঝারি ব্যবসাকে স্মার্ট প্রযুক্তির আওতায় নিয়ে আসা যাতে তারা আরও দক্ষ এবং লাভজনক হতে পারে।', en: 'To bring every small and medium business under smart technology so they can become more efficient and profitable.' },
  about_why_title: { bn: 'কেন আমাদের বেছে নেবেন?', en: 'Why Choose Us?' },
  about_stat_focus: { bn: 'লোকাল ফোকাস', en: 'Local Focus' },
  about_stat_quality: { bn: 'কোয়ালিটি টেক', en: 'Quality Tech' },
  services_title_1: { bn: 'আমাদের সলিউশন', en: 'What We Offer' },
  services_title_2: { bn: 'ব্যবসার জন্য স্মার্ট আইডিয়া', en: 'Smart Solutions for Growth' },
  services_desc: { bn: 'আমাদের বিশেষায়িত ক্যাটাগরি থেকে আপনার ব্যবসার জন্য সেরাটি বেছে নিন।', en: 'Choose from our specialized categories building digital excellence for the Bangladeshi market.' },
  services_custom_title: { bn: 'কাস্টম প্ল্যান প্রয়োজন?', en: 'Need a custom plan?' },
  services_custom_desc: { bn: 'আপনার প্রজেক্ট যদি এই প্যাকেজগুলোর সাথে না মিলে, তবে আমাদের টিম আপনার জন্য কাস্টম রোডম্যাপ তৈরি করবে।', en: "If your project doesn't fit into these tiers, our engineering team can build a custom roadmap just for you." },
  services_btn_specialist: { bn: 'স্পেশালিস্টের সাথে কথা বলুন', en: 'Talk to Specialist' },
  services_btn_order: { bn: 'অর্ডার করুন', en: 'Order Now' },
  shop_hero_badge: { bn: 'ইন্ডাস্ট্রিয়াল গ্রেড হার্ডওয়্যার', en: 'Industrial Grade Hardware' },
  shop_title_1: { bn: 'আরএনএটেক', en: 'RNATECH' },
  shop_title_2: { bn: 'হার্ডওয়্যার শপ', en: 'IoT Shop' },
  shop_desc: { bn: 'সবচেয়ে উন্নত আইওটি হার্ডওয়্যার এবং অটোমেশন ইকুইপমেন্ট দিয়ে আপনার ব্যবসাকে সাজান।', en: 'Equip your business with the latest in automation, sensing, and retail technology. Global quality, local support.' },
  shop_stat_items: { bn: 'মোট আইটেম', en: 'Total Items' },
  shop_stat_standard: { bn: 'গ্লোবাল কিউসি', en: 'Global QC' },
  shop_add_to_cart: { bn: 'কার্টে যোগ করুন', en: 'Add to Cart' },
  contact_title: { bn: 'যোগাযোগ করুন', en: 'Contact Us' },
  contact_desc: { bn: 'আপনার যে কোনো প্রজেক্ট বা জিজ্ঞাসা থাকলে আমাদের মেসেজ দিন। আমাদের টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।', en: 'Drop us a message for any project or inquiry. Our team will get back to you within 24 hours.' },
  contact_address_title: { bn: 'সরাসরি অফিস', en: 'Our Office' },
  contact_address_val: { bn: 'গুলশান-১, ঢাকা-১২১২, বাংলাদেশ', en: 'Gulshan-1, Dhaka-1212, Bangladesh' },
  contact_whatsapp_title: { bn: 'হোয়াটসঅ্যাপ সাপোর্ট', en: 'WhatsApp Support' },
  contact_form_name: { bn: 'আপনার নাম', en: 'Your Name' },
  contact_form_name_placeholder: { bn: 'যেমন: রহিম আহমেদ', en: 'Ex: John Doe' },
  contact_form_mobile: { bn: 'মোবাইল নম্বর', en: 'Mobile Number' },
  contact_form_mobile_placeholder: { bn: '০১৭XXXXXXXX', en: '017XXXXXXXX' },
  contact_form_service: { bn: 'আপনার সার্ভিস প্রয়োজন', en: 'Required Service' },
  contact_form_service_option1: { bn: 'ওয়েবসাইট ডেভেলপমেন্ট', en: 'Web Development' },
  contact_form_service_option2: { bn: 'পজ (POS) সিস্টেম', en: 'POS System' },
  contact_form_service_option3: { bn: 'মোবাইল অ্যাপ', en: 'Mobile App' },
  contact_form_service_option4: { bn: 'ইন্ডাস্ট্রিয়াল আইওটি', en: 'Industrial IoT' },
  contact_form_message: { bn: 'বিস্তারিত মেসেজ', en: 'Message Details' },
  contact_form_message_placeholder: { bn: 'আপনার প্রয়োজনীয় তথ্য লিখুন...', en: 'Write your requirements details...' },
  contact_form_btn: { bn: 'মেসেজ পাঠান', en: 'Send Message' },
  // About Page Redesign
  about_hero_badge: { bn: 'ভবিষ্যতের প্রযুক্তি আজই', en: 'Future Technology Today' },
  about_vision_title: { bn: 'আমাদের ভিশন', en: 'Our Vision' },
  about_vision_desc: { bn: 'বাংলাদেশের প্রতিটি শিল্পখাতকে গ্লোবাল স্ট্যান্ডার্ডে নিয়ে যাওয়া।', en: 'Leading every industrial sector of Bangladesh to global standards.' },
  about_value_integrity: { bn: 'সততা', en: 'Integrity' },
  about_value_innovation: { bn: 'উদ্ভাবন', en: 'Innovation' },
  about_value_quality: { bn: 'গুণমান', en: 'Quality' },
  about_value_global: { bn: 'বৈশ্বিক মান', en: 'Global Standard' },
  about_timeline_title: { bn: 'আমাদের যাত্রা', en: 'Our Journey' },
  about_timeline_2020: { bn: 'শুরুয়াত ও গবেষণা', en: 'Foundation & Research' },
  about_timeline_2022: { bn: 'প্রথম আইওটি সলিউশন', en: 'First IoT Solution' },
  about_timeline_2024: { bn: 'আরএনএটেক হিসেবে রি-ব্র্যান্ডিং', en: 'Rebranding as RNATech' },
  about_stack_title: { bn: 'আমাদের টেক স্ট্যাক', en: 'Our Tech Stack' },
  // Contact Page Redesign
  contact_map_title: { bn: 'আমাদের অবস্থান', en: 'Find Us on Map' },
  contact_social_title: { bn: 'সোশ্যাল মিডিয়া', en: 'Social Ecosystem' },
  contact_email_sales: { bn: 'সেলস কোয়েরি', en: 'Sales Inquiries' },
  contact_email_support: { bn: 'কাস্টমার সাপোর্ট', en: 'Customer Support' },
  contact_hours_title: { bn: 'অফিস সময়', en: 'Business Hours' },
  contact_hours_val: { bn: 'শনিবার - বৃহস্পতিবার: সকাল ৯টা - সন্ধ্যা ৬টা', en: 'Sat - Thu: 9:00 AM - 6:00 PM' },
  contact_hours_off: { bn: 'শুক্রবার: বন্ধ', en: 'Friday: Closed' },
  // Auth Pages
  auth_login_title: { bn: 'লগইন করুন', en: 'Welcome Back' },
  auth_login_subtitle: { bn: 'আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন', en: 'Enter your credentials to access your account' },
  auth_signup_title: { bn: 'অ্যাকাউন্ট তৈরি করুন', en: 'Create Account' },
  auth_signup_subtitle: { bn: 'নতুন ফিচারের জন্য আমাদের সাথে যুক্ত হোন', en: 'Join us to explore premium features' },
  auth_email: { bn: 'ইমেইল অ্যাড্রেস', en: 'Email Address' },
  auth_password: { bn: 'পাসওয়ার্ড', en: 'Password' },
  auth_name: { bn: 'পুরো নাম', en: 'Full Name' },
  auth_phone: { bn: 'ফোন নম্বর', en: 'Phone Number' },
  auth_remember: { bn: 'আমাকে মনে রাখুন', en: 'Remember Me' },
  auth_forgot: { bn: 'পাসওয়ার্ড ভুলে গেছেন?', en: 'Forgot Password?' },
  auth_no_account: { bn: 'অ্যাকাউন্ট নেই?', en: "Don't have an account?" },
  auth_have_account: { bn: 'আগেই অ্যাকাউন্ট আছে?', en: 'Already have an account?' },
  auth_btn_login: { bn: 'লগইন', en: 'Login Now' },
  auth_btn_signup: { bn: 'নিবন্ধন করুন', en: 'Register Now' },
  auth_role_customer: { bn: 'কাস্টমার', en: 'Customer' },
  auth_role_admin: { bn: 'সিস্টেম অ্যাডমিন', en: 'System Admin' },
  // Checkout Page
  checkout_title: { bn: 'চেকআউট', en: 'Checkout' },
  checkout_subtitle: { bn: 'আপনার অর্ডার সম্পন্ন করুন', en: 'Complete your order' },
  checkout_cart_empty: { bn: 'আপনার কার্ট খালি', en: 'Your cart is empty' },
  checkout_cart_items: { bn: 'কার্টের আইটেম', en: 'Cart Items' },
  checkout_customer_details: { bn: 'অর্ডার ডিটেইলস', en: 'Customer Details' },
  checkout_payment_method: { bn: 'পেমেন্ট মেথড', en: 'Payment Method' },
  checkout_summary: { bn: 'অর্ডার সামারি', en: 'Order Summary' },
  checkout_subtotal: { bn: 'সাবটোটাল', en: 'Subtotal' },
  checkout_delivery: { bn: 'ডেলিভারি চার্জ', en: 'Delivery Fee' },
  checkout_total: { bn: 'সর্বমোট', en: 'Total' },
  checkout_place_order: { bn: 'অর্ডার নিশ্চিত করুন', en: 'Place Order' },
  checkout_address: { bn: 'ঠিকানা', en: 'Address' },
  checkout_cod: { bn: 'ক্যাশ অন ডেলিভারি', en: 'Cash on Delivery' },
  checkout_digital: { bn: 'ডিজিটাল পেমেন্ট', en: 'Digital Payment' },
  checkout_success_title: { bn: 'ধন্যবাদ!', en: 'Thank You!' },
  checkout_success_desc: { bn: 'আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।', en: 'Your order has been placed successfully. Our representative will contact you soon.' },
  checkout_order_id: { bn: 'অর্ডার আইডি', en: 'Order ID' },
  checkout_continue_shopping: { bn: 'আরো কিনুন', en: 'Continue Shopping' }
};

export const MOCK_SERVICES: any[] = [
  // --- WEBSITES ---
  {
    id: 'web-ecom-beg',
    name_en: 'E-commerce Beginner',
    name_bn: 'ই-কমার্স বিগিনার',
    desc_en: 'Perfect for small shops starting online sales.',
    desc_bn: 'অনলাইনে পণ্য বিক্রির জন্য ছোট দোকানের জন্য আদর্শ।',
    price: 15000,
    timeline: '7-10 Days',
    features_en: ['Single Vendor', 'bKash Integration', 'Order Management', 'Basic SEO'],
    features_bn: ['সিঙ্গেল ভেন্ডর', 'বিকাশ পেমেন্ট', 'অর্ডার ম্যানেজমেন্ট', 'বেসিক এসইও'],
    type: 'website',
    category: 'E-commerce',
    tier: 'Beginner'
  },
  {
    id: 'web-ecom-std',
    name_en: 'E-commerce Standard',
    name_bn: 'ই-কমার্স স্ট্যান্ডার্ড',
    desc_en: 'Professional store with inventory and SMS.',
    desc_bn: 'ইনভেন্টরি এবং এসএমএস সহ প্রফেশনাল অনলাইন স্টোর।',
    price: 35000,
    timeline: '15-20 Days',
    features_en: ['Inventory System', 'SMS Notifications', 'Advanced Analytics', 'Premium Hosting'],
    features_bn: ['ইনভেন্টরি সিস্টেম', 'এসএমএস নোটিফিকেশন', 'অ্যাডভান্সড অ্যানালিটিক্স', 'প্রিমিয়াম হোস্টিং'],
    type: 'website',
    category: 'E-commerce',
    tier: 'Standard'
  },
  {
    id: 'web-ecom-ent',
    name_en: 'E-commerce Enterprise',
    name_bn: 'ই-কমার্স এন্টারপ্রাইজ',
    desc_en: 'Full multi-vendor marketplace solution.',
    desc_bn: 'পূর্ণাঙ্গ মাল্টি-ভেন্ডার মার্কেটপ্লেস সলিউশন।',
    price: 75000,
    timeline: '30-45 Days',
    features_en: ['Multi-vendor Support', 'iOS/Android App Sync', 'Dedicated Server', 'Lifetime Support'],
    features_bn: ['মাল্টি-ভেন্ডার সাপোর্ট', 'মোবাইল অ্যাপ সিঙ্ক', 'ডেডিকেটেড সার্ভার', 'লাইফটাইম সাপোর্ট'],
    type: 'website',
    category: 'E-commerce',
    tier: 'Enterprise'
  },
  {
    id: 'web-port-beg',
    name_en: 'Portfolio Beginner',
    name_bn: 'পোর্টফোলিও বিগিনার',
    desc_en: 'Elegant single-page portfolio for individuals.',
    desc_bn: 'ব্যক্তিগত ব্যবহারের জন্য সুন্দর সিঙ্গেল-পেজ পোর্টফোলিও।',
    price: 8000,
    timeline: '3-5 Days',
    features_en: ['Single Page', 'Contact Form', 'Mobile Responsive', 'Free Domain'],
    features_bn: ['সিঙ্গেল পেজ', 'কন্টাক্ট ফর্ম', 'মোবাইল রেসপন্সিভ', 'ফ্রি ডোমেইন'],
    type: 'website',
    category: 'Portfolio',
    tier: 'Beginner'
  },
  {
    id: 'web-port-std',
    name_en: 'Portfolio Standard',
    name_bn: 'পোর্টফোলিও স্ট্যান্ডার্ড',
    desc_en: 'Multi-page creative portfolio with animations.',
    desc_bn: 'অ্যানিমেশন সহ মাল্টি-পেজ ক্রিয়েটিভ পোর্টফোলিও।',
    price: 18000,
    timeline: '7-10 Days',
    features_en: ['Multiple Pages', 'Dynamic Gallery', 'GSAP Animations', 'SEO Optimized'],
    features_bn: ['মাল্টিপল পেজ', 'ডায়নামিক গ্যালারি', 'অ্যানিমেশন', 'এসইও অপ্টিমাইজড'],
    type: 'website',
    category: 'Portfolio',
    tier: 'Standard'
  },
  {
    id: 'web-port-ent',
    name_en: 'Portfolio Enterprise',
    name_bn: 'পোর্টফোলিও এন্টারপ্রাইজ',
    desc_en: 'Luxury agency website with high-end visuals.',
    desc_bn: 'হাই-এন্ড ভিজ্যুয়াল সহ লাক্সারি এজেন্সি ওয়েবসাইট।',
    price: 45000,
    timeline: '15-20 Days',
    features_en: ['Custom WebGL', 'Exclusive Graphics', 'Priority Support', 'Content Writing'],
    features_bn: ['কাস্টম গ্রাফিক্স', 'এক্সক্লুসিভ ডিজাইন', 'প্রায়োরিটি সাপোর্ট', 'কন্টেন্ট রাইটিং'],
    type: 'website',
    category: 'Portfolio',
    tier: 'Enterprise'
  },

  // --- WEBSITES: BLOG ---
  {
    id: 'web-blog-beg',
    name_en: 'Personal Blog Starter',
    name_bn: 'পার্সোনাল ব্লগ স্টার্টার',
    desc_en: 'Simple blog for sharing your stories.',
    desc_bn: 'আপনার গল্প শেয়ার করার জন্য সহজ ব্লগ সাইট।',
    price: 10000,
    timeline: '5-7 Days',
    features_en: ['Minimal Design', 'SEO Ready', 'Social Sharing', 'Google Analytics'],
    features_bn: ['মিনিমাল ডিজাইন', 'এসইও রেডি', 'সোশ্যাল শেয়ারিং', 'গুগল অ্যানালিটিক্স'],
    type: 'website',
    category: 'Blog',
    tier: 'Beginner'
  },
  {
    id: 'web-blog-std',
    name_en: 'Pro Content Blog',
    name_bn: 'প্রো কন্টেন্ট ব্লগ',
    desc_en: 'Monetized blog for professional writers.',
    desc_bn: 'প্রফেশনাল রাইটারদের জন্য মনেটাইজেশন উপযুক্ত ব্লগ।',
    price: 22000,
    timeline: '10-14 Days',
    features_en: ['AdSense Ready', 'Newsletter Integration', 'Advanced Tags', 'Fast Loading'],
    features_bn: ['অ্যাডসেন্স রেডি', 'নিউজলেটার ইন্টিগ্রেশন', 'অ্যাডভান্সড ট্যাগ', 'ফাস্ট লোডিং'],
    type: 'website',
    category: 'Blog',
    tier: 'Standard'
  },

  // --- WEBSITES: NEWS/PORTAL ---
  {
    id: 'web-news-std',
    name_en: 'News Portal Standard',
    name_bn: 'নিউজ পোর্টাল স্ট্যান্ডার্ড',
    desc_en: 'Dynamic news portal with categorization.',
    desc_bn: 'ক্যাটাগরি সহ ডায়নামিক নিউজ পোর্টাল।',
    price: 40000,
    timeline: '20-25 Days',
    features_en: ['News Categories', 'Video Support', 'Breaking News Ticker', 'Mobile Friendly'],
    features_bn: ['নিউজ ক্যাটাগরি', 'ভিডিও সাপোর্ট', 'ব্রেকিং নিউজ স্টিকার', 'মোবাইল ফ্রেন্ডলি'],
    type: 'website',
    category: 'News/Portal',
    tier: 'Standard'
  },
  {
    id: 'web-news-ent',
    name_en: 'Enterprise News Agency',
    name_bn: 'এন্টারপ্রাইজ নিউজ এজেন্সি',
    desc_en: 'Full agency portal for heavy traffic.',
    desc_bn: 'ভারী ট্রাফিকের জন্য পূর্ণাঙ্গ নিউজ এজেন্সি পোর্টাল।',
    price: 85000,
    timeline: '45-60 Days',
    features_en: ['Staff Management', 'Ad Server Sync', 'Live Streaming Integration', 'Dedicated DB'],
    features_bn: ['স্টাফ ম্যানেজমেন্ট', 'অ্যাড সার্ভার সিঙ্ক', 'লাইভ স্ট্রিমিং', 'ডেডিকেটেড ডাটাবেস'],
    type: 'website',
    category: 'News/Portal',
    tier: 'Enterprise'
  },

  // --- WEBSITES: LANDING PAGE ---
  {
    id: 'web-land-beg',
    name_en: 'Starter Landing Page',
    name_bn: 'স্টার্টার ল্যান্ডিং পেজ',
    desc_en: 'Single-page landing for startups.',
    desc_bn: 'স্টার্টআপদের জন্য সিঙ্গেল-পেজ ল্যান্ডিং পেজ।',
    price: 8000,
    timeline: '3-4 Days',
    features_en: ['Single Page', 'Lead Capture Form', 'Mobile Responsive', 'Fast Hosting'],
    features_bn: ['সিঙ্গেল পেজ', 'লিড ক্যাপচার ফর্ম', 'মোবাইল রেসপন্সিভ', 'ফাস্ট হোস্টিং'],
    type: 'website',
    category: 'Landing Page',
    tier: 'Beginner'
  },
  {
    id: 'web-land-pro',
    name_en: 'High-Conversion Landing',
    name_bn: 'হাই-কনভার্সন ল্যান্ডিং',
    desc_en: 'Ads-optimized page for high sales.',
    desc_bn: 'বেশি বিক্রির জন্য অ্যাডস-অপ্টিমাইজড পেজ।',
    price: 15000,
    timeline: '5-7 Days',
    features_en: ['A/B Testing Support', 'Pixel/API Integration', 'Copywriting Help', 'Premium Graphics'],
    features_bn: ['এ/বি টেস্টিং সাপোর্ট', 'পিক্সেল/এপিআই', 'কপিরাইটিং সহায়তা', 'প্রিমিয়াম গ্রাফিক্স'],
    type: 'website',
    category: 'Landing Page',
    tier: 'Standard'
  },



  // --- SMART POS ---
  {
    id: 'pos-app-2pc',
    name_en: 'POS App - 2 PC',
    name_bn: 'পজ অ্যাপ - ২ পিসি',
    desc_en: 'Cloud-based POS for up to 2 workstations.',
    desc_bn: '২টি কম্পিউটার পর্যন্ত ক্লাউড-ভিত্তিক পজ সফটওয়্যার।',
    price: 12000,
    timeline: '1 Day Setup',
    features_en: ['Sales Tracking', 'Inventory', 'Report Generation', 'Mobile Admin'],
    features_bn: ['সেলস ট্র্যাকিং', 'ইনভেন্টরি', 'রিপোর্ট জেনারেশন', 'মোবাইল অ্যাডমিন'],
    type: 'pos',
    category: 'Only App',
    tier: '2 PC'
  },
  {
    id: 'pos-app-8pc',
    name_en: 'POS App - 8 PC',
    name_bn: 'পজ অ্যাপ - ৮ পিসি',
    desc_en: 'Scaling business solution for up to 8 PCs.',
    desc_bn: '৮টি পিসি পর্যন্ত বড় ব্যবসায়িক সলিউশন।',
    price: 35000,
    timeline: '2 Days Setup',
    features_en: ['Multi-branch Sync', 'Employee Logging', 'Wholesale Module', '24/7 Support'],
    features_bn: ['মাল্টি-ব্রাঞ্চ সিঙ্ক', 'এমপ্লয়ি লগিং', 'হোলসেল মডিউল', '২৪/৭ সাপোর্ট'],
    type: 'pos',
    category: 'Only App',
    tier: '8 PC'
  },
  {
    id: 'pos-full-2pc',
    name_en: 'Full POS Setup - 2 PC',
    name_bn: 'ফুল পজ সেটআপ - ২ পিসি',
    desc_en: 'Hardware + App for a complete store setup.',
    desc_bn: 'পূর্ণাঙ্গ স্টোর সেটআপের জন্য হার্ডওয়্যার + অ্যাপ।',
    price: 65000,
    timeline: '3-5 Days',
    features_en: ['2 POS Printers', 'Cash Drawer', 'Barcode Scanner', 'App Setup'],
    features_bn: ['২টি পজ প্রিন্টার', 'ক্যাশ ড্রয়ার', 'বারকোড স্ক্যানার', 'অ্যাপ সেটআপ'],
    type: 'pos',
    category: 'Full Setup',
    tier: '2 PC'
  },
  {
    id: 'pos-full-ent',
    name_en: 'Full POS Enterprise',
    name_bn: 'ফুল পজ এন্টারপ্রাইজ',
    desc_en: 'Unlimited workstations with complete hardware.',
    desc_bn: 'সব হার্ডওয়্যার সহ আনলিমিটেড কম্পিউটার সেটআপ।',
    price: 150000,
    timeline: '10-15 Days',
    features_en: ['Custom Server', 'Advanced Security', 'All Hardware Included', 'Lifetime Warranty'],
    features_bn: ['কাস্টম সার্ভার', 'অ্যাডভান্সড সিকিউরিটি', 'সব হার্ডওয়্যার', 'লাইফটাইম ওয়ারেন্টি'],
    type: 'pos',
    category: 'Full Setup',
    tier: 'Enterprise'
  },

  // --- MOBILE APPS ---
  {
    id: 'app-starter',
    name_en: 'Mobile App Starter',
    name_bn: 'মোবাইল অ্যাপ স্টার্টার',
    desc_en: 'Hybrid app for basic business presence.',
    desc_bn: 'বেসিক ব্যবসার জন্য হাইব্রিড মোবাইল অ্যাপ।',
    price: 45000,
    timeline: '30 Days',
    features_en: ['iOS/Android Support', 'Push Notifications', 'Splash Screen', 'Admin Panel'],
    features_bn: ['আইওএস/অ্যান্ড্রয়েড', 'পুশ নোটিফিকেশন', 'স্প্ল্যাশ স্ক্রিন', 'অ্যাডমিন প্যানেল'],
    type: 'app',
    tier: 'Starter'
  },
  {
    id: 'app-pro',
    name_en: 'Business Pro App',
    name_bn: 'বিজনেস প্রো অ্যাপ',
    desc_en: 'High-performance cross-platform app.',
    desc_bn: 'উচ্চ পারফরম্যান্স ক্রস-প্ল্যাটফর্ম অ্যাপ।',
    price: 120000,
    timeline: '60 Days',
    features_en: ['Real-time Sync', 'Payment Gateway', 'Member Login', 'Cloud Backend'],
    features_bn: ['রিয়েল-টাইম সিঙ্ক', 'পেমেন্ট গেটওয়ে', 'মেম্বার লগইন', 'ক্লাউড ব্যাকএন্ড'],
    type: 'app',
    tier: 'Pro'
  },
  {
    id: 'app-ent',
    name_en: 'Enterprise Custom App',
    name_bn: 'এন্টারপ্রাইজ কাস্টম অ্যাপ',
    desc_en: 'Scalable solution for major organizations.',
    desc_bn: 'বড় প্রতিষ্ঠানের জন্য স্কেলেবল অ্যাপ সলিউশন।',
    price: 250000,
    timeline: '90+ Days',
    features_en: ['Native Performance', 'Big Data Support', 'A/B Testing', 'Maintenance Plan'],
    features_bn: ['নেটিভ পারফরম্যান্স', 'বিগ ডেটা সাপোর্ট', 'এ/বি টেস্টিং', 'মেইনটেন্যান্স প্ল্যান'],
    type: 'app',
    tier: 'Enterprise'
  }
];

export const MOCK_HARDWARE: any[] = [
  {
    id: 'hw-bd-1',
    name_bn: 'আরএনএ স্মার্ট পজ হাব',
    name_en: 'RNA Smart POS Hub',
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
    name_bn: 'আরএনএ আইওটি গেটওয়ে',
    name_en: 'RNA IoT Gateway',
    desc_bn: 'গার্মেন্টস এবং ফ্যাক্টরির জন্য রিয়েল-টাইম মেশিন মনিটরিং সেন্সর।',
    desc_en: 'Real-time machine monitoring sensor for garments and factories.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    category: 'Industrial',
    stock: 12,
    specs: { endurance: '24/7 Runtime', protection: 'IP65 Rated', cloud: 'Azure/RNA Managed' },
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
