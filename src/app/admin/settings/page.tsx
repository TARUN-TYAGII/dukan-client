'use client';

import Layout from '@/components/layout/Layout';
import { Settings, Database, Bell, Shield, Palette } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-2">Manage your application settings and preferences</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-md">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Database</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage database connections and backup settings</p>
            <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-100">
              Configure Database
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-3 rounded-md">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Notifications</h3>
            </div>
            <p className="text-gray-600 mb-4">Configure email and system notifications</p>
            <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-md hover:bg-green-100">
              Manage Notifications
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 p-3 rounded-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Security</h3>
            </div>
            <p className="text-gray-600 mb-4">Security settings and access controls</p>
            <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-md hover:bg-purple-100">
              Security Settings
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500 p-3 rounded-md">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Appearance</h3>
            </div>
            <p className="text-gray-600 mb-4">Customize the look and feel of your application</p>
            <button className="w-full bg-orange-50 text-orange-700 py-2 px-4 rounded-md hover:bg-orange-100">
              Appearance Settings
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-red-500 p-3 rounded-md">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">System</h3>
            </div>
            <p className="text-gray-600 mb-4">General system settings and configurations</p>
            <button className="w-full bg-red-50 text-red-700 py-2 px-4 rounded-md hover:bg-red-100">
              System Settings
            </button>
          </div>
        </div>

        {/* Current Settings Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Current Configuration</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Server Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Server:</span>
                    <span className="text-gray-900">http://localhost:8080</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database:</span>
                    <span className="text-gray-900">MySQL 8.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Environment:</span>
                    <span className="text-green-600">Development</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Application Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="text-gray-900">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admin Theme:</span>
                    <span className="text-gray-900">Default</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="text-gray-900">English</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Settings Coming Soon</h3>
          <p className="text-gray-600">
            More configuration options and advanced settings will be available in future updates.
          </p>
        </div>
      </div>
    </Layout>
  );
}
