/**
 * Products API Service
 * Servicio para gestionar operaciones CRUD de productos
 */

import { httpClient } from '@/core/api/http-client';
import { API_ENDPOINTS } from '@/app/config/api.config';
import type { Product, ProductCreateDto, ProductUpdateDto } from '../types/product.types';

export class ProductsApi {
  /**
   * Obtener todos los productos
   */
  static async getAll(): Promise<Product[]> {
    return httpClient.get<Product[]>(API_ENDPOINTS.products);
  }

  /**
   * Obtener un producto por ID
   */
  static async getById(id: number): Promise<Product | null> {
    return httpClient.get<Product>(`${API_ENDPOINTS.products}/${id}`);
  }

  /**
   * Crear un nuevo producto
   */
  static async create(data: ProductCreateDto): Promise<Product> {
    return httpClient.post<Product>(API_ENDPOINTS.products, data);
  }

  /**
   * Actualizar un producto existente
   */
  static async update(id: number, data: ProductUpdateDto): Promise<Product | null> {
    return httpClient.put<Product>(`${API_ENDPOINTS.products}/${id}`, data);
  }

  /**
   * Eliminar un producto
   */
  static async delete(id: number): Promise<Product | null> {
    return httpClient.delete<Product>(`${API_ENDPOINTS.products}/${id}`);
  }
}

