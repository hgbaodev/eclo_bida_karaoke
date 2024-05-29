import { routes } from '@/config/routes';
import { PiPackageDuotone, PiChartBarDuotone, PiFolderLockDuotone, PiShapesDuotone } from 'react-icons/pi';
import { FaUniversalAccess } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi2';
import {FaProductHunt} from 'react-icons/fa'
// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Analytics',
    href: routes.admin.analytics,
    icon: <PiChartBarDuotone />,
    badge: '',
  },
  {
    name: 'Job Board',
    href: routes.admin.jobBoard,
    icon: <PiShapesDuotone />,
    badge: 'NEW',
  },
  // label start
  {
    name: 'Apps Kit',
  },
  // label end
  {
    name: 'Services',
    href: '#',
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: 'Table & Rooms',
        href: routes.admin.services.tableandrooms,
      },
      {
        name: 'Areas',
        href: routes.admin.services.areas,
      },
      {
        name: 'Devices',
        href: routes.admin.services.devices,
      },
    ],
  },
  {
    name: 'Users',
    href: routes.admin.users,
    icon: <HiOutlineUsers />,
  },
  {
    name: 'Roles & Permissions',
    href: routes.admin.rolesPermissions,
    icon: <PiFolderLockDuotone />,
  },
  {
    name: 'Loggers',
    href: routes.admin.loggers,
    icon: <FaUniversalAccess />,
  },
  {
    name: 'Products',
    href: routes.admin.products,
    icon: <FaProductHunt />,
  },
];
