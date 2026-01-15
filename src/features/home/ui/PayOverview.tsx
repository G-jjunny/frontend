import { useQuery } from '@tanstack/react-query';
import { Calendar, ChartLine, History } from 'lucide-react';

import { payQueries } from '@/entities/pay/api/queries';
import { normalizePayOverview } from '@/entities/pay/model/payOverview';

const PayOverview = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const { data = normalizePayOverview() } = useQuery({
    ...payQueries.payOverview(year, month),
    select: normalizePayOverview,
  });
  const payDate = `${year}-${month}-10`;

  const stats = [
    {
      icon: <Calendar />,
      label: '근무일수',
      value: `${data.total_work_days}일`,
    },
    {
      icon: <ChartLine />,
      label: '총 근무시간',
      value: `${data.total_work_hours}시간`,
    },
    {
      icon: <History />,
      label: '마지막 근무일',
      value: `${data.total_work_days}일`,
    },
  ];

  return (
    <div className=" flex flex-col gap-3">
      <div className=" text-2xl font-bold">
        {data?.net_pay.toLocaleString()} <span className="text-lg">원</span>
      </div>
      <div className=" flex justify-between items-center text-sm">
        <p className=" text-mega-gray-light">지급일</p> <p className="">{payDate}</p>
      </div>
      <div className=" h-px bg-border" />
      <div className=" flex justify-between items-center">
        <p className="text-sm text-mega-gray-light">월 급여</p>{' '}
        <h4>{data?.gross_pay.toLocaleString()}</h4>
      </div>
      <div className=" flex justify-between items-center">
        <p className="text-sm text-mega-gray-light">공제계</p>{' '}
        <h4>{data?.total_deduction.toLocaleString()}</h4>
      </div>
      <div className=" flex justify-between">
        {stats.map(({ icon, label, value }) => (
          <div key={label} className="flex flex-col gap-6 items-center">
            <div className="flex gap-2 items-center">
              {icon}
              <p className="text-xs">{label}</p>
            </div>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayOverview;
