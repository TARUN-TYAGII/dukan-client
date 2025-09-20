'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Heart,
  Phone,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function CustomerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span>info@schoolbooks.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Free shipping on orders above ₹500!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ramphal Kitab ghar</h1>
              <p className="text-xs text-gray-500">Your Learning Partner</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for books, authors, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-600 hover:text-blue-600">
              <Heart className="w-6 h-6" />
              <span className="ml-1 text-sm">Wishlist</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="ml-1 text-sm hidden sm:block">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            <Link href="/admin" className="flex items-center text-gray-600 hover:text-blue-600">
              <User className="w-6 h-6" />
              <span className="ml-1 text-sm hidden sm:block">Admin</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 pb-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-blue-600',
                  isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            {/* Mobile search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Mobile navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block py-2 text-base font-medium',
                      isActive ? 'text-blue-600' : 'text-gray-700'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
