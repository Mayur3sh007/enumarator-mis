'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { FollowUpType } from '@/types/enumerator';

export default function FollowUpsPage() {
  const router = useRouter();
  const { enumerator, followUps, resolveFollowUp } = useEnumerator();
  const [typeFilter, setTypeFilter] = useState<FollowUpType | 'All'>('All');

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
    }
  }, [enumerator, router]);

  if (!enumerator) {
    return null;
  }

  const activeFollowUps = followUps.filter((f) => !f.resolved);
  const filteredFollowUps =
    typeFilter === 'All'
      ? activeFollowUps
      : activeFollowUps.filter((f) => f.type === typeFilter);

  return (
    <EnumeratorLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Follow-ups</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setTypeFilter('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              typeFilter === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {['Docs Pending', 'Asset Follow-up', 'Training Follow-up'].map(
            (type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type as FollowUpType)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>

        <div className="space-y-4">
          {filteredFollowUps.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No pending follow-ups
            </div>
          ) : (
            filteredFollowUps.map((followUp) => (
              <div
                key={followUp.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {followUp.name}
                    </h3>
                    <p className="text-sm text-gray-600">{followUp.village}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-300">
                    {followUp.type}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/enumerator/households/${followUp.householdId}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      Open
                    </Button>
                  </Link>
                  <Button
                    onClick={() => resolveFollowUp(followUp.id)}
                    className="gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Resolved
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </EnumeratorLayout>
  );
}
