import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerAPI } from '@/lib/api';
import { CustomerDTO, SearchRequest } from '@/types';
import { toast } from 'react-hot-toast';

// Query keys
const QUERY_KEYS = {
  customers: ['customers'] as const,
  customer: (id: number) => ['customers', id] as const,
  customersByType: (type: string) => ['customers', 'type', type] as const,
  customersSearch: (params: SearchRequest) => ['customers', 'search', params] as const,
};

// Get all customers
export function useCustomers() {
  return useQuery({
    queryKey: QUERY_KEYS.customers,
    queryFn: async () => {
      const response = await customerAPI.getAll();
      return response.data.data;
    },
  });
}

// Get customer by ID
export function useCustomer(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.customer(id),
    queryFn: async () => {
      const response = await customerAPI.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

// Get customers by type
export function useCustomersByType(type: string) {
  return useQuery({
    queryKey: QUERY_KEYS.customersByType(type),
    queryFn: async () => {
      const response = await customerAPI.getByType(type);
      return response.data.data;
    },
    enabled: !!type,
  });
}

// Search customers
export function useSearchCustomers(params: SearchRequest) {
  return useQuery({
    queryKey: QUERY_KEYS.customersSearch(params),
    queryFn: async () => {
      const response = await customerAPI.search(params);
      return response.data.data;
    },
    enabled: Object.keys(params).length > 0,
  });
}

// Create customer mutation
export function useCreateCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (customer: CustomerDTO) => {
      const response = await customerAPI.create(customer);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers });
      toast.success('Customer created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create customer');
    },
  });
}

// Update customer mutation
export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, customer }: { id: number; customer: CustomerDTO }) => {
      const response = await customerAPI.update(id, customer);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customer(variables.id) });
      toast.success('Customer updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update customer');
    },
  });
}

// Delete customer mutation
export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await customerAPI.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers });
      toast.success('Customer deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete customer');
    },
  });
}
