// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp?: string;
}

// Base class fields
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Book related types
export enum Board {
  CBSE = "CBSE",
  ICSE = "ICSE", 
  STATE_BOARD = "STATE_BOARD",
  IGCSE = "IGCSE",
  IB = "IB",
  NCERT = "NCERT"
}

export interface Book extends BaseEntity {
  title: string;
  author: string;
  description?: string;
  image?: string;
  price: number;
  mrp: number;
  discount?: number;
  quantity: number;
  grade: number;
  subject: string;
  board: Board;
  isbn?: string;
  publisher?: string;
  edition?: string;
  language?: string;
  isActive: boolean;
  category?: Category;
}

export interface BookDTO {
  id?: number;
  title: string;
  author: string;
  description?: string;
  image?: string;
  price: number;
  mrp: number;
  discount?: number;
  quantity: number;
  grade: number;
  subject: string;
  board: Board;
  isbn?: string;
  publisher?: string;
  edition?: string;
  language?: string;
  isActive?: boolean;
  categoryId?: number;
  category?: Category;
}

// Category related types
export enum CategoryType {
  GRADE_LEVEL = "GRADE_LEVEL",
  SUBJECT = "SUBJECT",
  BOOK_TYPE = "BOOK_TYPE",
  BOARD = "BOARD",
  LANGUAGE = "LANGUAGE"
}

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  categoryType?: CategoryType;
  isActive: boolean;
  books?: Book[];
}

export interface CategoryDTO {
  id?: number;
  name: string;
  description?: string;
  categoryType?: CategoryType;
  isActive?: boolean;
}

// Customer related types
export enum CustomerType {
  INDIVIDUAL = "INDIVIDUAL",
  SCHOOL = "SCHOOL",
  INSTITUTION = "INSTITUTION",
  BULK_BUYER = "BULK_BUYER"
}

export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  customerType: CustomerType;
  institutionName?: string;
  contactPerson?: string;
  gstNumber?: string;
  isActive: boolean;
  orders?: Order[];
}

export interface CustomerDTO {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  customerType?: CustomerType;
  institutionName?: string;
  contactPerson?: string;
  gstNumber?: string;
  isActive?: boolean;
}

// Order related types
export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED"
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  ONLINE_PAYMENT = "ONLINE_PAYMENT",
  BANK_TRANSFER = "BANK_TRANSFER",
  UPI = "UPI",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  PARTIAL = "PARTIAL"
}

export interface OrderItem extends BaseEntity {
  book: Book;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  customer: Customer;
  status: OrderStatus;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  orderDate?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPincode?: string;
  contactPhone?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderItems: OrderItem[];
}

export interface OrderDTO {
  id?: number;
  orderNumber?: string;
  customerId: number;
  customer?: Customer;
  status?: OrderStatus;
  totalAmount: number;
  discountAmount?: number;
  finalAmount: number;
  orderDate?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPincode?: string;
  contactPhone?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  orderItems: OrderItemDTO[];
}

export interface OrderItemDTO {
  id?: number;
  bookId: number;
  book?: Book;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
}

export interface CreateOrderRequest {
  customerId: number;
  orderItems: {
    bookId: number;
    quantity: number;
    unitPrice: number;
  }[];
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPincode?: string;
  contactPhone?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
}

// User related types
export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  INVENTORY_MANAGER = "INVENTORY_MANAGER",
  SALES_PERSON = "SALES_PERSON"
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  role: Role;
  isActive: boolean;
  lastLogin?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role?: Role;
  isActive?: boolean;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

// Search and pagination types
export interface SearchRequest {
  // Book search
  title?: string;
  author?: string;
  grade?: number;
  subject?: string;
  board?: Board;
  
  // Order search
  orderNumber?: string;
  customerId?: number;
  orderStatus?: OrderStatus;
  startDate?: string;
  endDate?: string;
  
  // Pagination
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Form types for creating/editing
export interface BookFormData {
  title: string;
  author: string;
  description: string;
  image: string;
  price: number;
  mrp: number;
  discount: number;
  quantity: number;
  grade: number;
  subject: string;
  board: Board;
  isbn: string;
  publisher: string;
  edition: string;
  language: string;
  categoryId: number;
}

export interface CategoryFormData {
  name: string;
  description: string;
  categoryType: CategoryType;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  customerType: CustomerType;
  institutionName: string;
  contactPerson: string;
  gstNumber: string;
}

export interface OrderFormData {
  customerId: number;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryPincode: string;
  contactPhone: string;
  notes: string;
  paymentMethod: PaymentMethod;
  orderItems: {
    bookId: number;
    quantity: number;
    unitPrice: number;
  }[];
}
