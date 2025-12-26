import { Megaphone } from 'lucide-react';
import { useParams } from 'react-router';

import BoardDetail from '@/features/community/ui/BoardDetail';
import CommentSection from '@/features/community/ui/comment/CommentSection';
import { useCommunityPostDetailQuery } from '@/features/community/api/queries';
import { mapCommunityPostToBoardItem } from '@/features/community/model/mapper';

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>잘못된 접근입니다.</div>;

  const { data, isLoading } = useCommunityPostDetailQuery(Number(id));

  if (isLoading) return <div>로딩 중...</div>;
  if (!data) return <div>존재하지 않는 공지사항입니다.</div>;

  const boardItem = mapCommunityPostToBoardItem(data);

  return (
    <BoardDetail
      title="공지사항"
      icon={<Megaphone />}
      list={[boardItem]}
      notFoundMessage="존재하지 않는 공지사항입니다."
    >
      <CommentSection
        postId={data.id}
        postType="notice"
        currentUserId={1}
      />
    </BoardDetail>
  );
}