import { MessagesSquare } from 'lucide-react';
import { Link } from 'react-router';

import { useCommunityPostsQuery } from '@/features/community/api/queries';
import { mapCommunityPostToBoardItem } from '@/features/community/model/mapper';
import { BoardPage } from '@/features/community/ui/BoardPage';
import PostCreateModal from '@/features/community/ui/WriteModal';

export default function FreeboardPage() {
  const { data, isLoading } = useCommunityPostsQuery();

  if (isLoading) return <div>로딩 중...</div>;

  const freeBoardList = (data ?? [])
    .filter((post) => post.category === '자유게시판')
    .map(mapCommunityPostToBoardItem);

  return (
    <BoardPage
      title="자유게시판"
      icon={<MessagesSquare />}
      list={freeBoardList}
      ModalComponent={(props) => <PostCreateModal {...props} category="자유게시판" />}
      canWrite={true}
      columns={[
        { header: 'NO', key: 'id', render: (_, idx) => freeBoardList.length - idx },
        {
          header: '제목',
          key: 'title',
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.title}
            </Link>
          ),
        },
        { header: '작성자', key: 'author' },
        {
          header: '작성일자',
          key: 'createdAt',
          render: (item) => new Date(item.createdAt).toLocaleDateString(),
        },
      ]}
    />
  );
}
