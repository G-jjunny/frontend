import { Megaphone } from 'lucide-react';
import { Link } from 'react-router';

import { useCommunityPostsQuery } from '@/features/community/api/queries';
import { BoardPage } from '@/features/community/ui/BoardPage';
import PostCreateModal from '@/features/community/ui/WriteModal';
import { ROLE } from '@/features/pay/model/role';

export default function NoticePage() {
  const user = { role: ROLE.MANAGER };

  const { data, isLoading } = useCommunityPostsQuery();

  const noticeList = (data ?? []).filter((post) => post.category === '공지');

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BoardPage
      title="공지사항"
      icon={<Megaphone />}
      list={noticeList}
      canWrite={user.role === ROLE.MANAGER}
      ModalComponent={(props) => <PostCreateModal {...props} category="공지" />}
      columns={[
        {
          header: 'NO',
          key: 'id',
          render: (_, idx) => noticeList.length - idx,
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
        {
          header: '작성자',
          key: 'author_name',
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
