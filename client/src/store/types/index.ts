export interface RootState {
  auth: authType;
  role: roleType;
  user: userType;
  logger: loggerType;
  service_type: service_type_type;
  product: productType;
  product_type: product_typeType;
  product_import: product_ImportType;
  product_import_detail: product_Import_DetailType;
  customer: customer_type;
  area: areaType;
  device: device_type;
  position: positionType;
  price: price_type;
  supplier: supplier_type;
  staff: staffType;
  shift: shiftType;
  service: serviceType;
  shift_detail: shift_detailType;
  shift_user_detail: shift_user_detailType;
  work_shift: work_shiftType;
  order: orderType;
  kitchen_order: kitchen_order_type;
  attendance: attendance;
  service_device_detail: service_device_detail_type;
  salary: salary;
  dayoff: dayoffType;
  kitchen_order_notification: kitchen_order_notification_type;
  invoice: invoiceType;
  statistical: statisticalType;
}

export interface kitchen_order_notification_type {
  data: [];
  isLoading: boolean;
  errors: string | null;
}

export interface kitchen_order_type {
  data: kitchenOrder[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  isFiltered: boolean;
  status: any;
  errors: string | null;
}

export interface kitchenOrder {
  active: string;
  status: any;
  product_name: string;
  order_active: string;
  quantity: string;
  created_at: string;
  updated_at: string;
  isLoading: boolean;
}

export interface authType {
  isAuthenticated: boolean;
  isLoaded: boolean;
  active: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  accessToken: string;
  role: {
    name: string;
    permissions: [];
  };
}

export interface roleType {
  fetchData: any[];
  fetchDataLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  listRoles: any[];
  listFunctionals: {
    label: string;
    value: string;
  }[];
}

export interface userType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  role: any;
  status: any;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

export interface price_type {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  status: any;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

export interface customer_type {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  status: any;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

export interface service_device_detail_type {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  status: any;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

export interface service_type_type {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  status: any;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

export interface supplier_type {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  status: any;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  listSupplier: any[];
}

export interface loggerType {
  data: any[];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
}

export interface invoiceType {
  data: any[];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
}

export interface productType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  listProduct: any[];
  type: any;
}
export interface product_ImportType {
  data: [];
  data1: any;
  data2: any;
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  product: any;
  supplier: any;
}
export interface product_Import_DetailType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}
export interface areaType {
  data: any[];
  isCreateLoading: boolean;
  isEditLoading: boolean;
}

export interface device_type {
  data: any[];
  isFiltered: boolean;
  page: number;
  pageSize: number;
  status: any;
  totalRow: number;
  errors: string;
  query: string;
  isLoading: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}
export interface staffType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  position: any;
  status: any;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  listStaffs: any[];
  oneStaff: any;
}

export interface positionType {
  data: [];
  fetchDataLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  status: any;
  query: string;
  errors: any;
  listPositions: any[];
}

export interface shiftType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  status: any;
  shift_type: any;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  listShifts: any[];
}
export interface shift_detailType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  day_of_week: string;
  shift: any;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

export interface shift_user_detailType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  day_of_week: string;
  shift: any;
  workshift: any;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  listShiftUserDetail: any[];
  listShiftUserDetailByUser: any[];
}

export interface work_shiftType {
  data: any[];
  isLoading: boolean;
  isFiltered: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  oneWorkShift: any;
}
export interface serviceType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  totalRow: number;
  page: number;
  pageSize: number;
  query: string;
  prices: {
    active: string;
    name: string;
    pricePerHour: number;
    status: string;
  }[];
  areas: {
    name: string;
    description: string;
    active: string;
  }[];
  serviceTypes: {
    name: string;
    status: string;
    active: string;
  }[];
  devices: [];
  listDevices: {
    device: string;
    number: number;
  }[];
  isCreateLoading: boolean;
  isEditLoading: boolean;
  selectedArea: any;
}

export interface orderType {
  areas: any[];
  isLoading: boolean;
  order: null | {
    active: string;
    checkin_time: string | number | Date;
    checkout_time: string;
    total_price: number;
    service: {
      active: string;
      name: string;
      description: string;
      price: {
        pricePerHour: number;
      };
    };
    user: {
      first_name: string;
      last_name: string;
      email: string;
      image: string;
    };
    customer: {
      first_name: string;
      last_name: string;
      status: string;
      image: string;
      phone: string;
      email: string;
      active: string;
    };
    products: {
      active: string;
      quantity: number;
      image: string;
      name: string;
      selling_price: number;
    }[];
    devices: {
      active: string;
      quantity: number;
      name: string;
      selling_price: number;
    }[];
  };
  isLoadingGetOrder: boolean;
  queryProduct: string;
  isLoadingQueryProduct: boolean;
  products: [];
  queryCustomer: string;
  isLoadingQueryCustomer: boolean;
  customers: [];
  isLoadingPayOrder: boolean;
  isLoadingUpdateOrder: boolean;
  devices: [];
  isView: boolean;
}
export interface product_typeType {
  data: [];
  isLoading: boolean;
  listType: any[];
}
export interface attendance {
  dataAttendance: any[];
  isLoading: boolean;
  isFiltered: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  month: number;
  query: string;
  year: number;
}

export interface salary {
  dataSalary: any[];
  isLoading: boolean;
  isFiltered: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  month: number;
  query: string;
  year: number;
}
export interface dayoffType {
  data: [];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  type: any;
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  staff: any;
}

export interface statisticalType {
  dataOverview: {
    label: string;
    value: number;
  }[];
  isLoadingOverView: boolean;
  dataStats: {
    label: string;
    value: number;
  }[];
  selectedStats: string;
  revenueEx: null | {
    beginTotal: number;
    endTotal: number;
    listRevenueEx: {
      time: string;
      customer: string;
      revenue: number;
      expenditure: number;
      remaining: number;
    }[];
  };
  isRevenueExLoading: boolean;
}
