'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Settings,
  Home,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Books', href: '/admin/books', icon: BookOpen },
  { name: 'Categories', href: '/admin/categories', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: UserCheck },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <h1 className="text-xl font-bold text-white">BookShop Admin</h1>
      </div>
      
      <div className="px-4 py-2 bg-blue-50 border-b border-blue-200">
        <Link
          href="/"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Store
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
