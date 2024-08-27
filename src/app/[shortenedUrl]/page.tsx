'use client';

import apiClient from '@/lib/api';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const RedirectPage = ({ params }: { params: { shortenedUrl: string } }) => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const response = await apiClient.get(
          `/urls/redirect/${params.shortenedUrl}`
        );
        const originalUrl = (response as any).originalUrl;
        window.location.href = originalUrl;
      } catch (error) {
        console.error('Redirection failed', error);
        redirect('/error');
      }
    };

    handleRedirect();
  }, [params.shortenedUrl]);

  return null;
};

export default RedirectPage;
