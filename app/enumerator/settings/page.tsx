'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { enumerator, setEnumerator } = useEnumerator();

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
    }
  }, [enumerator, router]);

  if (!enumerator) {
    return null;
  }

  const handleLogout = () => {
    setEnumerator(null);
    router.push('/enumerator/login');
  };

  return (
    <EnumeratorLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Enumerator Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">ID</p>
              <p className="font-medium text-gray-900">{enumerator.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{enumerator.name}</p>
            </div>
            {enumerator.block && (
              <div>
                <p className="text-sm text-gray-600">Block</p>
                <p className="font-medium text-gray-900">{enumerator.block}</p>
              </div>
            )}
            {enumerator.district && (
              <div>
                <p className="text-sm text-gray-600">District</p>
                <p className="font-medium text-gray-900">{enumerator.district}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Preferences
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-sync when online</p>
              <p className="text-sm text-gray-600">
                Automatically sync data when connected
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log out / Switch Enumerator
        </Button>
      </div>
    </EnumeratorLayout>
  );
}
