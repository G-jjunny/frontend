import { Badge } from '../../../../features/community/ui/badge';
import { BoardPage } from '../../../../features/community/ui/main/BoardPage';

import { communityPostList } from '@/features/community/mock/communityMock';
import { SHIFT_TYPE_LABEL } from '@/features/community/model/statusLabel';

export default function ShiftPage() {
  const list = communityPostList
    .filter((post) => post.category === 'SHIFT')
    .map((post) => ({
      id: post.id,
      title: SHIFT_TYPE_LABEL[post.shiftType],
      content: `${post.requesterWorkTime} → ${post.desiredWorkTime}`,
      author_name: post.author,
      created_at: post.createdAt,
    }));

  return <BoardPage list={list} renderBadge={() => <Badge variant="shift" label="근무교대" />} />;
}
