import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scissors',
  description: 'An URL shortening app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Suspense>
            <Navbar />
            <main className="w-full max-w-5xl">{children}</main>
            <Toaster />
          </Suspense>
        </body>
      </html>
    </AuthProvider>
  );
}
