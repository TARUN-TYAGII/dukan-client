'use client';

import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-xl font-bold">SchoolBooks</h2>
                <p className="text-sm text-gray-400">Your Learning Partner</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              We provide quality educational books for students from Grade 1 to 12, 
              supporting various educational boards across India.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-white text-sm">Shop</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-white text-sm">Categories</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/shop?board=CBSE" className="text-gray-300 hover:text-white text-sm">CBSE Books</Link></li>
              <li><Link href="/shop?board=ICSE" className="text-gray-300 hover:text-white text-sm">ICSE Books</Link></li>
              <li><Link href="/shop?board=STATE_BOARD" className="text-gray-300 hover:text-white text-sm">State Board</Link></li>
              <li><Link href="/shop?subject=Mathematics" className="text-gray-300 hover:text-white text-sm">Mathematics</Link></li>
              <li><Link href="/shop?subject=Science" className="text-gray-300 hover:text-white text-sm">Science</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  123 Education Street, Learning City, India 110001
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@schoolbooks.com</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Business Hours</h4>
              <p className="text-gray-300 text-sm">
                Monday - Saturday: 9:00 AM - 7:00 PM<br />
                Sunday: 10:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SchoolBooks. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white text-sm">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
