export const ROLE = {
  MANAGER: 'manager',
  USER: 'user',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];

export const USER_POSITIONS = ['리더', '크루', '미화'] as const;
export const MANAGER_POSITIONS = ['점장', '바이저', '매니저'] as const;

export type UserPosition = (typeof USER_POSITIONS)[number];
export type ManagerPosition = (typeof MANAGER_POSITIONS)[number];

export type Position = UserPosition | ManagerPosition;

// user position 타입 가드
export function isUserPosition(value: unknown): value is UserPosition {
  return typeof value === 'string' && (USER_POSITIONS as readonly string[]).includes(value);
}

// manager position 타입 가드 → 아직 미사용 주석처리
// export function isManagerPosition(value: unknown): value is ManagerPosition {
//     return typeof value === 'string' && (MANAGER_POSITIONS as readonly string[]).includes(value)
// }
