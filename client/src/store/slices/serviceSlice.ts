// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '@/env';
import { serviceType } from '../types';

const initialState: serviceType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
  prices: [],
  areas: [],
  serviceTypes: [],
  devices: [],
  listDevices: [],
  isCreateLoading: false,
  isEditLoading: false,
  selectedArea: '',
};

export const getServices = createAsyncThunk(
  'services/index',
  async ({ page, pageSize, query, area }: { page: number; pageSize: number; query: string; area: string }) => {
    const url = new URL('/api/v1/services', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('area', area);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const getAllPrices = createAsyncThunk('services/getAllPrices', async () => {
  try {
    const reponse = await axiosInstance.get(`prices?status=A&all=true`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
});

export const getAllAreas = createAsyncThunk('services/getAllAreas', async () => {
  try {
    const reponse = await axiosInstance.get(`areas?all=true`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
});

export const getAllServiceTypes = createAsyncThunk('services/getAllServiceTypes', async () => {
  try {
    const reponse = await axiosInstance.get(`service_types?status=A&all=true`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
});

export const createService = createAsyncThunk(
  'services/createService',
  async (data: {
    name: string;
    description: string;
    status: string;
    area_active: string;
    price_active: string;
    service_type_active: string;
  }) => {
    try {
      const reponse = await axiosInstance.post(`services`, data);
      return reponse.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const editService = createAsyncThunk(
  'services/editService',
  async (data: {
    active: string;
    name: string;
    description: string;
    status: string;
    area_active: string;
    price_active: string;
    service_type_active: string;
  }) => {
    try {
      const reponse = await axiosInstance.put(`services/${data.active}`, data);
      return reponse.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const changeStatusService = createAsyncThunk(
  'services/changeStatusService',
  async (data: { status: string; active: string }) => {
    try {
      const reponse = await axiosInstance.put(`services/${data.active}/change_status`, { status: data.status });
      return reponse.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const deleteService = createAsyncThunk('services/deleteService', async (active: string) => {
  try {
    const reponse = await axiosInstance.delete(`services/${active}`);
    return reponse.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const serviceSlice: any = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
    },
    setSelectedArea: (state, action) => {
      state.selectedArea = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getServices.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllPrices.fulfilled, (state, action) => {
        state.prices = action.payload.data.result;
      })
      .addCase(getAllAreas.fulfilled, (state, action) => {
        state.areas = action.payload.data.result;
      })
      .addCase(getAllServiceTypes.fulfilled, (state, action) => {
        state.serviceTypes = action.payload.data.result;
      })
      .addCase(createService.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createService.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createService.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(editService.pending, (state, action) => {
        state.isEditLoading = true;
      })
      .addCase(editService.fulfilled, (state, action) => {
        state.isEditLoading = false;
      })
      .addCase(editService.rejected, (state) => {
        state.isEditLoading = false;
      });
  },
});

export const { setPage, setPageSize, setQuery, setSelectedArea } = serviceSlice.actions;

export default serviceSlice.reducer;
