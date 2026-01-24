import { LayoutGrid, DollarSign, MessageSquare } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import { ROUTES } from '@/shared/constants/routes';

export type NavItemConfig = {
  key: string;
  label: string;
  path: string;
  icon: LucideIcon;
  authRequired?: boolean;
  exact?: boolean;
};

export const NAV_ITEMS: NavItemConfig[] = [
  {
    key: 'dashboard',
    label: '대시보드',
    path: ROUTES.ROOT,
    icon: LayoutGrid,
    authRequired: true,
    exact: true,
  },
  {
    key: 'pay',
    label: '급여',
    path: ROUTES.PAY,
    icon: DollarSign,
    authRequired: true,
  },
  //   {
  //     key: 'calendar',
  //     label: '스케줄',
  //     path: '/calendar',
  //     icon: Calendar,
  //     authRequired: true,
  //   },
  {
    key: 'community',
    label: '커뮤니티',
    path: ROUTES.COMMUNITY,
    icon: MessageSquare,
    authRequired: false,
  },
];
