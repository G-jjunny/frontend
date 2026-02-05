import ScheduleListItem from './ScheduleListItem';

const ScheduleList = () => {
  return (
    <div className=" flex flex-col gap-4 mt-4">
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
    </div>
  );
};

export default ScheduleList;
