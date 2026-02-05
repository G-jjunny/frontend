import { Bell, KeyRound, Lock, CirclePlus } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';

import logo from '../../shared/assets/logo/Megabox_Logo_Indigo.png';
import { ROUTES } from '../../shared/constants/routes';

export const Header = () => {
  const today = useMemo(() => {
    return new Date().toISOString().slice(0, 10);
  }, []);

  const iconHover =
    'transition-all duration-200 hover:scale-110 hover:text-gray-500 cursor-pointer';
  const logoHover = 'transition-all duration-200 cursor-pointer';

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-14 bg-mega-header-blue flex justify-between items-center px-5 z-50">
        {/* 왼쪽 로고 + 타이틀 */}
        <div className="flex items-center gap-4">
          <Link to={ROUTES.ROOT}>
            <img src={logo} alt="logo" className={`${logoHover} h-6`} />
          </Link>
          <div className="font-bold">M SYSTEM</div>
        </div>
        {/* 오른쪽 유저 이름 (메박이) + 날짜 */}
        <div className="flex items-center gap-4">
          <div className="text-mega-blue text-xs"> 메박이 </div>
          <div className="font-light text-sm"> {today} </div>
          <Bell size={18} strokeWidth={3} className={iconHover} />
          <KeyRound size={18} strokeWidth={3} className={iconHover} />
          <Lock size={18} strokeWidth={3} className={iconHover} />
          <CirclePlus size={18} strokeWidth={3} className={iconHover} />
        </div>
      </div>
    </>
  );
};
