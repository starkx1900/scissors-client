'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UrlCard from '@/components/UrlCard';
import apiClient from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import LoadingSpinner from './loading';

const UrlSchema = z.object({
  originalUrl: z.string(),
  customAlias: z.string().min(5).optional(),
});

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
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

  const form = useForm<z.infer<typeof UrlSchema>>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      originalUrl: '',
      customAlias: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof UrlSchema>) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/urls/shorten', {
        originalUrl: data.originalUrl,
        customUrl: data.customAlias,
      });
      toast.success((response as any).message);
      form.reset({ originalUrl: '', customAlias: '' });
      const updatedUrls = await apiClient.get(`/urls`);
      setUrls((updatedUrls as any).data);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-around text-center p-4 lg:p-24">
        <div>
          <h1 className="font-extrabold text-4xl md:text-6xl text-orange-600">
            Shorten your <span className="text-blue-500">looooong</span> urls
            like never before!
          </h1>
          <p>
            Copy your long boring url. Paste it below.
            <br /> Then 💥 You got it, right?
          </p>
        </div>

        <div className="w-full max-w-lg my-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="originalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your long Url</FormLabel>
                    <FormControl>
                      <Input placeholder="www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customAlias"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter a custom alias" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                size={'lg'}
                type="submit"
                className="w-full max-w-sm"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="text-white-500 animate-spin" />
                ) : (
                  'Shorten URL'
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="font-bold text-3xl md:text-5xl text-blue-600 my-2">
            Hoho!
          </h2>
          <p className="text-sm">
            Here are your shortened URLs! Now start rick-rolling your friends 😎
          </p>
          <div className="h-full flex flex-wrap justify-center items-center gap-3 sm:gap-5 py-5">
            {urls.length === 0 ? (
              <p className="text-lg text-gray-600">
                No URLs yet? 😮 Start by creating a new one!
              </p>
            ) : (
              <>
                {urls.map((url: any) => (
                  <UrlCard key={url._id} url={url} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
