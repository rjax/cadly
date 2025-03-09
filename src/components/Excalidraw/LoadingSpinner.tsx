import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
    </div>
  );
};