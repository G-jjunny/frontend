import { BoardPage } from '../../../../features/community/ui/BoardPage';
import { Badge } from '../badge';

import { communityPostList } from '@/features/community/mock/communityMock';

export default function DayoffPage() {
  const list = communityPostList
    .filter((post) => post.category === 'DAYOFF')
    .map((post) => ({
      id: post.id,
      title: '휴무 신청',
      content: `휴무일: ${post.dayoffDate}`,
      author_name: post.author,
      created_at: post.createdAt,
    }));

  return <BoardPage list={list} renderBadge={() => <Badge variant="dayoff" label="휴무" />} />;
}
