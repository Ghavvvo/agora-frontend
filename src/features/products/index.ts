/**
 * Products Module - Public API
 * Exportaciones públicas del módulo de productos
 */

// API
export { ProductsApi } from './api/products.api';

// Types
export type {
  Product,
  ProductCreateDto,
  ProductUpdateDto,
  ProductFilters,
} from './types/product.types';

// Hooks
export {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useFilteredProducts,
} from './hooks/useProducts';

