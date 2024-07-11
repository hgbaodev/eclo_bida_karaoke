import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service_device_detail_type } from '../types';
import { EditServiceDeviceDetailInput } from '@/utils/validators/service-device-detail/edit-service-device-detail.schema';
import { CreateServiceDeviceDetailInput } from '@/utils/validators/service-device-detail/create-service-device-detail.schema';

import env from '@/env';

const initialState: service_device_detail_type = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  status: '',
  query: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getServiceDevicesDetail = createAsyncThunk(
  'getServiceDevicesDetail',
  async ({
    page,
    pageSize,
    query,
    status,
    serviceActive,
  }: {
    page: number;
    pageSize: number;
    query: string;
    status: string;
    serviceActive: string;
  }) => {
    const url = new URL('/api/v1/service-device-detail', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('status', `${status}`);
    url.searchParams.set('serviceActive', `${serviceActive}`);

    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const updateServiceDeviceDetail = createAsyncThunk(
  'updateServiceDeviceDetail',
  async ({ device, active }: { device: EditServiceDeviceDetailInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`service-device-detail/${active}`, device);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const createServiceDeviceDetail = createAsyncThunk(
  'createServiceDeviceDetail',
  async ({ serviceDeviceDetail }: { serviceDeviceDetail: CreateServiceDeviceDetailInput }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`service-device-detail/`, serviceDeviceDetail);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteServiceDeviceDetail = createAsyncThunk(
  'deleteServiceDeviceDetail',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`service-device-detail/${active}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const serviceDeviceSlice = createSlice({
  name: 'service_device_detail',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setQuery: (state, action) => {
      state.page = 1;
      state.query = action.payload;
    },
    setErrors: (state, action) => {
      state.page = 1;
      state.errors = action.payload;
    },
    setReset: (state) => {
      state.page = 1;
      state.status = '';
      state.isFiltered = false;
    },
    setStatus: (state, action) => {
      state.page = 1;
      state.status = action.payload;
      state.isFiltered = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceDevicesDetail.pending, (state: service_device_detail_type) => {
        state.isLoading = true;
      })
      .addCase(getServiceDevicesDetail.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getServiceDevicesDetail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateServiceDeviceDetail.pending, (state: service_device_detail_type) => {
        state.isLoading = true;
      })
      .addCase(updateServiceDeviceDetail.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateServiceDeviceDetail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createServiceDeviceDetail.pending, (state: service_device_detail_type) => {
        state.isLoading = true;
      })
      .addCase(createServiceDeviceDetail.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(createServiceDeviceDetail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteServiceDeviceDetail.pending, (state: service_device_detail_type) => {
        state.isLoading = true;
      })
      .addCase(deleteServiceDeviceDetail.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(deleteServiceDeviceDetail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = serviceDeviceSlice.actions;

export default serviceDeviceSlice.reducer;
