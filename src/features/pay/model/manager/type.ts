export interface PayrollData {
  name: string;
  position: string;
  wage: number;
  rrn: string;
  join_date: string;
  resign_date: string;
  last_work_day: string;

  bank_name: string;
  bank_account: string;
  email: string;

  total_work_days: number;
  total_work_hours: number;
  avg_daily_hours: number;

  day_hours: number;
  night_hours: number;
  weekly_allowance_hours: number;
  annual_leave_hours: number;
  holiday_hours: number;
  labor_day_hours: number;

  day_wage: number;
  night_wage: number;
  weekly_allowance_pay: number;
  annual_leave_pay: number;
  holiday_pay: number;
  labor_day_pay: number;

  gross_pay: number;

  insurance_health: number;
  insurance_care: number;
  insurance_employment: number;
  insurance_pension: number;

  total_deduction: number;
  net_pay: number;
}

interface Column<T> {
  key: keyof T;
  label: string;
  format?: (val: T[keyof T]) => string | number;
}

export function formatNumberOrDash(value: unknown): string {
  if (typeof value !== 'number') return '-';
  if (value === 0) return '-';
  return value.toLocaleString();
}

export interface ColumnSection<T> {
  key: string;
  title: string;
  columns: Column<T>[];
}

export interface ManagerPositionsProps {
  filteredData: PayrollData[];
}
