import { useState } from 'react';

import { Badge } from '../badge';

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BoardPage
      list={noticeList}
      canWrite={user.role === ROLE.MANAGER}
      category="공지"
      renderBadge={() => <Badge variant="notice" label="공지" />}
      pagination={{
        currentPage: page,
        totalPages: data?.total_pages ?? 1,
        onChangePage: setPage,
      }}
      ModalComponent={(props) => (
        <CommunityModal {...props} mode="create" category="공지" onSubmit={async () => {}} />
      )}
    />
  );
}
