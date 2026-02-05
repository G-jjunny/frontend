const ScheduleListItem = () => {
  return (
    <div className=" bg-muted-foreground/10 gap-2 flex px-3 py-2 rounded-md items-center before:w-1 before:self-stretch before:bg-muted-foreground/10 before:rounded-md">
      <div className=" flex flex-col text-xs">
        <p className=" font-bold">야간 근무</p>
        <p className=" text-muted-foreground">May 9, 9:00 - 10:00</p>
      </div>
    </div>
  );
};

export default ScheduleListItem;
