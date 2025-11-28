import Link from 'next/link';
import { Household } from '@/types/enumerator';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';
import { RiskBadge } from './RiskBadge';

interface HouseholdCardProps {
  household: Household;
}

export function HouseholdCard({ household }: HouseholdCardProps) {
  return (
    <Link href={`/enumerator/households/${household.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{household.name}</h3>
            <p className="text-sm text-gray-600">{household.village}</p>
          </div>
          {household.riskLevel && <RiskBadge risk={household.riskLevel} />}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <SourceBadge source={household.source} />
          <StatusBadge status={household.status} />
        </div>
      </div>
    </Link>
  );
}
