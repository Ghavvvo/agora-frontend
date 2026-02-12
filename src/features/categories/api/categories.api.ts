/**
 * Categories API Service
 * Servicio para gestionar operaciones CRUD de categorías
 */

import { httpClient } from '@/core/api/http-client';
import { API_ENDPOINTS } from '@/app/config/api.config';
import type { Category, CategoryCreateDto, CategoryUpdateDto } from '../types/category.types';

export class CategoriesApi {
  /**
   * Obtener todas las categorías
   */
  static async getAll(): Promise<Category[]> {
    return httpClient.get<Category[]>(API_ENDPOINTS.categories);
  }

  /**
   * Obtener una categoría por ID
   */
  static async getById(id: number): Promise<Category | null> {
    return httpClient.get<Category>(`${API_ENDPOINTS.categories}/${id}`);
  }

  /**
   * Crear una nueva categoría
   */
  static async create(data: CategoryCreateDto): Promise<Category> {
    return httpClient.post<Category>(API_ENDPOINTS.categories, data);
  }

  /**
   * Actualizar una categoría existente
   */
  static async update(id: number, data: CategoryUpdateDto): Promise<Category | null> {
    return httpClient.put<Category>(`${API_ENDPOINTS.categories}/${id}`, data);
  }

  /**
   * Eliminar una categoría
   */
  static async delete(id: number): Promise<Category | null> {
    return httpClient.delete<Category>(`${API_ENDPOINTS.categories}/${id}`);
  }
}

