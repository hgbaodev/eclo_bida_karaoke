export interface RootState {
  auth: authType;
  role: roleType;
  user: userType;
  logger: loggerType;
  customer: customerType;
  area: areaType;
  device: deviceType;
  position: positionType;
  staff: staffType;
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

export interface loggerType {
  data: any[];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
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
  fetchData: any[];
  fetchDataLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  listPositions: any[];
}
