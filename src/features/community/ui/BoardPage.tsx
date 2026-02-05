import { useMemo, useState } from 'react';

import { BoardCard } from './BoardCard';
import Pagenation from './Pagenation';
import SearchInput from './SearchInput';

import type { BoardPost, BoardProps } from '../model/boardType';

import { Button } from '@/shared/components/ui/button';

export function BoardPage<T extends BoardPost>({
  list,
  canWrite,
  category,
  ModalComponent,
  pagination,
  renderBadge,
}: BoardProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(
    () =>
      !searchTerm
        ? list
        : list.filter((item) =>
            Object.values(item).some(
              (value) =>
                value != null && String(value).toLowerCase().includes(searchTerm.toLowerCase()),
            ),
          ),
    [searchTerm, list],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <SearchInput onSearch={setSearchTerm} placeholder="검색어를 입력하세요" />

        {canWrite && (
          <Button onClick={() => setIsOpen(true)} className="bg-mega text-white text-xs">
            ＋ 글쓰기
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {filteredList.map((item) => (
          <BoardCard key={item.id} item={item} href={`${item.id}`} badge={renderBadge?.(item)} />
        ))}
      </div>

      {pagination && (
        <Pagenation
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onChangePage={pagination.onChangePage}
        />
      )}

      {isOpen && ModalComponent && (
        <ModalComponent
          onClose={() => setIsOpen(false)}
          category={category!}
          onSubmit={(data: { title: string; content: string }) => {
            console.log(data);
          }}
        />
      )}
    </div>
  );
}
