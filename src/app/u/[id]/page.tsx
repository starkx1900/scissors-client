'use client';

import LoadingSpinner from '@/app/loading';
import UrlDetail from '@/components/UrlDetail';
import apiClient from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UrlNotFound from '../error';

const UrlDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [urlData, setUrlData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUrlDetails = async () => {
      try {
        const response = await apiClient.get(`/urls/${id}`);
        setUrlData((response as any).data);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUrlDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <UrlNotFound />;
  }

  return <UrlDetail url={urlData} />;
};

export default UrlDetailPage;
