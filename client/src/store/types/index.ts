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
}

export interface RootState {
  auth: authType;
  role: roleType;
  user: userType;
}

export interface userType {
  fetchData: any[];
  fetchDataLoading: boolean;
}
