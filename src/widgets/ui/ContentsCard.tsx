import type { PropsWithChildren } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

interface ContentsCardProps extends PropsWithChildren {
  profile?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const ContentsCard = ({ profile, title, description, children, className }: ContentsCardProps) => {
  return (
    <Card className={cn(' min-w-2xs', className)}>
      <CardHeader>
        <CardTitle className=" flex gap-3 items-center">{profile ? profile : title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentsCard;
