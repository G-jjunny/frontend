import React from 'react';

import { Calendar } from '@/shared/components/ui/calendar';

const UserCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  // TODOS : 유저 캘린더 컴포넌트 구현
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
      buttonVariant="ghost"
    />
  );
};

export default UserCalendar;
