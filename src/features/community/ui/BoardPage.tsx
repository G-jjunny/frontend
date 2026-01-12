import { useMemo, useState } from 'react';

import Pagenation from './Pagenation';
import SearchInput from './SearchInput';

import type { BaseRow, BoardProps } from '../model/boardType';

export function BoardPage<T extends BaseRow>({
  title,
  icon,
  list,
  canWrite,
  category,
  ModalComponent,
  columns,
  pagination,
}: BoardProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(
    () =>
      !searchTerm
        ? list
        : list.filter((item) =>
            columns.some((col) => {
              const value = item[col.key];
              return (
                value != null && String(value).toLowerCase().includes(searchTerm.toLowerCase())
              );
            }),
          ),
    [searchTerm, list, columns],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput onSearch={setSearchTerm} placeholder="검색어를 입력하세요" />

          {canWrite && (
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-1 bg-mega text-white rounded"
            >
              작성
            </button>
          )}

          {isOpen && ModalComponent && (
            <ModalComponent
              onClose={() => setIsOpen(false)}
              category={category!}
              onSubmit={(data) => console.log(data)}
            />
          )}
        </div>
      </div>

      <table className="w-full border-t">
        <thead>
          <tr className="border-b text-sm text-gray-600">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`py-3 ${col.width ? `w-${col.width}` : ''} text-left`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredList.map((item, index) => (
            <tr key={item.id} className="border-b text-sm">
              {columns.map((col) => (
                <td key={String(col.key)} className="py-4">
                  {col.render ? col.render(item, index) : String(item[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <Pagenation
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onChangePage={pagination.onChangePage}
        />
      )}
    </div>
  );
}
