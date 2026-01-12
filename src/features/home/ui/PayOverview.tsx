import { useQuery } from '@tanstack/react-query';

import { payQueries } from '@/entities/pay/api/queries';

const PayOverview = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const { data } = useQuery(payQueries.payOverview(year, month));
  const payDate = `${year}-${month}-10`;

  console.log(data);
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
        <p className="text-sm text-mega-gray-light">월 급여</p> <h4>{data?.gross_pay}</h4>
      </div>
      <div className=" flex justify-between items-center">
        <p className="text-sm text-mega-gray-light">공제계</p> <h4>{data?.total_deduction}</h4>
      </div>
    </div>
  );
};

export default PayOverview;
