/**
 * Products React Query Hooks
 * Custom hooks para gestionar el estado de productos con React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/app/config/react-query.config';
import { ProductsApi } from '../api/products.api';
import type { Product, ProductCreateDto, ProductUpdateDto } from '../types/product.types';

/**
 * Hook para obtener todos los productos
 */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: () => ProductsApi.getAll(),
  });
}

/**
 * Hook para obtener un producto por ID
 */
export function useProduct(id: number | null | undefined) {
  return useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn: () => ProductsApi.getById(id!),
    enabled: !!id, // Solo ejecutar si hay un ID válido
  });
}

/**
 * Hook para crear un producto
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreateDto) => ProductsApi.create(data),
    onSuccess: (newProduct) => {
      // Invalidar y refetch de la lista de productos
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });

      // Opcionalmente, agregar el nuevo producto al cache
      queryClient.setQueryData(
        queryKeys.products.detail(newProduct.id),
        newProduct
      );

      toast.success('Producto creado exitosamente');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      toast.error('Error al crear el producto');
    },
  });
}

/**
 * Hook para actualizar un producto
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdateDto }) =>
      ProductsApi.update(id, data),
    onSuccess: (updatedProduct, variables) => {
      if (updatedProduct) {
        // Actualizar el cache del producto específico
        queryClient.setQueryData(
          queryKeys.products.detail(variables.id),
          updatedProduct
        );

        // Invalidar la lista de productos
        queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });

        toast.success('Producto actualizado exitosamente');
      }
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar el producto');
    },
  });
}

/**
 * Hook para eliminar un producto
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ProductsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remover el producto del cache
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(deletedId) });

      // Invalidar la lista de productos
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });

      toast.success('Producto eliminado exitosamente');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Error al eliminar el producto');
    },
  });
}

/**
 * Hook para obtener productos filtrados (implementación del lado del cliente)
 */
export function useFilteredProducts(filter?: {
  category?: string;
  active?: boolean;
  search?: string;
}) {
  const { data: products, ...rest } = useProducts();

  const filteredProducts = products?.filter((product) => {
    if (filter?.category && product.category !== filter.category) return false;
    if (filter?.active !== undefined && product.active !== filter.active) return false;
    if (filter?.search) {
      const searchLower = filter.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.code.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return { data: filteredProducts, ...rest };
}

