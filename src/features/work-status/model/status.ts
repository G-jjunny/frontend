import type { WorkAction } from '@/entities/work-status/api/dto';

// 버튼 텍스트
export const BUTTON_LABELS: Record<WorkAction, string> = {
  CHECK_IN: '출근',
  CHECK_OUT: '퇴근',
  BREAK_START: '휴식',
  BREAK_END: '복귀',
} as const;

export const WORK_STATUS_ACTIONS: {
  action: WorkAction;
  label: string;
  buttonVariant: 'yellow' | 'destructive' | 'green' | 'blue';
  className?: string;
}[] = [
  {
    action: 'CHECK_IN',
    label: '출근',
    buttonVariant: 'green',
    className: 'bg-green-600 hover:bg-green-700',
  },
  {
    action: 'BREAK_START',
    label: '휴식',
    buttonVariant: 'yellow',
  },
  {
    action: 'BREAK_END',
    label: '복귀',
    buttonVariant: 'blue',
  },
  {
    action: 'CHECK_OUT',
    label: '퇴근',
    buttonVariant: 'destructive',
  },
];
