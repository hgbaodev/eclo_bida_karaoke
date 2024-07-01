import { routes } from '@/config/routes';
import { PiPackageDuotone, PiChartBarDuotone, PiFolderLockDuotone, PiShapesDuotone, PiUserList } from 'react-icons/pi';
import { FaUniversalAccess, FaUserTie } from 'react-icons/fa';
import { AiOutlineSchedule } from 'react-icons/ai';
import { TbPackages } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineBadge } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MdOutlineDevicesOther } from 'react-icons/md';
import { FaUserClock } from 'react-icons/fa6';
import { LuClock } from 'react-icons/lu';
import { BsPersonCheckFill } from 'react-icons/bs';
import { TbToolsKitchen3 } from 'react-icons/tb';

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
  {
    name: 'Sell',
  },
  {
    name: 'Order',
    href: '#',
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: 'Table & Rooms',
        href: routes.admin.order.tableandrooms,
      },
      {
        name: 'Invoices',
        href: routes.admin.order.invoice,
      },
    ],
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
        name: 'Service types',
        href: routes.admin.services.service_types,
      },
      {
        name: 'Prices setting',
        href: routes.admin.services.prices,
      },
    ],
  },

  {
    name: 'Devices',
    href: routes.admin.devices,
    icon: <MdOutlineDevicesOther />,
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
    icon: <LuClock />,
  },
  {
    name: 'Attendance',
    href: routes.admin.attendance,
    icon: <BsPersonCheckFill />,
  },
  {
    name: 'Schedule',
    href: routes.admin.schedule,
    icon: <AiOutlineSchedule />,
  },
  {
    name: 'Shift Details For Staff',
    href: routes.admin.shift_detail_staff,
    icon: <FaUserClock />,
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
    name: 'Kitchen orders',
    href: routes.admin.kitchen_orders,
    icon: <TbToolsKitchen3 />,
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
