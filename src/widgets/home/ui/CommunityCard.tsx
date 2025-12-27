import { SquarePlus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/card';

const CommunityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          커뮤니티
          <Button variant="ghost" size="icon">
            <SquarePlus />
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CommunityCard;
