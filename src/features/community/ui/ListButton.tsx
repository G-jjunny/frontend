import { Link, useLocation } from 'react-router';

import type { LucideIcon } from 'lucide-react';

interface ListButtonProps {
  label: string;
  to: string;
  count?: number;
  icon?: LucideIcon;
  color?: string;
  activeColor?: string;
}

export default function ListButton({
  label,
  to,
  count,
  icon: Icon,
  color = 'border border-gray-200 bg-white',
  activeColor,
}: ListButtonProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(`/community/${to}`);

  return (
    <Link to={to} className="flex items-center cursor-pointer">
      <div
        className={`
          flex gap-2 text-xs sm:text-10px px-4 py-2 rounded-md
          ${isActive ? `text-white ${activeColor}` : color}
        `}
      >
        {Icon && <Icon size={16} className={isActive ? 'text-white' : 'text-gray-600'} />}
        {label}
        {count !== undefined && (
          <span
            className={
              isActive
                ? 'ml-1 px-1 py-0.5 text-[10px] text-center rounded-full bg-white opacity-60 text-gray-700'
                : 'ml-1 px-1 py-0.5 text-[10px] text-center rounded-full bg-gray-200 text-gray-700'
            }
          >
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}
