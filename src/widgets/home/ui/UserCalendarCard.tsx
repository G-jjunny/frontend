import { ScheduleList, UserCalendar, UserProfile } from '@/features/home';
import ContentsCard from '@/shared/components/ui/ContentsCard';

const UserCalendarCard = () => {
  return (
    <ContentsCard className="w-full lg:w-80 lg:shrink-0" profile={<UserProfile />} title="">
      {/* TODOS : features 컴포넌트 생성 후 추가 */}
      <UserCalendar />
      <ScheduleList />
    </ContentsCard>
  );
};

export default UserCalendarCard;
