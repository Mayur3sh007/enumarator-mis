'use client';

import { useEnumerator } from '@/contexts/EnumeratorContext';
import { useState, useEffect } from 'react';

export function TopBar() {
  const { enumerator } = useEnumerator();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">PM-AJAY</h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-xs text-gray-600">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        {enumerator && (
          <div className="text-xs text-gray-600">
            <span className="font-medium">{enumerator.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
