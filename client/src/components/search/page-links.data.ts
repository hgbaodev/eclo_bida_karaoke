import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Home',
  },
  // label end
  {
    name: 'Logistics',
    href: routes.logistics.dashboard,
  },
  {
    name: 'Analytics',
    href: routes.analytics,
  },
  // label start
  {
    name: 'Apps',
  },
  // label end
  {
    name: 'Shipment List',
    href: routes.logistics.shipmentList,
  },
  {
    name: 'Shipment Details',
    href: routes.logistics.shipmentDetails(DUMMY_ID),
  },
  {
    name: 'Tracking',
    href: routes.logistics.tracking(DUMMY_ID),
  },
];
