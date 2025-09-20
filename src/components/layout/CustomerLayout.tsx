'use client';

import CustomerNavbar from './CustomerNavbar';
import Footer from './Footer';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
