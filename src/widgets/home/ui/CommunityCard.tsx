import { useQuery } from '@tanstack/react-query';
import { MessageSquare, SquarePlus } from 'lucide-react';
import { Link } from 'react-router';

import { postQueries } from '@/entities/post/api/queries';
import ComunityList from '@/features/home/ui/CommunityList';
import { Button } from '@/shared/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { IconAvatar } from '@/shared/components/ui/iconAvatar';
import { ROUTES } from '@/shared/constants/routes';

const CommunityCard = () => {
  const { data: posts = { items: [] } } = useQuery(postQueries.allPosts());

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-3">
            <IconAvatar variant="default" size="md">
              <MessageSquare />
            </IconAvatar>
            커뮤니티
          </div>
          <CardAction>
            <Link to={ROUTES.COMMUNITY}>
              <Button variant="ghost" size="icon">
                <SquarePlus />
              </Button>
            </Link>
          </CardAction>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {posts.items.length > 0
          ? posts.items.map((post) => <ComunityList key={post.id} post={post} />)
          : '작성된 게시물이 없습니다.'}
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
