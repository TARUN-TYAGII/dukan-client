'use client';

import Layout from '@/components/layout/Layout';
import { ShoppingCart, Calendar, User, DollarSign } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
            <p className="text-gray-600 mt-2">Manage customer orders and track deliveries</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <ShoppingCart className="w-4 h-4" />
            <span>New Order</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-md">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-md">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹45,678</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table Placeholder */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'Delivered', amount: '₹1,250' },
                    { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-14', status: 'Shipped', amount: '₹890' },
                    { id: 'ORD-003', customer: 'ABC School', date: '2024-01-13', status: 'Processing', amount: '₹15,600' },
                    { id: 'ORD-004', customer: 'Mike Johnson', date: '2024-01-12', status: 'Pending', amount: '₹560' },
                    { id: 'ORD-005', customer: 'XYZ Institution', date: '2024-01-11', status: 'Delivered', amount: '₹8,900' },
                  ].map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Full Orders Management</h2>
          <p className="text-gray-600 mb-4">
            Complete order management system with order tracking, payment status, and delivery management.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Features Coming Soon:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Create and manage orders</li>
              <li>• Track order status and delivery</li>
              <li>• Payment status management</li>
              <li>• Order history and analytics</li>
              <li>• Customer order tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
