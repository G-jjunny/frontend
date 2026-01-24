import { Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { NAV_ITEMS, type NavItemConfig } from '../model/nav.config';

import NavItem from './NavItem';

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: NavItemConfig) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className="fixed top-14 left-0 bottom-0 flex flex-col gap-3 p-2">
      <NavItem icon={Menu} />
      <div className=" w-full h-1 bg-mega-gray-light rounded-md" />
      {NAV_ITEMS.filter(() => true).map((item) => (
        <NavItem
          key={item.key}
          icon={item.icon}
          active={isActive(item)}
          onClick={() => void navigate(item.path)}
        />
      ))}
    </nav>
  );
};

export default SideNav;
