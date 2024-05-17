import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { PiPackageDuotone, PiChartBarDuotone, PiFolderLockDuotone } from 'react-icons/pi';
import { HiOutlineUsers } from 'react-icons/hi2';
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
  // label start
  {
    name: 'Apps Kit',
  },
  // label end
  {
    name: 'Logistics',
    href: '#',
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: 'Shipment List',
        href: routes.logistics.shipmentList,
      },
      {
        name: 'Shipment Details',
        href: routes.logistics.shipmentDetails(DUMMY_ID),
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
];
