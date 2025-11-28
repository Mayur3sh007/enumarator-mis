import { RiskLevel } from '@/types/enumerator';

interface RiskBadgeProps {
  risk: RiskLevel;
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const colors = {
    Green: 'bg-green-500',
    Yellow: 'bg-yellow-500',
    Red: 'bg-red-500',
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${colors[risk]}`} />
      <span className="text-xs text-gray-600">{risk}</span>
    </div>
  );
}
