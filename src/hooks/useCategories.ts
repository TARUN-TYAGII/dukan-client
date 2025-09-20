import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryAPI } from '@/lib/api';
import { CategoryDTO } from '@/types';
import { toast } from 'react-hot-toast';

// Query keys
const QUERY_KEYS = {
  categories: ['categories'] as const,
  category: (id: number) => ['categories', id] as const,
  categoriesByType: (type: string) => ['categories', 'type', type] as const,
  categoriesWithBooks: ['categories', 'with-books'] as const,
};

// Get all categories
export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: async () => {
      const response = await categoryAPI.getAll();
      return response.data.data;
    },
  });
}

// Get category by ID
export function useCategory(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.category(id),
    queryFn: async () => {
      const response = await categoryAPI.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Get categories by type
export function useCategoriesByType(type: string) {
  return useQuery({
    queryKey: QUERY_KEYS.categoriesByType(type),
    queryFn: async () => {
      const response = await categoryAPI.getByType(type);
      return response.data.data;
    },
    enabled: !!type,
  });
}

// Get categories with books
export function useCategoriesWithBooks() {
  return useQuery({
    queryKey: QUERY_KEYS.categoriesWithBooks,
    queryFn: async () => {
      const response = await categoryAPI.getWithBooks();
      return response.data.data;
    },
  });
}

// Create category mutation
export function useCreateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: CategoryDTO) => {
      const response = await categoryAPI.create(category);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success('Category created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create category');
    },
  });
}

// Update category mutation
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, category }: { id: number; category: CategoryDTO }) => {
      const response = await categoryAPI.update(id, category);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.category(variables.id) });
      toast.success('Category updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update category');
    },
  });
}

// Delete category mutation
export function useDeleteCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await categoryAPI.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories });
      toast.success('Category deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    },
  });
}
