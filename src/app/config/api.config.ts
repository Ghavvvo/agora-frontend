/**
 * API Configuration
 * Configuración centralizada para la conexión con el backend
 */

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  products: 'products',
  categories: 'categories',
  inventory: 'inventory',
  sales: 'sales',
} as const;

