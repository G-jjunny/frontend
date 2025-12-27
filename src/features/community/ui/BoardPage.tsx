import { useMemo, useState } from 'react';

import { usePagenation } from '../hooks/usePagenation';

import Pagenation from './Pagenation';
import SearchInput from './SearchInput';
import PostCreateModal from './WriteModal';

export interface BaseRow {
  id: number | string;
}

export interface Column<T extends BaseRow> {
  header: string;
  key: keyof T;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface BoardProps<T extends BaseRow> {
  title: string;
  icon?: React.ReactNode;
  list: T[];
  canWrite?: boolean;
  onSubmit?: (data: unknown) => void;
  ModalComponent?: React.ComponentType<{
    onClose: () => void;
    onSubmit: (data: unknown) => void;
  }>;
  columns: Column<T>[];
}

export function BoardPage<T extends BaseRow>({
  title,
  icon,
  list,
  canWrite,
  // onSubmit,
  // ModalComponent,
  columns,
}: BoardProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => 
  !searchTerm 
    ? list 
    : list.filter(item => 
        columns.some(col => {
          const value = item[col.key];
          return value != null && String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      ), 
  [searchTerm, list, columns]
);

  const { currentPage, totalPages, currentItems, setCurrentPage } = usePagenation({
    items: filteredList,
    itemsPerPage: 10,
  });

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

          {isOpen && (
            <PostCreateModal onClose={() => setIsOpen(false)} />
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
          {currentItems.map((item, index) => (
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

      <Pagenation totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
}
