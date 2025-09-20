'use client';

import Layout from '@/components/layout/Layout';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Insights and analytics for your bookshop business</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-md">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                <p className="text-2xl font-semibold text-gray-900">₹2,34,567</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-semibold text-gray-900">18.2%</p>
                <p className="text-sm text-green-600">+2.4% from last month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-md">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Category</p>
                <p className="text-2xl font-semibold text-gray-900">Mathematics</p>
                <p className="text-sm text-blue-600">32% of total sales</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-semibold text-gray-900">₹1,245</p>
                <p className="text-sm text-green-600">+8.3% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sales chart will appear here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Category distribution chart will appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Items */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Books</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'Mathematics Textbook Grade 10', sales: '₹45,678', units: '234 units' },
                { name: 'English Grammar Guide', sales: '₹32,456', units: '189 units' },
                { name: 'Science Practical Manual', sales: '₹28,934', units: '156 units' },
                { name: 'History of India', sales: '₹24,567', units: '134 units' },
                { name: 'Computer Science Basics', sales: '₹19,876', units: '98 units' },
              ].map((book, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{book.name}</p>
                    <p className="text-sm text-gray-500">{book.units} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{book.sales}</p>
                    <p className="text-sm text-green-600">#{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <Activity className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Advanced Analytics Coming Soon</h3>
          <p className="text-blue-700">
            Interactive charts, detailed reports, and advanced business intelligence features will be available soon.
          </p>
        </div>
      </div>
    </Layout>
  );
}
