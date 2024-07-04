// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dayoffType } from '../types';
import { CreateDayOffInput } from '@/utils/validators/dayoff/create-dayoff-schema';
import env from '@/env';

const initialState: dayoffType = {
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

export const getDayoffs = createAsyncThunk(
  'dayoff',
  async ({ page, pageSize, query }: { page: number; pageSize: number; query: string }) => {
    const url = new URL('/api/v1/day_offs', env.NEXT_API_URL);
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

export const createDayoff = createAsyncThunk('day_offs/createDayoff', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`day_offs`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateDayoff = createAsyncThunk(
  'day_offs/updateDayoff',
  async ({ dayoff, active }: { dayoff: CreateDayOffInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`day_offs/${active}`, dayoff);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteDayoff = createAsyncThunk('day_offs/deleteDayoff', async (active: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`day_offs/${active}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const dayoffSlice = createSlice({
  name: 'dayoff',
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
      .addCase(getDayoffs.pending, (state: dayoffType) => {
        state.isLoading = true;
      })
      .addCase(getDayoffs.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getDayoffs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createDayoff.pending, (state: dayoffType) => {
        state.isCreateLoading = true;
      })
      .addCase(createDayoff.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createDayoff.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateDayoff.pending, (state: dayoffType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateDayoff.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateDayoff.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = dayoffSlice.actions;

export default dayoffSlice.reducer;
