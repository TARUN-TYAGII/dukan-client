'use client';

import Layout from '@/components/layout/Layout';
import { UserCheck, Shield, Users, Settings } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600 mt-2">Manage system users and their permissions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <UserCheck className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-md">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">22</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-md">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Staff</p>
                <p className="text-2xl font-semibold text-gray-900">19</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Placeholder */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">System Users</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: 'Admin User', email: 'admin@schoolbooks.com', role: 'Administrator', status: 'Active', lastLogin: '2024-01-15' },
                    { name: 'John Manager', email: 'john@schoolbooks.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-14' },
                    { name: 'Sarah Staff', email: 'sarah@schoolbooks.com', role: 'Staff', status: 'Active', lastLogin: '2024-01-13' },
                    { name: 'Mike Inventory', email: 'mike@schoolbooks.com', role: 'Inventory Manager', status: 'Active', lastLogin: '2024-01-12' },
                    { name: 'Lisa Sales', email: 'lisa@schoolbooks.com', role: 'Sales Person', status: 'Inactive', lastLogin: '2024-01-10' },
                  ].map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'Administrator' 
                            ? 'bg-red-100 text-red-800'
                            : user.role === 'Manager'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
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
          <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Full User Management</h2>
          <p className="text-gray-600 mb-4">
            Complete user management system with role-based access control and permissions.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Features Coming Soon:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Create and manage system users</li>
              <li>• Role-based access control</li>
              <li>• User permissions management</li>
              <li>• Activity tracking and logs</li>
              <li>• Password management</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
