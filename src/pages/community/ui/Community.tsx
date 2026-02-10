import { CalendarSync, CloudOff, Megaphone, MessagesSquare, TextAlignStart } from 'lucide-react';
import { Outlet } from 'react-router';

import logo from '../../../shared/assets/logo/Megabox_Logo_Indigo.png';

import { ListButton } from '@/features/community';
import { useCategoryCountsQuery } from '@/features/community/api/queries';

export default function Communiity() {
  const { data, isLoading } = useCategoryCountsQuery();

  if (isLoading) return null;

  const categoryCounts = data?.counts ?? {};

  return (
    <div className="flex flex-col gap-5 w-3/4 mx-auto mb-10">
      <img src={logo} alt="logo" className="w-50 self-center mb-4" />

      <div className="flex flex-col gap-5">
        <div className="flex self-start gap-2">
          <ListButton
            label="전체"
            to="community"
            count={categoryCounts['전체'] ?? 0}
            icon={TextAlignStart}
            activeColor="bg-mega opacity-90"
          />
          <ListButton
            label="공지사항"
            to="notice"
            count={categoryCounts['공지'] ?? 0}
            icon={Megaphone}
            activeColor="bg-red-500"
          />
          <ListButton
            label="근무교대"
            to="shift"
            count={categoryCounts['근무교대'] ?? 0}
            icon={CalendarSync}
            activeColor="bg-[#44BC62]"
          />
          <ListButton
            label="휴무신청"
            to="dayoff"
            count={categoryCounts['휴무신청'] ?? 0}
            icon={CloudOff}
            activeColor="bg-[#00C0E8]"
          />
          <ListButton
            label="자유게시판"
            to="freeboard"
            count={categoryCounts['자유게시판'] ?? 0}
            icon={MessagesSquare}
            activeColor="bg-mega opacity-90"
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
}
