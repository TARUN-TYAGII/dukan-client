'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useBooks, useDeleteBook } from '@/hooks/useBooks';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import BookModal from '@/components/books/BookModal';
import { BookDTO } from '@/types';

export default function AdminBooksPage() {
  const { data: books, isLoading } = useBooks();
  const deleteBookMutation = useDeleteBook();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const filteredBooks = books?.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreateBook = () => {
    setSelectedBook(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditBook = (book: BookDTO) => {
    setSelectedBook(book);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewBook = (book: BookDTO) => {
    setSelectedBook(book);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBookMutation.mutateAsync(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
            <p className="text-gray-600 mt-2">Manage your book inventory</p>
          </div>
          <button
            onClick={handleCreateBook}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search books by title, author, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No books found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-w-3 aspect-h-4 mb-4">
                        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                          {book.image ? (
                            <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <div className="text-gray-400">No Image</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Grade {book.grade}
                          </span>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {book.subject}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-lg text-gray-900">
                              {formatCurrency(book.price)}
                            </span>
                            {book.mrp > book.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatCurrency(book.mrp)}
                              </span>
                            )}
                          </div>
                          <span className={`text-sm px-2 py-1 rounded ${
                            book.quantity > 10 
                              ? 'bg-green-100 text-green-800' 
                              : book.quantity > 0 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.quantity} in stock
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t">
                          <button
                            onClick={() => handleViewBook(book)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditBook(book)}
                            className="text-green-600 hover:text-green-700 p-1"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id!)}
                            className="text-red-600 hover:text-red-700 p-1"
                            title="Delete"
                            disabled={deleteBookMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Book Modal */}
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
        mode={modalMode}
      />
    </Layout>
  );
}
