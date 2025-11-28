'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { HouseholdCard } from '@/components/enumerator/HouseholdCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { HouseholdStatus, HouseholdSource } from '@/types/enumerator';

export default function DashboardPage() {
  const router = useRouter();
  const { enumerator, households } = useEnumerator();
  const [statusFilter, setStatusFilter] = useState<HouseholdStatus | 'All'>('All');
  const [sourceFilter, setSourceFilter] = useState<HouseholdSource | 'All'>('All');

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
    }
  }, [enumerator, router]);

  if (!enumerator) {
    return null;
  }

  const filteredHouseholds = households.filter((h) => {
    if (statusFilter !== 'All' && h.status !== statusFilter) return false;
    if (sourceFilter !== 'All' && h.source !== sourceFilter) return false;
    return true;
  });

  return (
    <EnumeratorLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Worklist</h1>
          <Link href="/enumerator/households/new">
            <Button size="sm" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New Household</span>
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as HouseholdStatus | 'All')
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="Draft">Draft</option>
                <option value="Verified">Verified</option>
                <option value="Pending Docs">Pending Docs</option>
                <option value="Not Eligible">Not Eligible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <select
                value={sourceFilter}
                onChange={(e) =>
                  setSourceFilter(e.target.value as HouseholdSource | 'All')
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="AI">AI Draft</option>
                <option value="Manual">Manual</option>
                <option value="Paper">Paper</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHouseholds.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No households found matching your filters
            </div>
          ) : (
            filteredHouseholds.map((household) => (
              <HouseholdCard key={household.id} household={household} />
            ))
          )}
        </div>
      </div>
    </EnumeratorLayout>
  );
}
