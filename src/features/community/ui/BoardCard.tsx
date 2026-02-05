import { Calendar, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router';

import type { BoardPost } from '../model/boardType';

import { Card, CardHeader, CardContent, CardFooter } from '@/shared/components/ui/card';

interface BoardCardProps<T extends BoardPost> {
  item: T;
  href: string;
  badge?: React.ReactNode;
}

export function BoardCard<T extends BoardPost>({ item, href, badge }: BoardCardProps<T>) {
  return (
    <Link to={href} className="block focus:outline-none focus:ring-2 focus:ring-mega">
      <Card className="py-4 px-5 gap-3 transition hover:shadow-md hover:bg-gray-100 cursor-pointer">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2 text-sm font-medium">
            {badge} {item.title}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
        </CardContent>

        <CardFooter className="p-0 flex items-center gap-4 text-[10px] text-gray-400">
          <div className="flex gap-1">
            <User size={15} />
            <span> {item.author_name}</span>
          </div>
          <div className="flex gap-1">
            <Calendar size={15} />
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-1">
            <MessageSquare size={15} />
            {item.comments_count != null && <span>{item.comments_count}</span>}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
