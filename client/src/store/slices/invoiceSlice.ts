import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '@/env';
import { invoiceType } from '../types';

const initialState: invoiceType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
};

export const getInvoices = createAsyncThunk(
  'invoice/getInvoices',
  async ({ page, pageSize, query }: { page: number; pageSize: number; query: string }) => {
    const url = new URL('/api/v1/invoices', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

const invoiceSlice = createSlice({
  name: 'invoice',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getInvoices.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, setPageSize, setQuery } = invoiceSlice.actions;

export default invoiceSlice.reducer;
