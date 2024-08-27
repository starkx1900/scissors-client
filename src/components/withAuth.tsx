'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
      }
    }, [router]);

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        // TODO: Replace with a loading spinner
        return <p>Redirecting...</p>;
      }
    }

    return <WrappedComponent {...props} />;
  };
}
