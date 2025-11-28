'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { FacilityCard } from '@/components/enumerator/FacilityCard';

export default function FacilitiesPage() {
  const router = useRouter();
  const { enumerator, facilities } = useEnumerator();
  const [villageFilter, setVillageFilter] = useState('All');

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
    }
  }, [enumerator, router]);

  if (!enumerator) {
    return null;
  }

  const uniqueVillages = Array.from(new Set(facilities.map((f) => f.village)));
  const villages = ['All', ...uniqueVillages];
  const filteredFacilities =
    villageFilter === 'All'
      ? facilities
      : facilities.filter((f) => f.village === villageFilter);

  return (
    <EnumeratorLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Facilities</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Village
          </label>
          <select
            value={villageFilter}
            onChange={(e) => setVillageFilter(e.target.value)}
            className="w-full md:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {villages.map((village) => (
              <option key={village} value={village}>
                {village}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredFacilities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No facilities found
            </div>
          ) : (
            filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))
          )}
        </div>
      </div>
    </EnumeratorLayout>
  );
}
