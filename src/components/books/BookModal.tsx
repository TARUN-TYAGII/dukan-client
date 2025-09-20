'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useCreateBook, useUpdateBook } from '@/hooks/useBooks';
import { BookDTO, Board } from '@/types';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  mrp: z.number().min(0.01, 'MRP must be greater than 0'),
  discount: z.number().min(0).optional(),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  grade: z.number().min(1, 'Grade must be at least 1'),
  subject: z.string().min(1, 'Subject is required'),
  board: z.nativeEnum(Board),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  edition: z.string().optional(),
  language: z.string().optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: BookDTO | null;
  mode: 'create' | 'edit' | 'view';
}

export default function BookModal({ isOpen, onClose, book, mode }: BookModalProps) {
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  useEffect(() => {
    if (book) {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('description', book.description || '');
      setValue('image', book.image || '');
      setValue('price', book.price);
      setValue('mrp', book.mrp);
      setValue('discount', book.discount || 0);
      setValue('quantity', book.quantity);
      setValue('grade', book.grade);
      setValue('subject', book.subject);
      setValue('board', book.board);
      setValue('isbn', book.isbn || '');
      setValue('publisher', book.publisher || '');
      setValue('edition', book.edition || '');
      setValue('language', book.language || '');
    } else {
      reset();
    }
  }, [book, setValue, reset]);

  const onSubmit = async (data: BookFormData) => {
    try {
      if (mode === 'create') {
        await createBookMutation.mutateAsync(data);
      } else if (mode === 'edit' && book?.id) {
        await updateBookMutation.mutateAsync({ id: book.id, book: data });
      }
      onClose();
      reset();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Add New Book' : mode === 'edit' ? 'Edit Book' : 'View Book';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                {...register('title')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                {...register('author')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.author && (
                <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
              )}
            </div>
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              {...register('image')}
              type="url"
              readOnly={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price * (₹)
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MRP * (₹)
              </label>
              <input
                {...register('mrp', { valueAsNumber: true })}
                type="number"
                step="0.01"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.mrp && (
                <p className="text-red-600 text-sm mt-1">{errors.mrp.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity *
              </label>
              <input
                {...register('quantity', { valueAsNumber: true })}
                type="number"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.quantity && (
                <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade *
              </label>
              <input
                {...register('grade', { valueAsNumber: true })}
                type="number"
                min="1"
                max="12"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.grade && (
                <p className="text-red-600 text-sm mt-1">{errors.grade.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                {...register('subject')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Board *
              </label>
              <select
                {...register('board')}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                {Object.values(Board).map((board) => (
                  <option key={board} value={board}>
                    {board.replace('_', ' ')}
                  </option>
                ))}
              </select>
              {errors.board && (
                <p className="text-red-600 text-sm mt-1">{errors.board.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                {...register('isbn')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publisher
              </label>
              <input
                {...register('publisher')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Edition
              </label>
              <input
                {...register('edition')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <input
                {...register('language')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

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
                disabled={createBookMutation.isPending || updateBookMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {mode === 'create' ? 'Create Book' : 'Update Book'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
