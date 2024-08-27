'use client';
import Link from 'next/link';

export default function UrlNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Page not Found</h1>
      <p className="mt-2 text-gray-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go back home
      </Link>
    </div>
  );
}
