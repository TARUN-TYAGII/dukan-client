'use client';

import Layout from '@/components/layout/Layout';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import { useCustomers } from '@/hooks/useCustomers';
import { BookOpen, Users, ShoppingCart, TrendingUp, Package, UserCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { data: books, isLoading: booksLoading } = useBooks();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: customers, isLoading: customersLoading } = useCustomers();

  const stats = [
    {
      name: 'Total Books',
      value: books?.length || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12%',
      href: '/admin/books'
    },
    {
      name: 'Categories',
      value: categories?.length || 0,
      icon: Package,
      color: 'bg-green-500',
      change: '+5%',
      href: '/admin/categories'
    },
    {
      name: 'Customers',
      value: customers?.length || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%',
      href: '/admin/customers'
    },
    {
      name: 'Orders',
      value: '45',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      change: '+15%',
      href: '/admin/orders'
    },
  ];

  const lowStockBooks = books?.filter(book => book.quantity < 10) || [];
  const recentBooks = books?.slice(0, 5) || [];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your bookshop inventory, customers, and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <a
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-md`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recent Books</h2>
              <a href="/admin/books" className="text-blue-600 hover:text-blue-700 text-sm">View all</a>
            </div>
            <div className="p-6">
              {booksLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{book.price}</p>
                        <p className="text-sm text-gray-500">Grade {book.grade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Low Stock Alert</h2>
              <span className="text-red-600 text-sm font-medium">{lowStockBooks.length} items</span>
            </div>
            <div className="p-6">
              {booksLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : lowStockBooks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">All books are well stocked!</p>
              ) : (
                <div className="space-y-4">
                  {lowStockBooks.slice(0, 5).map((book) => (
                    <div key={book.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          book.quantity === 0 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {book.quantity} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/admin/books"
                className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-900">Manage Books</p>
              </a>
              <a
                href="/admin/categories"
                className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors"
              >
                <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">Categories</p>
              </a>
              <a
                href="/admin/customers"
                className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
              >
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-900">Customers</p>
              </a>
              <a
                href="/admin/orders"
                className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors"
              >
                <ShoppingCart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-900">Orders</p>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">System Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {books?.filter(book => book.quantity > 0).length || 0}
                </div>
                <p className="text-sm text-gray-600">Books in Stock</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {categories?.filter(cat => cat.isActive).length || 0}
                </div>
                <p className="text-sm text-gray-600">Active Categories</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {customers?.filter(customer => customer.isActive).length || 0}
                </div>
                <p className="text-sm text-gray-600">Active Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
