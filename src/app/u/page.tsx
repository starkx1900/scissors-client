'use client';

import LoadingSpinner from '@/app/loading';
import UrlCard from '@/components/UrlCard';
import apiClient from '@/lib/api';
import { useEffect, useState } from 'react';

const UrlsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [urls, setUrls] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await apiClient.get(`/urls`);
        setUrls((response as any).data);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (urls.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">No URLs found. Start by creating a new one!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {urls.map((url: any) => (
        <UrlCard key={url._id} url={url} />
      ))}
    </div>
  );
};

export default UrlsPage;
