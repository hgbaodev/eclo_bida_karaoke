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
import { BsPersonCheckFill, BsReceiptCutoff } from 'react-icons/bs';
import { TbToolsKitchen3 } from 'react-icons/tb';
import { GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

export interface MenuItem {
  name: string;
  href?: string;
  icon?: JSX.Element;
  badge?: string;
  dropdownItems?: MenuItem[];
}

export const MenuItems = () => {
  const t = useTranslations('menu-items');
  // label start
  return [
    {
      name: t('overview'),
    },
    {
      name: t('analytics'),
      href: routes.admin.analytics,
      icon: <PiChartBarDuotone />,
      badge: '',
    },
    {
      name: t('job-board'),
      href: routes.admin.jobBoard,
      icon: <PiShapesDuotone />,
      badge: 'NEW',
    },
    {
      name: t('sell'),
    },
    {
      name: t('order'),
      href: '#',
      icon: <PiPackageDuotone />,
      dropdownItems: [
        {
          name: t('table-rooms'),
          href: routes.admin.order.tableandrooms,
        },
        {
          name: t('invoices'),
          href: routes.admin.order.invoice,
        },
      ],
    },
    {
      name: t('apps-kit'),
    },
    {
      name: t('report'),
      href: '#yhgtnu',
      icon: <AiOutlineBarChart />,
      dropdownItems: [
        {
          name: t('statistical'),
          href: routes.admin.report.statistical,
        },
        {
          name: t('revenue-and-expenditure'),
          href: routes.admin.report.revenueEx,
        },
      ],
    },
    {
      name: t('services'),
      href: '#',
      icon: <PiPackageDuotone />,
      dropdownItems: [
        {
          name: t('table-rooms'),
          href: routes.admin.services.tableandrooms,
        },
        {
          name: t('service-types'),
          href: routes.admin.services.service_types,
        },
        {
          name: t('prices-setting'),
          href: routes.admin.services.prices,
        },
      ],
    },
    {
      name: t('devices'),
      href: routes.admin.devices,
      icon: <MdOutlineDevicesOther />,
    },
    {
      name: t('users'),
      href: routes.admin.users,
      icon: <HiOutlineUsers />,
      permission: [
        {
          functional: 'user',
          action: 'View',
        },
      ],
    },
    {
      name: t('roles-permissions'),
      href: routes.admin.rolesPermissions,
      icon: <PiFolderLockDuotone />,
    },
    {
      name: t('staffs'),
      href: routes.admin.staffs,
      icon: <FaUserTie />,
    },
    {
      name: t('salary'),
      href: routes.admin.salary,
      icon: <GiReceiveMoney />,
    },
    {
      name: t('positions'),
      href: routes.admin.positions,
      icon: <MdOutlineBadge />,
    },
    {
      name: t('shifts'),
      href: routes.admin.shifts,
      icon: <LuClock />,
    },
    {
      name: t('attendance'),
      href: routes.admin.attendance,
      icon: <BsPersonCheckFill />,
    },
    {
      name: t('dayoff'),
      href: routes.admin.dayoff,
      icon: <BsReceiptCutoff />,
    },
    {
      name: t('schedule'),
      href: routes.admin.schedule,
      icon: <AiOutlineSchedule />,
    },
    {
      name: t('shift-details-for-staff'),
      href: routes.admin.shift_detail_staff,
      icon: <FaUserClock />,
    },
    {
      name: t('customers'),
      href: routes.admin.customers,
      icon: <PiUserList />,
    },
    {
      name: t('suppliers'),
      href: routes.admin.suppliers,
      icon: <TbPackages />,
    },
    {
      name: t('kitchen-orders'),
      href: routes.admin.kitchen_orders,
      icon: <TbToolsKitchen3 />,
    },
    {
      name: t('products'),
      href: routes.admin.products,
      icon: <FaProductHunt />,
    },
    {
      name: t('import'),
      href: routes.admin.product_import,
      icon: <FaProductHunt />,
    },
    {
      name: t('loggers'),
      href: routes.admin.loggers,
      icon: <FaUniversalAccess />,
    },
  ];
};
