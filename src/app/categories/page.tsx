'use client';

import { useState } from 'react';
import Link from 'next/link';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useCategories } from '@/hooks/useCategories';
import { useBooks } from '@/hooks/useBooks';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { CategoryDTO } from '@/types';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const { data: books } = useBooks();
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories?.filter(category =>
    category.isActive && (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ) || [];

  // Get book count for each category
  const getCategoryBookCount = (categoryName: string) => {
    return books?.filter(book => 
      book.subject.toLowerCase().includes(categoryName.toLowerCase()) ||
      book.title.toLowerCase().includes(categoryName.toLowerCase())
    ).length || 0;
  };

  // Group categories by type
  const categoriesByType = filteredCategories.reduce((acc, category) => {
    const type = category.categoryType || 'OTHER';
    if (!acc[type]) acc[type] = [];
    acc[type].push(category);
    return acc;
  }, {} as Record<string, CategoryDTO[]>);

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse by Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find books organized by subjects, grades, and educational boards to make your search easier
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {[
            { name: 'Mathematics', icon: '📊', color: 'bg-blue-500' },
            { name: 'Science', icon: '🔬', color: 'bg-green-500' },
            { name: 'English', icon: '📚', color: 'bg-purple-500' },
            { name: 'History', icon: '📜', color: 'bg-orange-500' },
            { name: 'Geography', icon: '🌍', color: 'bg-teal-500' },
            { name: 'Hindi', icon: '🇮🇳', color: 'bg-red-500' },
          ].map((subject) => (
            <Link
              key={subject.name}
              href={`/shop?subject=${subject.name}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center border border-gray-200"
            >
              <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{subject.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{subject.name}</h3>
              <p className="text-sm text-gray-500">
                {books?.filter(book => book.subject.toLowerCase().includes(subject.name.toLowerCase())).length || 0} books
              </p>
            </Link>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="bg-gray-200 rounded-lg h-32"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(categoriesByType).map(([type, categoryList]) => (
              <div key={type}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                  {type.replace('_', ' ').toLowerCase()}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryList.map((category) => {
                    const bookCount = getCategoryBookCount(category.name);
                    return (
                      <Link
                        key={category.id}
                        href={`/shop?subject=${category.name}`}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200 hover:border-blue-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </h3>
                            {category.description && (
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                {category.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500">
                            <BookOpen className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {bookCount} book{bookCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            type === 'SUBJECT' 
                              ? 'bg-blue-100 text-blue-800'
                              : type === 'GRADE_LEVEL'
                              ? 'bg-green-100 text-green-800'
                              : type === 'BOARD'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {type.replace('_', ' ')}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCategories.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        {/* Popular Grades Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Grade</h2>
            <p className="text-gray-600">Find books for your specific grade level</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => {
              const gradeBookCount = books?.filter(book => book.grade === grade).length || 0;
              return (
                <Link
                  key={grade}
                  href={`/shop?grade=${grade}`}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
                >
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    Grade {grade}
                  </div>
                  <p className="text-sm text-gray-600">
                    {gradeBookCount} books
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
