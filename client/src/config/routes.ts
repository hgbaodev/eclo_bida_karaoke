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
    order: {
      tableandrooms: '/admin/orders/tableandrooms',
      invoice: '/admin/orders/invoices',
    },
    services: {
      tableandrooms: '/admin/services/tableandrooms',
      devices: '/admin/services/devices',
      service_types: '/admin/services/service_types',
      prices: '/admin/services/prices',
      books: '/admin/services/books',
    },
    customers: '/admin/customers',
    jobBoard: '/admin/job-board',
    suppliers: '/admin/suppliers',
    loggers: '/admin/loggers',
    products: '/admin/products',
    product_import: '/admin/product_imports',
    kitchen_orders: '/admin/kitchen_orders',
    staffs: '/admin/staffs',
    positions: '/admin/positions',
    shifts: '/admin/shifts',
    shift_detail: '/admin/shiftdetails',
    shift_detail_staff: '/admin/shift_detail_staff',
    schedule: '/admin/schedule',
    attendance: '/admin/attendance',
  },
  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    forgotPassword: '/auth/forgot-password',
    otp: '/auth/otp',
  },
  profile: '/profile',
};
