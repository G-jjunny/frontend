import { STATUS_TYPES } from '../model/status';

import WorkStatusForm from './WorkStatusForm';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const WorkStatus = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue={STATUS_TYPES.ATTENDANCE}>
        <TabsList>
          <TabsTrigger value={STATUS_TYPES.ATTENDANCE}>출퇴근</TabsTrigger>
          <TabsTrigger value={STATUS_TYPES.REST}>휴식 및 복귀</TabsTrigger>
        </TabsList>
        <TabsContent value={STATUS_TYPES.ATTENDANCE}>
          <WorkStatusForm type={STATUS_TYPES.ATTENDANCE} />
        </TabsContent>
        <TabsContent value={STATUS_TYPES.REST}>
          <WorkStatusForm type={STATUS_TYPES.REST} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkStatus;
