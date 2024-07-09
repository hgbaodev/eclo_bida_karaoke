// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service_typeType } from '../types';
import env from '@/env';
import { EditServiceTypeInput } from '@/utils/validators/service-type/edit-service_type.schema';

const initialState: service_typeType = {
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

export const getServiceTypes = createAsyncThunk(
  'service_types',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: string }) => {
    const url = new URL('/api/v1/service_types', env.NEXT_API_URL);
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

export const createServiceType = createAsyncThunk(
  'service_types/createService_type',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`service_types`, data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateServiceType = createAsyncThunk(
  'service_types/updateService_type',
  async ({ service_type, active }: { service_type: EditServiceTypeInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`service_types/${active}`, service_type);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteServiceType = createAsyncThunk(
  'service_types/deleteServiceType',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`service_types/${active}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const serviceTypeSlice = createSlice({
  name: 'service_type',
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
      .addCase(getServiceTypes.pending, (state: service_typeType) => {
        state.isLoading = true;
      })
      .addCase(getServiceTypes.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getServiceTypes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createServiceType.pending, (state: service_typeType) => {
        state.isCreateLoading = true;
      })
      .addCase(createServiceType.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createServiceType.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateServiceType.pending, (state: service_typeType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateServiceType.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateServiceType.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = serviceTypeSlice.actions;

export default serviceTypeSlice.reducer;
