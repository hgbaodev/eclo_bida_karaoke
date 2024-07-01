import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service_device_detailType } from '../types';
import env from '@/env';

const initialState: service_device_detailType = {
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
      .addCase(getServiceDevicesDetail.pending, (state: service_device_detailType) => {
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
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = serviceDeviceSlice.actions;

export default serviceDeviceSlice.reducer;
