import { payColumns, insuranceColumns } from '../model/user/dataColumns';

import type { UserPositionProps } from '../model/user/type';

export default function UserPosition({ data }: UserPositionProps) {
  return (
    <div className="flex justify-center pb-10">
      <div className="w-1/2 border border-gray-400 rounded-md bg-white shadow-sm p-4">
        <div className="text-2xl font-bold pb-5 pt-2 text-center">급여 명세서</div>
        <div className="flex justify-end mb-5 mr-2 text-gray-500 text-sm">
          지급일 <span className="font-bold px-2"> | </span> {data.pay_date}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-span-2 border p-3 rounded bg-gray-50 text-center">
            <div className="font-semibold">{data.name}</div>
          </div>
          <div className="border p-3 rounded bg-gray-50 text-center text-sm">{data.birth_date}</div>
        </div>

        <Section title="급여">
          {payColumns.map((c) => (
            <Item
              key={c.key}
              label={c.label}
              value={data[c.key]}
              span={c.key === 'gross_pay' ? 'full' : 'default'}
            />
          ))}
        </Section>

        <Section title="공제">
          {insuranceColumns.map((c) => (
            <Item
              key={c.key}
              label={c.label}
              value={data[c.key]}
              span={c.key === 'total_deduction' ? 'full' : 'quarter'}
            />
          ))}
        </Section>

        <div className="border border-mega-blue bg-mega-light-blue p-4 mb-2 rounded-md text-center">
          <div className="font-bold text-lg">실지급액</div>
          <div className="text-xl font-extrabold text-mega-blue">
            {data.net_pay?.toLocaleString()} 원
          </div>
        </div>
      </div>
    </div>
  );
}

// 제목 + 내용 컨테이너
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="bg-mega-light-blue font-semibold px-3 py-2 border rounded-t text-center">
        {title}
      </div>
      <div className="flex flex-wrap border border-t-0 rounded-b">{children}</div>
    </div>
  );
}

// 급여 , 공제 공통
function Item({
  label,
  value,
  span = 'default',
}: {
  label: string;
  value?: number;
  span?: 'default' | 'full' | 'quarter';
}) {
  const widthClass = span === 'full' ? 'w-full' : span === 'quarter' ? 'w-1/4' : 'w-1/2 md:w-1/3';

  return (
    <div className={`${widthClass} p-2 border-r border-b text-center`}>
      <div className="text-sm text-gray-700">{label}</div>
      <div className="font-semibold">{value?.toLocaleString()} 원</div>
    </div>
  );
}
