/**
 * Shared Types
 * Tipos compartidos entre el frontend y la API
 */

/**
 * Entidad base con campos de auditoría
 */
export interface BaseEntity {
  id: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Respuesta paginada genérica
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Filtros de paginación
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Parámetros de ordenamiento
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Respuesta de error de la API
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

