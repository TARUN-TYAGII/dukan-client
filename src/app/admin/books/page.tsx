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
            <h1 className="text-3xl font-bold text-slate-900">Books Management</h1>
            <p className="text-slate-600 mt-2">Manage your book inventory</p>
          </div>
          <button
            onClick={handleCreateBook}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="card">
          {isLoading ? (
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-slate-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card-body">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">No books found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <div key={book.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white">
                      <div className="aspect-w-3 aspect-h-4 mb-4">
                        <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                          {book.image ? (
                            <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <div className="text-slate-400">No Image</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold text-slate-900 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-slate-600">by {book.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="badge badge-info">
                            Grade {book.grade}
                          </span>
                          <span className="badge badge-success">
                            {book.subject}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-lg text-slate-900">
                              {formatCurrency(book.price)}
                            </span>
                            {book.mrp > book.price && (
                              <span className="text-sm text-slate-500 line-through ml-2">
                                {formatCurrency(book.mrp)}
                              </span>
                            )}
                          </div>
                          <span className={`badge ${
                            book.quantity > 10 
                              ? 'badge-success' 
                              : book.quantity > 0 
                              ? 'badge-warning' 
                              : 'badge-danger'
                          }`}>
                            {book.quantity} in stock
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-200">
                          <button
                            onClick={() => handleViewBook(book)}
                            className="text-sky-600 hover:text-sky-700 p-2 rounded-lg hover:bg-sky-50 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditBook(book)}
                            className="text-emerald-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id!)}
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
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
