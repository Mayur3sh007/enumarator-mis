import Link from 'next/link';
import { Facility } from '@/types/enumerator';

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  const conditionColors = {
    Good: 'bg-green-100 text-green-700 border-green-300',
    Average: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Poor: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <Link href={`/enumerator/facilities/${facility.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{facility.name}</h3>
            <p className="text-sm text-gray-600">{facility.type}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{facility.village}</p>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${conditionColors[facility.condition]}`}
        >
          {facility.condition}
        </span>
      </div>
    </Link>
  );
}
