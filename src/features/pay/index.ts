export type {
  WorkInfo,
  PayInfo,
  InsuranceInfo,
  UserPayroll,
  UserPositionProps,
} from '@/features/pay/model/type';

export { default as UserPosition } from '@/features/pay/ui/UserPosition';
export { default as ManagerPositions } from '@/features/pay/ui/ManagerPosition';

export { default as mockPayroll } from '@/features/pay/mock/payMock';

export { default as calculateTotals } from '@/features/pay/model/manager/calculateTotals';
