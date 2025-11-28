import { HouseholdSource } from '@/types/enumerator';

interface SourceBadgeProps {
  source: HouseholdSource;
}

export function SourceBadge({ source }: SourceBadgeProps) {
  const colors = {
    AI: 'bg-blue-100 text-blue-700 border-blue-300',
    Manual: 'bg-purple-100 text-purple-700 border-purple-300',
    Paper: 'bg-orange-100 text-orange-700 border-orange-300',
  };

  const labels = {
    AI: 'AI Draft',
    Manual: 'Manual',
    Paper: 'Paper',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colors[source]}`}
    >
      {labels[source]}
    </span>
  );
}
