import { Megaphone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { useCommunityPostsQuery } from '@/features/community/api/queries';
import { BoardPage } from '@/features/community/ui/BoardPage';
import CommunityModal from '@/features/community/ui/CommunityModal';
import { ROLE } from '@/features/pay/model/role';

export default function NoticePage() {
  const user = { role: ROLE.MANAGER };

  const [page, setPage] = useState(1);

  const { data, isLoading } = useCommunityPostsQuery({
    category: '공지',
    page,
    page_size: 5,
  });

  const noticeList = data?.items ?? [];

  const total = data?.total ?? 0;
  const pages = data?.page ?? 1;
  const pageSize = data?.page_size ?? 5;

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BoardPage
      title="공지사항"
      icon={<Megaphone />}
      list={noticeList}
      canWrite={user.role === ROLE.MANAGER}
      pagination={{
        currentPage: page,
        totalPages: data?.total_pages ?? 1,
        onChangePage: setPage,
      }}
      ModalComponent={(props) => (
        <CommunityModal {...props} mode="create" category="공지" onSubmit={async () => {}} />
      )}
      columns={[
        {
          header: 'NO',
          key: 'id',
          width: '80px',
          render: (_, idx) => total - (pages - 1) * pageSize - idx,
        },
        {
          header: '제목',
          key: 'title',
          width: '60%',
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.title}
            </Link>
          ),
        },
        {
          header: '작성자',
          key: 'author_name',
          width: '150px',
        },
        {
          header: '작성일자',
          key: 'created_at',
          render: (item) => new Date(item.created_at).toLocaleDateString(),
        },
      ]}
    />
  );
}
