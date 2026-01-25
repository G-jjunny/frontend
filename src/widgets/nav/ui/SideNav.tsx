import { Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { NAV_ITEMS, type NavItemConfig } from '../model/nav.config';

import NavItem from './NavItem';

import { useAuthStore } from '@/shared/model/authStore';

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isActive = (item: NavItemConfig) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };
  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (!item.requiredRoles) return true;
    if (!user) return false;

    return item.requiredRoles.includes(user.position);
  });

  return (
    <nav className="fixed top-14 left-0 bottom-0 flex flex-col gap-3 p-2">
      <NavItem icon={Menu} />
      <div className=" w-full h-1 bg-mega-gray-light rounded-md" />
      {filteredNavItems.map((item) => (
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
