'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useCreateCategory, useUpdateCategory } from '@/hooks/useCategories';
import { CategoryDTO, CategoryType } from '@/types';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  categoryType: z.nativeEnum(CategoryType).optional(),
  isActive: z.boolean().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: CategoryDTO | null;
  mode: 'create' | 'edit' | 'view';
}

export default function CategoryModal({ isOpen, onClose, category, mode }: CategoryModalProps) {
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      isActive: true,
    },
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('description', category.description || '');
      setValue('categoryType', category.categoryType);
      setValue('isActive', category.isActive ?? true);
    } else {
      reset({
        name: '',
        description: '',
        categoryType: CategoryType.SUBJECT,
        isActive: true,
      });
    }
  }, [category, setValue, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (mode === 'create') {
        await createCategoryMutation.mutateAsync(data);
      } else if (mode === 'edit' && category?.id) {
        await updateCategoryMutation.mutateAsync({ id: category.id, category: data });
      }
      onClose();
      reset();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Add New Category' : mode === 'edit' ? 'Edit Category' : 'View Category';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              {...register('name')}
              type="text"
              readOnly={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Type
            </label>
            <select
              {...register('categoryType')}
              disabled={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select a type</option>
              {Object.values(CategoryType).map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              readOnly={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Enter category description..."
            />
          </div>

          {!isReadOnly && (
            <div className="flex items-center">
              <input
                {...register('isActive')}
                type="checkbox"
                id="isActive"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
          )}

          {isReadOnly && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                category?.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          )}

          {!isReadOnly && (
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {mode === 'create' ? 'Create Category' : 'Update Category'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
