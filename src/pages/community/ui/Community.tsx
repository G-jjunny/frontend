import { TextAlignStart } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import { Megaphone } from 'lucide-react';
import { CalendarSync } from 'lucide-react';
import { CloudOff } from 'lucide-react';
import { Outlet } from 'react-router';

import logo from '../../../shared/assets/logo/Megabox_Logo_Indigo.png';

import { ListButton } from '@/features/community';
import { useCommunityPostsQuery } from '@/features/community/api/queries';

export default function Communiity() {
  const { data } = useCommunityPostsQuery({
    page: 1,
    page_size: 1000,
  });

  const items = data?.items ?? [];

  const counts = items.reduce(
    (acc, item) => {
      acc.total += 1;

      if (item.category === '공지') acc.notice += 1;
      if (item.category === '근무교대') acc.shift += 1;
      if (item.category === '휴무') acc.dayoff += 1;
      if (item.category === '자유게시판') acc.free += 1;

      return acc;
    },
    {
      total: 0,
      notice: 0,
      shift: 0,
      dayoff: 0,
      free: 0,
    },
  );
  return (
    <div className="flex flex-col gap-5 w-3/4 mx-auto mb-10">
      <img src={logo} alt="logo" className="w-50 self-center mb-4" />

      <div className="flex flex-col gap-5">
        <div className="flex self-start gap-2">
          <ListButton
            label="전체"
            to="community"
            count={counts.total}
            icon={TextAlignStart}
            activeColor="bg-mega opacity-90"
          />
          <ListButton
            label="공지사항"
            to="notice"
            count={counts.notice}
            icon={Megaphone}
            activeColor="bg-red-500"
          />
          <ListButton
            label="근무교대"
            to="shift"
            count={counts.shift}
            icon={CalendarSync}
            activeColor="bg-[#44BC62]"
          />
          <ListButton
            label="휴무신청"
            to="dayoff"
            count={counts.dayoff}
            icon={CloudOff}
            activeColor="bg-[#00C0E8]"
          />
          <ListButton
            label="자유게시판"
            to="freeboard"
            count={counts.free}
            icon={MessagesSquare}
            activeColor="bg-mega opacity-90"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
