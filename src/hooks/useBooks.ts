import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookAPI } from '@/lib/api';
import { BookDTO, SearchRequest } from '@/types';
import { toast } from 'react-hot-toast';

// Query keys
const QUERY_KEYS = {
  books: ['books'] as const,
  book: (id: number) => ['books', id] as const,
  booksByGrade: (grade: number) => ['books', 'grade', grade] as const,
  booksBySubject: (subject: string) => ['books', 'subject', subject] as const,
  booksByCategory: (categoryId: number) => ['books', 'category', categoryId] as const,
  booksSearch: (params: SearchRequest) => ['books', 'search', params] as const,
  lowStockBooks: (threshold?: number) => ['books', 'low-stock', threshold] as const,
  bestSellerBooks: (limit?: number) => ['books', 'bestsellers', limit] as const,
};

// Get all books
export function useBooks() {
  return useQuery({
    queryKey: QUERY_KEYS.books,
    queryFn: async () => {
      const response = await bookAPI.getAll();
      return response.data.data;
    },
  });
}

// Get book by ID
export function useBook(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.book(id),
    queryFn: async () => {
      const response = await bookAPI.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Get books by grade
export function useBooksByGrade(grade: number) {
  return useQuery({
    queryKey: QUERY_KEYS.booksByGrade(grade),
    queryFn: async () => {
      const response = await bookAPI.getByGrade(grade);
      return response.data.data;
    },
    enabled: !!grade,
  });
}

// Get books by subject
export function useBooksBySubject(subject: string) {
  return useQuery({
    queryKey: QUERY_KEYS.booksBySubject(subject),
    queryFn: async () => {
      const response = await bookAPI.getBySubject(subject);
      return response.data.data;
    },
    enabled: !!subject,
  });
}

// Get books by category
export function useBooksByCategory(categoryId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.booksByCategory(categoryId),
    queryFn: async () => {
      const response = await bookAPI.getByCategory(categoryId);
      return response.data.data;
    },
    enabled: !!categoryId,
  });
}

// Search books
export function useSearchBooks(params: SearchRequest) {
  return useQuery({
    queryKey: QUERY_KEYS.booksSearch(params),
    queryFn: async () => {
      const response = await bookAPI.search(params);
      return response.data.data;
    },
    enabled: Object.keys(params).length > 0,
  });
}

// Get low stock books
export function useLowStockBooks(threshold?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.lowStockBooks(threshold),
    queryFn: async () => {
      const response = await bookAPI.getLowStock(threshold);
      return response.data.data;
    },
  });
}

// Get best seller books
export function useBestSellerBooks(limit?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.bestSellerBooks(limit),
    queryFn: async () => {
      const response = await bookAPI.getBestSellers(limit);
      return response.data.data;
    },
  });
}

// Create book mutation
export function useCreateBook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (book: BookDTO) => {
      const response = await bookAPI.create(book);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
      toast.success('Book created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create book');
    },
  });
}

// Update book mutation
export function useUpdateBook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, book }: { id: number; book: BookDTO }) => {
      const response = await bookAPI.update(id, book);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.book(variables.id) });
      toast.success('Book updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update book');
    },
  });
}

// Delete book mutation
export function useDeleteBook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await bookAPI.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
      toast.success('Book deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    },
  });
}

// Update stock mutation
export function useUpdateBookStock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      await bookAPI.updateStock(id, quantity);
      return { id, quantity };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.book(data.id) });
      toast.success('Stock updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update stock');
    },
  });
}
