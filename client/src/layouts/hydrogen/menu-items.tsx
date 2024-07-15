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
import { permission } from 'process';

export interface MenuItem {
  name: string;
  href?: string;
  icon?: JSX.Element;
  badge?: string;
  dropdownItems?: MenuItem[];
}

export const MenuItems = () => {
  const t = useTranslations('menu_items');
  // label start
  return [
    {
      name: t('analytics'),
      href: routes.admin.analytics,
      icon: <PiChartBarDuotone />,
      badge: '',
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
          name: t('table_rooms'),
          href: routes.admin.order.tableandrooms,
          permission: 'order.View',
        },
        {
          name: t('invoices'),
          href: routes.admin.order.invoice,
          permission: 'order.View',
        },
      ],
    },
    {
      name: t('app_kits'),
    },
    {
      name: t('report'),
      href: '#',
      icon: <AiOutlineBarChart />,
      dropdownItems: [
        {
          name: t('statistical'),
          href: routes.admin.report.statistical,
          permission: 'statistical.View',
        },
        {
          name: t('revenue_and_expenditure'),
          href: routes.admin.report.revenueEx,
          permission: 'revenue.View',
        },
      ],
    },
    {
      name: t('services'),
      href: '#',
      icon: <PiPackageDuotone />,
      dropdownItems: [
        {
          name: t('table_rooms'),
          href: routes.admin.services.tableandrooms,
          permission: 'table&room.View',
        },
        {
          name: t('service_types'),
          href: routes.admin.services.service_types,
          permission: 'servicetype.View',
        },
        {
          name: t('prices_setting'),
          href: routes.admin.services.prices,
          permission: 'price.View',
        },
      ],
    },
    {
      name: t('devices'),
      href: routes.admin.devices,
      icon: <MdOutlineDevicesOther />,
      permission: 'device.View',
    },
    {
      name: t('users'),
      href: routes.admin.users,
      icon: <HiOutlineUsers />,
      permission: 'user.View',
    },
    {
      name: t('roles_permissions'),
      href: routes.admin.rolesPermissions,
      icon: <PiFolderLockDuotone />,
      permission: 'role.View',
    },
    {
      name: t('staffs'),
      href: routes.admin.staffs,
      icon: <FaUserTie />,
      permission: 'staff.View',
    },
    {
      name: t('salary'),
      href: routes.admin.salary,
      icon: <GiReceiveMoney />,
      permission: 'salary.View',
    },
    {
      name: t('positions'),
      href: routes.admin.positions,
      icon: <MdOutlineBadge />,
      permission: 'position.View',
    },
    {
      name: t('shifts'),
      href: routes.admin.shifts,
      icon: <LuClock />,
      permission: 'shifts.View',
    },
    {
      name: t('attendance'),
      href: routes.admin.attendance,
      icon: <BsPersonCheckFill />,
      permission: 'attendance.View',
    },
    {
      name: t('dayoff'),
      href: routes.admin.dayoff,
      icon: <BsReceiptCutoff />,
      permission: 'dayoff.View',
    },
    {
      name: t('schedule'),
      href: routes.admin.schedule,
      icon: <AiOutlineSchedule />,
      permission: 'schedule.View',
    },
    {
      name: t('shift_details_for_staff'),
      href: routes.admin.shift_detail_staff,
      icon: <FaUserClock />,
      permission: 'shiftdetail.View',
    },
    {
      name: t('customers'),
      href: routes.admin.customers,
      icon: <PiUserList />,
      permission: 'customer.View',
    },
    {
      name: t('suppliers'),
      href: routes.admin.suppliers,
      icon: <TbPackages />,
      permission: 'supplier.View',
    },
    {
      name: t('kitchen_orders'),
      href: routes.admin.kitchen_orders,
      icon: <TbToolsKitchen3 />,
      permission: 'kitchenorder.View',
    },
    {
      name: t('products'),
      href: routes.admin.products,
      icon: <FaProductHunt />,
      permission: 'product.View',
    },
    {
      name: t('import'),
      href: routes.admin.product_import,
      icon: <FaProductHunt />,
      permission: 'import.View',
    },
    {
      name: t('loggers'),
      href: routes.admin.loggers,
      icon: <FaUniversalAccess />,
      permission: 'logger.View',
    },
  ];
};
