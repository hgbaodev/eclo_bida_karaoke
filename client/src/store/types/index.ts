export interface RootState {
  auth: authType;
  role: roleType;
  user: userType;
  logger: loggerType;
  area: areaType;
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

export interface loggerType {
  data: any[];
  isLoading: boolean;
  isFiltered: boolean;
  page: number;
  pageSize: number;
  totalRow: number;
  query: string;
}

interface area {
  name: string;
  description: string;
  active: string;
}
export interface areaType {
  data: any[];
  isCreateLoading: boolean;
  isEditLoading: boolean;
}
