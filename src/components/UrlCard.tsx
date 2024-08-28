import apiClient from '@/lib/api';
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  MousePointerClick,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const UrlCard = ({ url }: { url: any }) => {
  const handleCopy = () => {
    const redirectUrl = `${window.location.origin}/${url.shortenedUrl}`;
    navigator.clipboard.writeText(redirectUrl);
    toast.success('URL copied to clipboard');
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/urls/${url._id}`);
      toast.success('URL deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete the URL');
    }
  };

  const handleRedirect = async () => {
    try {
      const response = await apiClient.get(
        `/urls/redirect/${url.shortenedUrl}`
      );
      window.open((response as any).originalUrl, '_blank');
    } catch (error: any) {
      toast.error('Failed to redirect to the URL');
    }
  };

  return (
    <div className="max-w-52 group rounded-lg border border-slate-300 p-2 transition-colors hover:border-gray-300 hover:bg-gray-100">
      <h2 className="mb-3 text-lg font-semibold">
        <span
          onClick={handleRedirect}
          className="flex items-center cursor-pointer"
        >
          {url.shortenedUrl}{' '}
          <ExternalLink
            size={20}
            className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{url.originalUrl}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center text-nowrap">
          <MousePointerClick className="mr-1" /> {url.clicks} clicks
        </span>
        <div className="flex items-center space-x-4">
          <Copy
            size={20}
            className="cursor-pointer text-blue-500"
            onClick={handleCopy}
          />
          <Trash2
            size={20}
            className="cursor-pointer text-red-400"
            onClick={handleDelete}
          />
          <Link href={`/u/${url._id}`}>
            <MoreHorizontal
              size={20}
              className="cursor-pointer text-gray-500"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
