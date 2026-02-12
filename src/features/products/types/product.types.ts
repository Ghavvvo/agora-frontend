/**
 * Product Types
 * Tipos relacionados con productos
 */

import { BaseEntity } from '@/shared/types/api.types';

/**
 * Entidad Product
 */
export interface Product extends BaseEntity {
  code: string;
  name: string;
  description?: string;
  category: string;
  purchasePriceCup: number;
  purchasePriceUsd: number;
  salePriceCup: number;
  salePriceUsd: number;
  active: boolean;
}

/**
 * DTO para crear un producto
 */
export interface ProductCreateDto {
  code: string;
  name: string;
  description?: string;
  category: string;
  purchasePriceCup: number;
  purchasePriceUsd: number;
  salePriceCup: number;
  salePriceUsd: number;
  active: boolean;
}

/**
 * DTO para actualizar un producto (todos los campos opcionales)
 */
export interface ProductUpdateDto extends Partial<ProductCreateDto> {}

/**
 * Filtros para buscar productos
 */
export interface ProductFilters {
  category?: string;
  active?: boolean;
  search?: string; // Para buscar por código o nombre
}

