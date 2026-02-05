import type { PayrollData } from './type';

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number | undefined ? K : never;
}[keyof T];

const SUM_FIELDS: NumberKeys<PayrollData>[] = [
  'total_work_days',
  'total_work_hours',
  'avg_daily_hours',

  'day_hours',
  'night_hours',
  'weekly_allowance_hours',
  'annual_leave_hours',
  'holiday_hours',
  'labor_day_hours',

  'day_wage',
  'night_wage',
  'weekly_allowance_pay',
  'annual_leave_pay',
  'holiday_pay',
  'labor_day_pay',

  'gross_pay',

  'insurance_health',
  'insurance_care',
  'insurance_employment',
  'insurance_pension',

  'total_deduction',
  'net_pay',
];

function calculateTotals(data: PayrollData[]): PayrollData {
  return data.reduce<PayrollData>((acc, cur) => {
    SUM_FIELDS.forEach((key) => {
      acc[key] = (acc[key] ?? 0) + (cur[key] ?? 0);
    });
    return acc;
  }, {} as PayrollData);
}

export default calculateTotals;
