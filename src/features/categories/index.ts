/**
 * Categories Module - Public API
 * Exportaciones públicas del módulo de categorías
 */

// API
export { CategoriesApi } from './api/categories.api';

// Types
export type {
  Category,
  CategoryCreateDto,
  CategoryUpdateDto,
} from './types/category.types';

// Hooks
export {
  useCategories,
  useCategory,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useActiveCategories,
} from './hooks/useCategories';

// Components
export { CategoryDialog } from './components/CategoryDialog';

