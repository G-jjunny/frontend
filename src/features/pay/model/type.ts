import type { UserPosition, ManagerPosition, Role } from './role';

export type WorkInfo = {
  totalWorkHours: number; // 총근무시간
  averageDailyHours: number; // 일 평균시간
  weeklyWorkHours: number; // 주간근무시간
  nightWorkHours: number; // 야간근무시간
  mainHolidayHours: number; // 주휴시간
  annualLeaveHours: number; // 연차시간
  holidayWorkHours: number; // 공휴일 근무시간
  laborDayWorkHours: number; // 근로자의날 근무시간
};

export type PayInfo = {
  weeklyPay: number; // 주간급여
  nightPay: number; // 야간급여
  mainHolidayPay: number; // 주휴수당
  annualLeavePay: number; // 연차수당
  holidayPay: number; // 공휴일 근무수당
  laborDayPay: number; // 근로자의날 근무수당
  totalPay: number; // 급여총액 - FE 계산
};

export type InsuranceInfo = {
  healthInsurance: number; // 건강보험
  careInsurance: number; // 요양보험
  employmentInsurance: number; // 고용보험
  nationalPension: number; // 국민연금
  unionFee: number; // 공제계 - FE 계산
};

export type UserPayroll = {
  name: string;
  hourlyPay: number; // 시급 !!
  role: Role; // 매니저급 또는 일반직급 구분
  position: UserPosition | ManagerPosition;
  work: WorkInfo;
  pay: PayInfo;
  insurance: InsuranceInfo;
  paymentAmount: number; // 총 지급액 - FE 계산
};

export type UserPositionProps = {
  data: UserPayroll[];
};
