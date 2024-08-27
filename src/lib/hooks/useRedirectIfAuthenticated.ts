import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import apiClient from '../api';

const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (apiClient.isAuthenticated()) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, [router]);

  return loading;
};

export default useRedirectIfAuthenticated;
