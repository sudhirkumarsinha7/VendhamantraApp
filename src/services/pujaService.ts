import api from './api';
import { Puja, PujaBooking, PujaCategory } from '../types';
import { API_ENDPOINTS } from '../config/constants';

export const pujaService = {
  // Get all pujas
  getAllPujas: async (params?: any): Promise<Puja[]> => {
    const response = await api.get(API_ENDPOINTS.PUJAS, { params });
    return response.data.data;
  },

  // Get puja by ID
  getPujaById: async (id: string): Promise<Puja> => {
    const response = await api.get(`${API_ENDPOINTS.PUJAS}/${id}`);
    return response.data.data;
  },

  // Get puja categories
  getCategories: async (): Promise<PujaCategory[]> => {
    const response = await api.get(`${API_ENDPOINTS.PUJAS}/categories`);
    return response.data.data;
  },

  // Book a puja
  bookPuja: async (bookingData: any): Promise<PujaBooking> => {
    const response = await api.post(API_ENDPOINTS.BOOK_PUJA, bookingData);
    return response.data.data;
  },

  // Get user's bookings
  getUserBookings: async (): Promise<PujaBooking[]> => {
    const response = await api.get(API_ENDPOINTS.USER_BOOKINGS);
    return response.data.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.BOOK_PUJA}/${bookingId}`);
  },

  // Get featured pujas
  getFeaturedPujas: async (): Promise<Puja[]> => {
    const response = await api.get(`${API_ENDPOINTS.PUJAS}/featured`);
    return response.data.data;
  },

  // Get pujas by category
  getPujasByCategory: async (category: string): Promise<Puja[]> => {
    const response = await api.get(`${API_ENDPOINTS.PUJAS}/category/${category}`);
    return response.data.data;
  },
};