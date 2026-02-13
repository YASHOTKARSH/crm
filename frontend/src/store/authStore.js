import { create } from 'zustand';
import api from '../api/axios';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (credentials) => {
    const { data } = await api.post('/api/auth/login', credentials);
    localStorage.setItem('token', data.data);
    set({ token: data.data, isAuthenticated: true });
  },
  
  register: async (userData) => {
    const { data } = await api.post('/api/auth/register', userData);
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  fetchUser: async () => {
    try {
      const { data } = await api.get('/api/me');
      set({ user: data });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  },
}));

export default useAuthStore;
