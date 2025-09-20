import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookShop Admin - School Book Management System",
  description: "Manage your school book inventory, orders, and customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
