export interface UserPayroll {
  name: string;
  birth_date: string;
  pay_date: string;

  day_wage: number;
  night_wage: number;
  weekly_allowance_pay: number;
  annual_leave_pay: number;
  holiday_pay: number;
  extra_pay: number;

  gross_pay: number;

  insurance_health: number;
  insurance_care: number;
  insurance_employment: number;
  insurance_pension: number;

  total_deduction: number;

  net_pay: number;
}

export interface UserPositionProps {
  data: UserPayroll;
}

export type UserPayrollNumberKeys =
  | 'day_wage'
  | 'night_wage'
  | 'weekly_allowance_pay'
  | 'annual_leave_pay'
  | 'holiday_pay'
  | 'extra_pay'
  | 'gross_pay'
  | 'insurance_health'
  | 'insurance_care'
  | 'insurance_employment'
  | 'insurance_pension'
  | 'total_deduction'
  | 'net_pay';
