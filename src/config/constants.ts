export const COLORS = {
  primary: '#8B0000',
  primaryLight: '#B22222',
  secondary: '#FFD700',
  accent: '#FF6B35',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#333333',
  textLight: '#666666',
  textDark: '#111111',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
  info: '#3B82F6',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const FONTS = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.vedhamantra.com/v1',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PUJAS: '/pujas',
  PUJA_DETAIL: '/pujas/:id',
  BOOK_PUJA: '/bookings',
  TEMPLES: '/temples',
  GURUS: '/gurus',
  PANCHANG: '/panchang',
  GIFTS: '/gifts',
  BOOK_GIFT: '/gifts/book',
  USER_PROFILE: '/user/profile',
  USER_BOOKINGS: '/user/bookings',
  NOTIFICATIONS: '/notifications',
};

export const APP_CONSTANTS = {
  APP_NAME: 'Vedha Mantra',
  TAGLINE: 'Tradition • Tech • Trust',
  CONTACT_EMAIL: 'care@vedhamantra.com',
  CONTACT_PHONE: '+91 99888 77665',
  ADDRESS: '108 Vedha Marg, Hyderabad, Telangana',
  RAZORPAY_KEY: 'rzp_test_',
  WHATSAPP_NUMBER: '+919988877665',
};