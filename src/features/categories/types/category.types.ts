/**
 * Category Types
 * Tipos relacionados con categorías
 */

import { BaseEntity } from '@/shared/types/api.types';

/**
 * Entidad Category
 */
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  active: boolean;
}

/**
 * DTO para crear una categoría
 */
export interface CategoryCreateDto {
  name: string;
  description?: string;
  active?: boolean;
}

/**
 * DTO para actualizar una categoría
 */
export interface CategoryUpdateDto extends Partial<CategoryCreateDto> {}

