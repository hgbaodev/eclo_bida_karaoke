// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerType } from '../types';
import { EditCustomerInput } from '@/utils/validators/edit-customer.schema';
import env from '@/env';

const initialState: customerType = {
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

export const getCustomers = createAsyncThunk(
  'customers',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: string }) => {
    const url = new URL('/api/v1/customers', env.NEXT_API_URL);
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

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ customer, active }: { customer: EditCustomerInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`customers/${active}`, customer);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const customerSlice = createSlice({
  name: 'customer',
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
      state.errors = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.isFiltered = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state: customerType) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getCustomers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCustomer.pending, (state: customerType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setQuery, setStatus, setErrors } = customerSlice.actions;

export default customerSlice.reducer;
