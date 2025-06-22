import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Menu as MenuIcon,
  X as CloseIcon,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Vouchers', path: '/vouchers', icon: Ticket },
  { label: 'Issued Vouchers', path: '/issued', icon: Users },
];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      {/* <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon className="h-6 w-6" />
        </button>
      </div> */}

      {/* Overlay Drawer */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity md:hidden',
          !isOpen && 'hidden'
        )}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={cn(
          'fixed z-50 md:static top-0 left-0 h-full w-64 bg-white border-r shadow-lg transform md:translate-x-0 transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 space-y-1 p-4">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link
              to={path}
              key={label}
              className={cn(
                'flex items-center gap-3 p-3 rounded-md text-sm font-medium hover:bg-gray-100 transition-all',
                pathname === path && 'bg-gray-100 text-blue-600 font-semibold'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;