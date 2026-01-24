import { Outlet } from 'react-router';

import { Header } from '../../widgets/ui/Header';
import { Sidebar } from '../../widgets/ui/Sidebar';

import SideNav from '@/widgets/ui/SideNav';

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-14 ml-18">
        <Sidebar />
        <SideNav />
        <div className="flex-1 overflow-auto px-10 pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
