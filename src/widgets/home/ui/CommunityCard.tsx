import { SquarePlus } from 'lucide-react';
import { Link } from 'react-router';

import ComunityList from '@/features/home/ui/ComunityList';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ROUTES } from '@/shared/constants/routes';

const CommunityCard = () => {
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
        <ComunityList />
        <ComunityList />
        <ComunityList />
        <ComunityList />
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
