import { useMemo } from 'react';

import { calculateTotals } from '../index';
import managerColumns from '../model/manager/dataColumns';

import type { ColumnSection, ManagerPositionsProps, PayrollData } from '../model/manager/type';

export default function ManagerPositions({ filteredData }: ManagerPositionsProps) {
  const totals = useMemo(() => calculateTotals(filteredData), [filteredData]);
  const defaultStyle = 'border border-gray-200 p-2 text-[10px] text-center';

  const sections: ColumnSection<PayrollData>[] = [
    { key: 'personal', title: '인적 정보', columns: managerColumns.slice(0, 7) },
    { key: 'contact', title: '계좌/연락처', columns: managerColumns.slice(7, 10) },
    { key: 'work_summary', title: '근무 요약', columns: managerColumns.slice(10, 13) },
    { key: 'work_hours', title: '근무 시간', columns: managerColumns.slice(13, 19) },
    { key: 'salary', title: '급여', columns: managerColumns.slice(19, 26) },
    { key: 'deduction', title: '공제', columns: managerColumns.slice(26, 32) },
  ];

  return (
    <div className="overflow-auto border border-gray-300 w-full">
      <table className="min-w-[2400px] border-separate border-spacing-0 text-sm table-fixed">
        <thead>
          <tr className="text-[10px] font-bold text-center sticky top-0 z-40 bg-gray-100">
            <th rowSpan={2} className={`${defaultStyle} sticky left-0 z-50 bg-gray-300 border-r`}>
              이름
            </th>

            <th colSpan={6} className={`${defaultStyle} bg-gray-100`}>
              인적 정보
            </th>

            <th colSpan={3} className={`${defaultStyle} bg-gray-100`}>
              계좌/연락처
            </th>

            {sections.slice(2).map((section) => (
              <th
                key={section.key}
                colSpan={section.columns.length}
                className={`${defaultStyle} bg-gray-100`}
              >
                {section.title}
              </th>
            ))}

            <th
              rowSpan={2}
              className={`${defaultStyle} bg-mega text-white`}
              style={{ minWidth: '120px' }}
            >
              총 지급액
            </th>
          </tr>

          <tr className="text-[10px] font-semibold text-center bg-gray-50">
            {sections.map((section, secIdx) =>
              section.columns.map((col, colIdx) => {
                if (secIdx === 0 && colIdx === 0) return null;
                return (
                  <th key={`${section.key}-${col.key}`} className={`${defaultStyle} bg-gray-100`}>
                    {col.label}
                  </th>
                );
              }),
            )}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((user, idx) => (
            <tr key={idx} className="text-[10px]">
              {sections.map((section, secIdx) =>
                section.columns.map((col, colIdx) => {
                  const value = user[col.key];
                  const isNameCol = secIdx === 0 && colIdx === 0;
                  return (
                    <td
                      key={`${section.key}-${col.key}-${idx}`}
                      className={`${defaultStyle} ${
                        isNameCol ? 'bg-gray-300 sticky left-0 z-30 border-r' : ''
                      }`}
                    >
                      {col.format ? col.format(value) : value}
                    </td>
                  );
                }),
              )}
              <td className={`${defaultStyle} bg-purple-100 font-semibold`}>
                {user.net_pay?.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="text-[10px] font-bold text-center bg-mega-gray text-white">
            {/* 이름 컬럼 (sticky 유지) */}
            <td className={`${defaultStyle} sticky left-0 z-40 bg-white`} />

            {/* 합계 라인 9칸 */}
            <td colSpan={9} className={`${defaultStyle} border-r`}>
              합계
            </td>

            {sections.slice(2).map((section) =>
              section.columns.map((col) => {
                const value = totals[col.key];
                return (
                  <td key={`${section.key}-${col.key}-total`} className={defaultStyle}>
                    {col.format ? col.format(value) : value}
                  </td>
                );
              }),
            )}

            <td className={`${defaultStyle} bg-mega text-white`}>
              {totals.net_pay?.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
