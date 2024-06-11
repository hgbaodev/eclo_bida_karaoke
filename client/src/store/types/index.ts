export interface RootState {
  auth: authType;
  role: roleType;
  user: userType;
  logger: loggerType;
  service_type: service_typeType;
  product: productType;
  product_import: product_ImportType;
  customer: customerType;
  area: areaType;
  device: deviceType;
  position: positionType;
  price: priceType;
  supplier: supplierType;
  staff: staffType;
  shift: shiftType;
  service: serviceType;
}
export interface authType {
  isAuthenticated: boolean;
  isLoaded: boolean;
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

export interface priceType {
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

export interface customerType {
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

export interface service_typeType {
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

export interface supplierType {
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

export interface loggerType {
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
}
export interface product_ImportType {
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

export interface deviceType {
  data: any[];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
  isCreateLoading: boolean;
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
  errors: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
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
}
