import { useState } from 'react';

import { mockUserPayroll } from '../../features/pay/mock/payUserMock';
import UserPosition from '../../features/pay/ui/UserPosition';
import { DropdownSelect } from '../../shared/components/ui/dropdown-select';

import type { PayrollData } from '@/features/pay/model/manager/type';

import { mockPayroll, ManagerPositions } from '@/features/pay';
import { ROLE, type Role } from '@/features/pay/model/role';
import { isUserPosition } from '@/features/pay/model/role';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

export default function PayPage() {
  const [role, setRole] = useState<Role>(ROLE.USER);

  // 테스트용 user 설정
  const [currentUserName, setCurrentUserName] = useState('김하늘');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const periodOptions: Array<'연도' | '반기' | '월'> = ['연도', '반기', '월'];
  const halfOptions = ['상반기 (1~6월)', '하반기 (7~12월)'];

  const startYear = 2020;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, year) => startYear + year,
  ).reverse();

  const months = Array.from({ length: 12 }, (_, month) => month + 1);

  const [periodType, setPeriodType] = useState<'연도' | '반기' | '월'>('월');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedHalf, setSelectedHalf] = useState('상반기 (1~6월)');

  // let filteredData = [];

  const filteredData: PayrollData[] =
    role === ROLE.MANAGER
      ? mockPayroll.filter((user: PayrollData) => isUserPosition(user.position))
      : mockPayroll.filter((user: PayrollData) => user.name === currentUserName);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-2xl font-bold">급여현황</div>
      <div>
        <div className="flex gap-2">
          <Button
            className={`px-3 py-1 border rounded ${
              role === ROLE.MANAGER ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setRole(ROLE.MANAGER)}
          >
            관리직 로그인
          </Button>

          <Button
            className={`px-3 py-1 border rounded ${
              role === ROLE.USER ? 'bg-green-900 text-white' : ''
            }`}
            onClick={() => setRole(ROLE.USER)}
          >
            일반직 로그인
          </Button>
        </div>
      </div>

      <Card variant="blueMain">
        <CardContent className="flex flex-col md:flex-row md:items-center gap-5 w-full">
          <DropdownSelect
            label="조회 기준"
            items={periodOptions}
            value={periodType}
            onChange={(v) => setPeriodType(v)}
          />

          <DropdownSelect
            label="급여 연도"
            items={years}
            value={selectedYear}
            onChange={setSelectedYear}
          />

          {periodType === '반기' && (
            <DropdownSelect
              label="급여 반기"
              items={halfOptions}
              value={selectedHalf}
              onChange={setSelectedHalf}
            />
          )}

          {periodType === '월' && (
            <DropdownSelect
              label="급여 월"
              items={months}
              value={selectedMonth}
              onChange={setSelectedMonth}
            />
          )}
        </CardContent>
      </Card>

      {role === ROLE.USER && <UserPosition data={mockUserPayroll} />}
      {role === ROLE.MANAGER && filteredData.length > 0 && (
        <ManagerPositions filteredData={filteredData} />
      )}
    </div>
  );
}
