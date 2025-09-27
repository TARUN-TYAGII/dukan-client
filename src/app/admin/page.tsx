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
      color: 'bg-slate-600',
      change: '+12%',
      href: '/admin/books'
    },
    {
      name: 'Categories',
      value: categories?.length || 0,
      icon: Package,
      color: 'bg-emerald-600',
      change: '+5%',
      href: '/admin/categories'
    },
    {
      name: 'Customers',
      value: customers?.length || 0,
      icon: Users,
      color: 'bg-sky-600',
      change: '+8%',
      href: '/admin/customers'
    },
    {
      name: 'Orders',
      value: '45',
      icon: ShoppingCart,
      color: 'bg-amber-600',
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your bookshop inventory, customers, and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <a
              key={stat.name}
              href={stat.href}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="card-body">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <span className="ml-2 text-sm font-medium text-emerald-600">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Recent Books</h2>
              <a href="/admin/books" className="text-sky-600 hover:text-sky-700 text-sm font-medium">View all</a>
            </div>
            <div className="card-body">
              {booksLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-900">{book.title}</p>
                        <p className="text-sm text-slate-600">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">₹{book.price}</p>
                        <p className="text-sm text-slate-600">Grade {book.grade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Low Stock Alert</h2>
              <span className="badge badge-danger">{lowStockBooks.length} items</span>
            </div>
            <div className="card-body">
              {booksLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : lowStockBooks.length === 0 ? (
                <p className="text-slate-500 text-center py-4">All books are well stocked!</p>
              ) : (
                <div className="space-y-4">
                  {lowStockBooks.slice(0, 5).map((book) => (
                    <div key={book.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-900">{book.title}</p>
                        <p className="text-sm text-slate-600">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <span className={`badge ${
                          book.quantity === 0 
                            ? 'badge-danger' 
                            : 'badge-warning'
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
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/admin/books"
                className="p-6 bg-slate-50 rounded-xl text-center hover:bg-slate-100 transition-all duration-200 hover:scale-105 border border-slate-200"
              >
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-900">Manage Books</p>
              </a>
              <a
                href="/admin/categories"
                className="p-6 bg-emerald-50 rounded-xl text-center hover:bg-emerald-100 transition-all duration-200 hover:scale-105 border border-emerald-200"
              >
                <Package className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-emerald-900">Categories</p>
              </a>
              <a
                href="/admin/customers"
                className="p-6 bg-sky-50 rounded-xl text-center hover:bg-sky-100 transition-all duration-200 hover:scale-105 border border-sky-200"
              >
                <Users className="w-8 h-8 text-sky-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-sky-900">Customers</p>
              </a>
              <a
                href="/admin/orders"
                className="p-6 bg-amber-50 rounded-xl text-center hover:bg-amber-100 transition-all duration-200 hover:scale-105 border border-amber-200"
              >
                <ShoppingCart className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-amber-900">Orders</p>
              </a>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-slate-900">System Overview</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-4 rounded-lg bg-slate-50">
                <div className="text-3xl font-bold text-slate-700 mb-2">
                  {books?.filter(book => book.quantity > 0).length || 0}
                </div>
                <p className="text-sm font-medium text-slate-600">Books in Stock</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-emerald-50">
                <div className="text-3xl font-bold text-emerald-700 mb-2">
                  {categories?.filter(cat => cat.isActive).length || 0}
                </div>
                <p className="text-sm font-medium text-emerald-600">Active Categories</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-sky-50">
                <div className="text-3xl font-bold text-sky-700 mb-2">
                  {customers?.filter(customer => customer.isActive).length || 0}
                </div>
                <p className="text-sm font-medium text-sky-600">Active Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
