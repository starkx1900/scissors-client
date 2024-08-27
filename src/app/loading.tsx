import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <main className="flex justify-center items-center min-h-screen px-2">
      <div>
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    </main>
  );
};

export default LoadingSpinner;
