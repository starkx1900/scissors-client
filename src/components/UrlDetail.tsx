import {
  ArrowLeft,
  Calendar,
  Globe,
  Link2,
  MapPin,
  Monitor,
  MousePointerClick,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const UrlDetail = ({ url }: { url: any }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="rounded-full hover:bg-gray-200">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-1xl font-bold text-blue-600 ml-4 flex items-center">
          <Link2 className="mr-2" size={22} />
          URL Details
        </h1>
      </div>

      {/* URL Details */}
      <div className="space-y-2">
        <div className="text-xs md:text-sm flex items-center">
          <Link2 className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <span className="font-medium">Original URL:</span>
          {url.originalUrl}
        </div>

        <div className="text-xs md:text-sm flex items-center">
          <Link2 className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <span className="font-medium">Shortened URL:</span>
          <span className="ml-2">{url.shortenedUrl}</span>
        </div>

        <div className="text-xs md:text-sm flex items-center">
          <MousePointerClick
            className="text-blue-500 mr-2 flex-shrink-0"
            size={20}
          />
          <span className="font-medium">Clicks:</span>
          <span className="ml-2">{url.clicks}</span>
        </div>

        <div className="text-xs md:text-sm flex items-center">
          <Calendar className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <span className="font-medium">Created At:</span>
          <span className="ml-2">
            {new Date(url.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="text-xs md:text-sm flex items-center">
          <Monitor className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <span className="font-medium">Created By:</span>
          <span className="ml-2">{url.createdBy.name}</span>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Analytics</h2>
        {url.analytics.length > 0 ? (
          url.analytics.map((analytic: any) => (
            <div
              key={analytic._id}
              className="p-4 mb-4 border rounded-lg bg-gray-50"
            >
              <div className="text-xs md:text-sm flex items-center">
                <MapPin
                  className="text-blue-500 mr-2 flex-shrink-0"
                  size={18}
                />
                <span className="font-medium">Location:</span>
                <span className="ml-2 truncate">
                  {analytic.location || 'N/A'}
                </span>
              </div>

              <div className="text-xs md:text-sm flex items-center">
                <Monitor
                  className="text-blue-500 mr-2 flex-shrink-0"
                  size={18}
                />
                <span className="font-medium text-nowrap">User Agent:</span>
                <span className="ml-2 truncate">
                  {analytic.userAgent || 'N/A'}
                </span>
              </div>

              <div className="text-xs md:text-sm flex items-center">
                <Globe className="text-blue-500 mr-2 flex-shrink-0" size={18} />
                <span className="font-medium">IP Address:</span>
                <span className="ml-2">{analytic.ipAddress}</span>
              </div>

              <div className="text-xs md:text-sm flex items-center">
                <Calendar
                  className="text-blue-500 mr-2 flex-shrink-0"
                  size={18}
                />
                <span className="font-medium">Date:</span>
                <span className="ml-2">
                  {new Date(analytic.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No analytics data available.</p>
        )}
      </div>
    </div>
  );
};

export default UrlDetail;
