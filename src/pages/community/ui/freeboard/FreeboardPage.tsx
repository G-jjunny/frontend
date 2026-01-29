import { MessagesSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { useCommunityPostsQuery } from '@/features/community/api/queries';
import { BoardPage } from '@/features/community/ui/BoardPage';
import CommunityModal from '@/features/community/ui/CommunityModal';

export default function FreeboardPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCommunityPostsQuery({
    category: '자유게시판',
    page,
    page_size: 5,
  });

  const total = data?.total ?? 0;
  const pages = data?.page ?? 1;
  const pageSize = data?.page_size ?? 5;

  if (isLoading) return <div>로딩 중...</div>;

  const freeBoardList = data?.items ?? [];

  return (
    <BoardPage
      title="자유게시판"
      icon={<MessagesSquare />}
      list={freeBoardList}
      ModalComponent={(props) => (
        <CommunityModal {...props} mode="create" category="자유게시판" onSubmit={async () => {}} />
      )}
      canWrite={true}
      columns={[
        {
          header: 'NO',
          key: 'id',
          render: (_, idx) => total - (pages - 1) * pageSize - idx,
        },
        {
          header: '제목',
          key: 'title',
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.title}
            </Link>
          ),
        },
        { header: '작성자', key: 'author_name' },
        {
          header: '작성일자',
          key: 'created_at',
          render: (item) => new Date(item.created_at).toLocaleDateString(),
        },
      ]}
      pagination={{
        currentPage: data?.page ?? 1,
        totalPages: data?.total_pages ?? 1,
        onChangePage: setPage,
      }}
    />
  );
}
