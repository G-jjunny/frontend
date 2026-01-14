import { useQuery } from '@tanstack/react-query';
import { SquarePlus } from 'lucide-react';
import { Link } from 'react-router';

import { postQueries } from '@/entities/post/api/queries';
import ComunityList from '@/features/home/ui/CommunityList';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ROUTES } from '@/shared/constants/routes';

const CommunityCard = () => {
  const { data: posts = { items: [] } } = useQuery(postQueries.allPosts());

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          커뮤니티
          <Link to={ROUTES.COMMUNITY}>
            <Button variant="ghost" size="icon">
              <SquarePlus />
            </Button>
          </Link>
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
