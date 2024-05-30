export const routes = {
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/shipments',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/shipments/create',
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  admin: {
    analytics: '/admin',
    users: '/admin/users',
    rolesPermissions: '/admin/roles-permissions',
    services: {
      tableandrooms: '/admin/services/tableandrooms',
      devices: '/admin/services/devices',
    },
    customers: '/admin/customers',
    jobBoard: '/admin/job-board',
    suppliers: '/admin/suppliers',
    loggers: '/admin/loggers',
    staffs: '/admin/staffs',
    positions: '/admin/positions',
  },
  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    forgotPassword: '/auth/forgot-password',
    otp: '/auth/otp',
  },
  profile: '/profile',
};
