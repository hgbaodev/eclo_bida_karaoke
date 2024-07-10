// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { priceType } from '../types';
import { EditPriceInput } from '@/utils/validators/price/edit-price.schema';
import env from '@/env';

const initialState: priceType = {
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

export const getPrices = createAsyncThunk(
  'prices',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: string }) => {
    const url = new URL('/api/v1/prices', env.NEXT_API_URL);
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

export const createPrice = createAsyncThunk('prices/createPrice', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`prices`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updatePrice = createAsyncThunk(
  'prices/updatePrice',
  async ({ price, active }: { price: EditPriceInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`prices/${active}`, price);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deletePrice = createAsyncThunk('prices/deletePrice', async (active: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`prices/${active}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const priceSlice = createSlice({
  name: 'price',
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
      .addCase(getPrices.pending, (state: priceType) => {
        state.isLoading = true;
      })
      .addCase(getPrices.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getPrices.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPrice.pending, (state: priceType) => {
        state.isCreateLoading = true;
      })
      .addCase(createPrice.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createPrice.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updatePrice.pending, (state: priceType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updatePrice.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = priceSlice.actions;

export default priceSlice.reducer;
