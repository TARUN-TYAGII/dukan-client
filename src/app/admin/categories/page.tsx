'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCategories, useDeleteCategory } from '@/hooks/useCategories';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import CategoryModal from '@/components/categories/CategoryModal';
import { CategoryDTO } from '@/types';

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const deleteCategoryMutation = useDeleteCategory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: CategoryDTO) => {
    setSelectedCategory(category);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewCategory = (category: CategoryDTO) => {
    setSelectedCategory(category);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategoryMutation.mutateAsync(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
            <p className="text-gray-600 mt-2">Organize your books into categories</p>
          </div>
          <button
            onClick={handleCreateCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {category.categoryType?.replace('_', ' ') || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {category.description || 'No description'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            category.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewCategory(category)}
                              className="text-blue-600 hover:text-blue-700 p-1"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="text-green-600 hover:text-green-700 p-1"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id!)}
                              className="text-red-600 hover:text-red-700 p-1"
                              title="Delete"
                              disabled={deleteCategoryMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        mode={modalMode}
      />
    </Layout>
  );
}
