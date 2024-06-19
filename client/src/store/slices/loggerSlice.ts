import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loggerType } from '../types';
import env from '@/env';

const initialState: loggerType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
};

export const getLoggers = createAsyncThunk(
  'loggers',
  async ({ page, pageSize, query }: { page: number; pageSize: number; query: string }) => {
    const url = new URL('/api/v1/loggers', env.NEXT_API_URL);
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

const loggerSlice = createSlice({
  name: 'logger',
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
    addLogger: (state, action) => {
      state.data = [action.payload, ...state.data];
      if (state.data.length > state.pageSize) {
        state.data.pop();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggers.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getLoggers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, setPageSize, setQuery, addLogger } = loggerSlice.actions;

export default loggerSlice.reducer;
