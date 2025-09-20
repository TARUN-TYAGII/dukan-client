'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import { formatCurrency } from '@/lib/utils';
import { Search, Filter, Grid, List, Star, BookOpen, ShoppingCart } from 'lucide-react';
import { Board, BookDTO } from '@/types';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const { data: books, isLoading } = useBooks();
  const { data: categories } = useCategories();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedBoard, setSelectedBoard] = useState(searchParams.get('board') || '');
  const [selectedGrade, setSelectedGrade] = useState(searchParams.get('grade') || '');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search books
  const filteredBooks = books?.filter(book => {
    const matchesSearch = !searchQuery || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBoard = !selectedBoard || book.board === selectedBoard;
    const matchesGrade = !selectedGrade || book.grade.toString() === selectedGrade;
    const matchesSubject = !selectedSubject || book.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    
    const matchesPrice = (!priceRange.min || book.price >= parseFloat(priceRange.min)) &&
                        (!priceRange.max || book.price <= parseFloat(priceRange.max));

    return matchesSearch && matchesBoard && matchesGrade && matchesSubject && matchesPrice;
  }) || [];

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'grade':
        return a.grade - b.grade;
      default:
        return 0;
    }
  });

  // Get unique subjects from books
  const subjects = [...new Set(books?.map(book => book.subject) || [])];
  const grades = [...new Set(books?.map(book => book.grade) || [])].sort((a, b) => a - b);

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Books</h1>
          <p className="text-gray-600">Find the perfect books for your educational needs</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books, authors, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="grade">Grade</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Board Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
                  <select
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Boards</option>
                    {Object.values(Board).map(board => (
                      <option key={board} value={board}>
                        {board.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grade Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Grades</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBoard('');
                    setSelectedGrade('');
                    setSelectedSubject('');
                    setPriceRange({ min: '', max: '' });
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {sortedBooks.length} of {books?.length || 0} books
          </p>
        </div>

        {/* Books Grid/List */}
        {isLoading ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className={viewMode === 'grid' ? 'h-48' : 'h-24'} className="bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                <div className="aspect-w-3 aspect-h-4 mb-4">
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    {book.image ? (
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Grade {book.grade}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {book.subject}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
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
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {book.image ? (
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                        <p className="text-gray-600">by {book.author}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(book.price)}
                        </div>
                        {book.mrp > book.price && (
                          <div className="text-gray-500 line-through">
                            {formatCurrency(book.mrp)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        Grade {book.grade}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {book.subject}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {book.board.replace('_', ' ')}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.5 (128 reviews)</span>
                      </div>
                    </div>
                    
                    {book.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className={`font-medium ${
                          book.quantity > 10 ? 'text-green-600' : 
                          book.quantity > 0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {book.quantity > 0 ? `${book.quantity} in stock` : 'Out of stock'}
                        </span>
                      </div>
                      <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        disabled={book.quantity === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
