import PageLogo from '@/shared/components/ui/PageLogo';
import { CommunityCard, PayOverviewCard, UserCalendarCard } from '@/widgets/home';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-5">
      <PageLogo color="purple" />
      <div className="flex flex-col gap-6 lg:flex-row">
        <UserCalendarCard />
        <div className="w-full flex flex-col gap-6">
          <PayOverviewCard />
          <CommunityCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
