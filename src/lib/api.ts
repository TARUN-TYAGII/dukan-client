import axios from 'axios';
import { 
  ApiResponse, 
  Book, 
  BookDTO, 
  Category, 
  CategoryDTO, 
  Customer, 
  CustomerDTO, 
  Order, 
  OrderDTO, 
  CreateOrderRequest,
  User,
  UserDTO,
  SearchRequest,
  PageResponse,
  Board,
  OrderStatus,
  PaymentStatus
} from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Book API
export const bookAPI = {
  getAll: () => api.get<ApiResponse<BookDTO[]>>('/books'),
  getById: (id: number) => api.get<ApiResponse<BookDTO>>(`/books/${id}`),
  getByIsbn: (isbn: string) => api.get<ApiResponse<BookDTO>>(`/books/isbn/${isbn}`),
  getByGrade: (grade: number) => api.get<ApiResponse<BookDTO[]>>(`/books/grade/${grade}`),
  getBySubject: (subject: string) => api.get<ApiResponse<BookDTO[]>>(`/books/subject/${subject}`),
  getByBoard: (board: Board) => api.get<ApiResponse<BookDTO[]>>(`/books/board/${board}`),
  getByCategory: (categoryId: number) => api.get<ApiResponse<BookDTO[]>>(`/books/category/${categoryId}`),
  search: (params: SearchRequest) => api.get<ApiResponse<PageResponse<BookDTO>>>('/books/search', { params }),
  getLowStock: (threshold?: number) => api.get<ApiResponse<BookDTO[]>>('/books/low-stock', { params: { threshold } }),
  getBestSellers: (limit?: number) => api.get<ApiResponse<BookDTO[]>>('/books/bestsellers', { params: { limit } }),
  create: (book: BookDTO) => api.post<ApiResponse<BookDTO>>('/books', book),
  update: (id: number, book: BookDTO) => api.put<ApiResponse<BookDTO>>(`/books/${id}`, book),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/books/${id}`),
  updateStock: (id: number, quantity: number) => api.put<ApiResponse<void>>(`/books/${id}/stock`, null, { params: { quantity } }),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get<ApiResponse<CategoryDTO[]>>('/categories'),
  getById: (id: number) => api.get<ApiResponse<CategoryDTO>>(`/categories/${id}`),
  getByName: (name: string) => api.get<ApiResponse<CategoryDTO>>(`/categories/name/${name}`),
  getByType: (categoryType: string) => api.get<ApiResponse<CategoryDTO[]>>(`/categories/type/${categoryType}`),
  getWithBooks: () => api.get<ApiResponse<CategoryDTO[]>>('/categories/with-books'),
  create: (category: CategoryDTO) => api.post<ApiResponse<CategoryDTO>>('/categories', category),
  update: (id: number, category: CategoryDTO) => api.put<ApiResponse<CategoryDTO>>(`/categories/${id}`, category),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/categories/${id}`),
  checkNameAvailability: (name: string) => api.get<ApiResponse<boolean>>('/categories/check-name', { params: { name } }),
};

// Customer API
export const customerAPI = {
  getAll: () => api.get<ApiResponse<CustomerDTO[]>>('/customers'),
  getById: (id: number) => api.get<ApiResponse<CustomerDTO>>(`/customers/${id}`),
  getByEmail: (email: string) => api.get<ApiResponse<CustomerDTO>>(`/customers/email/${email}`),
  getByType: (customerType: string) => api.get<ApiResponse<CustomerDTO[]>>(`/customers/type/${customerType}`),
  search: (params: SearchRequest) => api.get<ApiResponse<PageResponse<CustomerDTO>>>('/customers/search', { params }),
  create: (customer: CustomerDTO) => api.post<ApiResponse<CustomerDTO>>('/customers', customer),
  update: (id: number, customer: CustomerDTO) => api.put<ApiResponse<CustomerDTO>>(`/customers/${id}`, customer),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/customers/${id}`),
  checkEmailAvailability: (email: string) => api.get<ApiResponse<boolean>>('/customers/check-email', { params: { email } }),
};

// Order API
export const orderAPI = {
  getAll: () => api.get<ApiResponse<OrderDTO[]>>('/orders'),
  getById: (id: number) => api.get<ApiResponse<OrderDTO>>(`/orders/${id}`),
  getByOrderNumber: (orderNumber: string) => api.get<ApiResponse<OrderDTO>>(`/orders/order-number/${orderNumber}`),
  getByCustomer: (customerId: number) => api.get<ApiResponse<OrderDTO[]>>(`/orders/customer/${customerId}`),
  getByStatus: (status: OrderStatus) => api.get<ApiResponse<OrderDTO[]>>(`/orders/status/${status}`),
  getRecent: () => api.get<ApiResponse<OrderDTO[]>>('/orders/recent'),
  search: (params: SearchRequest) => api.get<ApiResponse<PageResponse<OrderDTO>>>('/orders/search', { params }),
  create: (order: CreateOrderRequest) => api.post<ApiResponse<OrderDTO>>('/orders', order),
  updateStatus: (id: number, status: OrderStatus) => api.put<ApiResponse<OrderDTO>>(`/orders/${id}/status`, null, { params: { status } }),
  updatePaymentStatus: (id: number, paymentStatus: PaymentStatus) => api.put<ApiResponse<OrderDTO>>(`/orders/${id}/payment-status`, null, { params: { paymentStatus } }),
  cancel: (id: number) => api.delete<ApiResponse<void>>(`/orders/${id}`),
  getTotalSales: () => api.get<ApiResponse<number>>('/orders/analytics/total-sales'),
  getSalesByDateRange: (startDate: string, endDate: string) => api.get<ApiResponse<number>>('/orders/analytics/sales-by-date-range', { params: { startDate, endDate } }),
};

// User API
export const userAPI = {
  getAll: () => api.get<ApiResponse<UserDTO[]>>('/users'),
  getById: (id: number) => api.get<ApiResponse<UserDTO>>(`/users/${id}`),
  getByEmail: (email: string) => api.get<ApiResponse<UserDTO>>(`/users/email/${email}`),
  getByRole: (role: string) => api.get<ApiResponse<UserDTO[]>>(`/users/role/${role}`),
  getActiveUsers: () => api.get<ApiResponse<UserDTO[]>>('/users/active'),
  create: (user: UserDTO) => api.post<ApiResponse<UserDTO>>('/users', user),
  update: (id: number, user: UserDTO) => api.put<ApiResponse<UserDTO>>(`/users/${id}`, user),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/users/${id}`),
  updatePassword: (id: number, currentPassword: string, newPassword: string) => 
    api.put<ApiResponse<void>>(`/users/${id}/password`, { currentPassword, newPassword }),
  checkEmailAvailability: (email: string) => api.get<ApiResponse<boolean>>('/users/check-email', { params: { email } }),
};

export default api;
