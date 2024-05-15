import { routes } from "@/config/routes";
import { DUMMY_ID } from "@/config/constants";
import {
  PiPackageDuotone,
  PiChartBarDuotone,
  PiFolderLockDuotone,
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Overview",
  },
  // label end
  {
    name: 'Analytics',
    href: routes.analytics,
    icon: <PiChartBarDuotone />,
    badge: '',
  },
  // label start
  {
    name: "Apps Kit",
  },
  // label end
  {
    name: "Logistics",
    href: "#",
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: "Shipment List",
        href: routes.logistics.shipmentList,
      },
      {
        name: "Shipment Details",
        href: routes.logistics.shipmentDetails(DUMMY_ID),
      }
    ],
  },
  {
    name: 'Roles & Permissions',
    href: routes.rolesPermissions,
    icon: <PiFolderLockDuotone />,
  },
];
