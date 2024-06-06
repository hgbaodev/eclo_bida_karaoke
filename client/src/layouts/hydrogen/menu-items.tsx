import { routes } from '@/config/routes';
import { PiPackageDuotone, PiChartBarDuotone, PiFolderLockDuotone, PiShapesDuotone, PiUserList } from 'react-icons/pi';
import { FaUniversalAccess, FaUserTie } from 'react-icons/fa';
import { TbPackages } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineBadge } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';

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
        name: 'Devices',
        href: routes.admin.services.devices,
      },
      {
        name: 'Service types',
        href: routes.admin.services.service_types,
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
    name: 'Staffs',
    href: routes.admin.staffs,
    icon: <FaUserTie />,
  },
  {
    name: 'Positions',
    href: routes.admin.positions,
    icon: <MdOutlineBadge />,
  },
  {
    name: 'Shifts',
    href: routes.admin.shifts,
    icon: <MdOutlineBadge />,
  },
  {
    name: 'Shift Details',
    href: routes.admin.shift_detail,
    icon: <MdOutlineBadge />,
  },
  {
    name: 'Customers',
    href: routes.admin.customers,
    icon: <PiUserList />,
  },
  {
    name: 'Suppliers',
    href: routes.admin.suppliers,
    icon: <TbPackages />,
  },
  {
    name: 'Products',
    href: routes.admin.products,
    icon: <FaProductHunt />,
  },
  {
    name: 'Import',
    href: routes.admin.product_import,
    icon: <FaProductHunt />,
  },
  {
    name: 'Loggers',
    href: routes.admin.loggers,
    icon: <FaUniversalAccess />,
  },
];
