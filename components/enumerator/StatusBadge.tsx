import { HouseholdStatus } from '@/types/enumerator';

interface StatusBadgeProps {
  status: HouseholdStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    Draft: 'bg-gray-100 text-gray-700 border-gray-300',
    Verified: 'bg-green-100 text-green-700 border-green-300',
    'Pending Docs': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Not Eligible': 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}
    >
      {status}
    </span>
  );
}
