import { Outlet } from 'react-router';

const SystemLayOut = () => {
  return (
    <div className=" w-screen h-screen">
      <Outlet />
    </div>
  );
};

export default SystemLayOut;
