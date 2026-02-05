import type { WorkAction } from '@/entities/work-status/api/dto';

export const STATUS_TYPES = {
  ATTENDANCE: 'attendance',
  REST: 'rest',
} as const;

export type StatusType = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];

// 각 버튼별 액션 매핑
export const BUTTON_ACTIONS = {
  [STATUS_TYPES.ATTENDANCE]: {
    PRIMARY: 'CHECK_IN' as WorkAction,
    SECONDARY: 'CHECK_OUT' as WorkAction,
  },
  [STATUS_TYPES.REST]: {
    PRIMARY: 'BREAK_START' as WorkAction,
    SECONDARY: 'BREAK_END' as WorkAction,
  },
} as const;

// 버튼 텍스트
export const BUTTON_LABELS = {
  CHECK_IN: '출근',
  CHECK_OUT: '퇴근',
  BREAK_START: '휴식',
  BREAK_END: '복귀',
} as const;
