// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '@/env';
import { deviceType } from '../types';

const initialState: deviceType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  status: '',
  pageSize: 5,
  errors: '',
  query: '',
  isCreateLoading: false,
};

export const getDevices = createAsyncThunk(
  'devices',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: any }) => {
    const url = new URL('/api/v1/devices', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('status', `${status}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const createDevice = createAsyncThunk('areas/createDevice', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/devices', data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setQuery: (state, action) => {
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
      .addCase(getDevices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getDevices.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createDevice.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createDevice.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createDevice.rejected, (state) => {
        state.isCreateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setQuery, setReset, setStatus } = deviceSlice.actions;

export default deviceSlice.reducer;
