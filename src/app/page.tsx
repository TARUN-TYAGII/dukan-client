'use client';

import CustomerLayout from '@/components/layout/CustomerLayout';
import { useBooks } from '@/hooks/useBooks';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, Star, Truck, Shield, Headphones, BookOpen, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { data: books, isLoading } = useBooks();
  const featuredBooks = books?.slice(0, 8) || [];

  return (
    <CustomerLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Your One-Stop Shop for 
                <span className="text-emerald-400"> School Books</span>
              </h1>
              <p className="text-xl mb-8 text-slate-300">
                Find textbooks for all grades and educational boards. Quality books at affordable prices 
                with fast delivery across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center"
                >
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/categories"
                  className="border-2 border-slate-300 text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-300 hover:text-slate-900 transition-colors flex items-center justify-center"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{books?.length || 0}+</div>
                    <div className="text-sm">Books Available</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm">Customer Rating</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Truck className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">24h</div>
                    <div className="text-sm">Fast Delivery</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm">Authentic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Free Shipping</h3>
              <p className="text-slate-600">Free delivery on orders above ₹500 across India</p>
            </div>
            <div className="text-center">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">100% Authentic</h3>
              <p className="text-slate-600">All books are genuine and sourced directly from publishers</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">24/7 Support</h3>
              <p className="text-slate-600">Get help anytime with our dedicated customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Books</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our most popular textbooks trusted by students and teachers across India
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
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
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.open(`tel:+919876543210`, '_self')}
                        className="flex-1 bg-slate-700 text-white py-2 px-3 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center text-sm"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call +91 7015214941
                      </button>
                      {/* <button 
                        onClick={() => window.open(`https://wa.me/919876543210?text=Hi, I'm interested in "${book.title}" by ${book.author}. Price: ${formatCurrency(book.price)}`, '_blank')}
                        className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center text-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        WhatsApp
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors inline-flex items-center"
            >
              View All Books <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Boards */}
      {/* <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Shop by Educational Board</h2>
            <p className="text-slate-600">Find books for your specific educational board</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'CBSE', count: '500+', color: 'bg-slate-100 text-slate-800' },
              { name: 'ICSE', count: '300+', color: 'bg-emerald-100 text-emerald-800' },
              { name: 'State Board', count: '400+', color: 'bg-sky-100 text-sky-800' },
              { name: 'IGCSE', count: '150+', color: 'bg-amber-100 text-amber-800' },
              { name: 'IB', count: '100+', color: 'bg-rose-100 text-rose-800' },
              { name: 'NCERT', count: '200+', color: 'bg-violet-100 text-violet-800' },
            ].map((board) => (
              <Link
                key={board.name}
                href={`/shop?board=${board.name.replace(' ', '_')}`}
                className="text-center p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white"
              >
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold mb-2 ${board.color}`}>
                  {board.name}
                </div>
                <p className="text-slate-600 text-sm">{board.count} books</p>
              </Link>
            ))}
          </div>
        </div>
      </section> */}
    </CustomerLayout>
  );
}