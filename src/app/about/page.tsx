'use client';

import CustomerLayout from '@/components/layout/CustomerLayout';
import { BookOpen, Users, Award, Truck, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About SchoolBooks</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in education, providing quality textbooks and learning materials 
            for students across India since 2010.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              To make quality education accessible to every student by providing authentic textbooks 
              at affordable prices with exceptional service and fast delivery across India.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Authentic Books</h3>
            <p className="text-gray-600">
              All our books are sourced directly from publishers, ensuring 100% authenticity and quality.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery service across India with free shipping on orders above ₹500.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              Our dedicated customer support team is always ready to help you with your educational needs.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-gray-300">Years of Service</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-gray-300">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-gray-300">Books Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Schools Served</div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                SchoolBooks was founded in 2010 with a simple vision: to make quality educational 
                books accessible to every student across India. What started as a small bookstore 
                has grown into one of India's most trusted online destinations for school textbooks.
              </p>
              <p>
                We understand the importance of having the right books for academic success. That's 
                why we've partnered with leading publishers and educational boards to bring you 
                authentic textbooks for CBSE, ICSE, State Boards, and international curricula.
              </p>
              <p>
                Today, we serve thousands of students, parents, and schools across the country, 
                and we're proud to be part of India's educational journey.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <BookOpen className="w-24 h-24 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Empowering Education
            </h3>
            <p className="text-gray-600">
              Every book we deliver is a step towards building a brighter future for our students.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">Genuine books from authorized publishers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">Knowledgeable team to help with your needs</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Truck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Pan India Delivery</h3>
              <p className="text-sm text-gray-600">Serving students across all states</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Comprehensive Catalog</h3>
              <p className="text-sm text-gray-600">Books for all grades and subjects</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of students who trust SchoolBooks for their educational needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Books
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
