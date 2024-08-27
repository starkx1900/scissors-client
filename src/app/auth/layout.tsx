import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Authentication',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center items-center min-h-screen px-2">
      {children}
    </main>
  );
}
