/**
 * Categories React Query Hooks
 * Custom hooks para gestionar el estado de categorías con React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/app/config/react-query.config';
import { CategoriesApi } from '../api/categories.api';
import type { Category, CategoryCreateDto, CategoryUpdateDto } from '../types/category.types';

/**
 * Hook para obtener todas las categorías
 */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: () => CategoriesApi.getAll(),
  });
}

/**
 * Hook para obtener una categoría por ID
 */
export function useCategory(id: number | null | undefined) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id!),
    queryFn: () => CategoriesApi.getById(id!),
    enabled: !!id,
  });
}

/**
 * Hook para crear una categoría
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreateDto) => CategoriesApi.create(data),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.lists() });
      queryClient.setQueryData(
        queryKeys.categories.detail(newCategory.id),
        newCategory
      );
      toast.success('Categoría creada exitosamente');
    },
    onError: (error) => {
      console.error('Error creating category:', error);
      toast.error('Error al crear la categoría');
    },
  });
}

/**
 * Hook para actualizar una categoría
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdateDto }) =>
      CategoriesApi.update(id, data),
    onSuccess: (updatedCategory, variables) => {
      if (updatedCategory) {
        queryClient.setQueryData(
          queryKeys.categories.detail(variables.id),
          updatedCategory
        );
        queryClient.invalidateQueries({ queryKey: queryKeys.categories.lists() });
        toast.success('Categoría actualizada exitosamente');
      }
    },
    onError: (error) => {
      console.error('Error updating category:', error);
      toast.error('Error al actualizar la categoría');
    },
  });
}

/**
 * Hook para eliminar una categoría
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CategoriesApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: queryKeys.categories.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.lists() });
      toast.success('Categoría eliminada exitosamente');
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
      toast.error('Error al eliminar la categoría');
    },
  });
}

/**
 * Hook para obtener categorías activas
 */
export function useActiveCategories() {
  const { data: categories, ...rest } = useCategories();

  const activeCategories = categories?.filter((category) => category.active);

  return { data: activeCategories, ...rest };
}

