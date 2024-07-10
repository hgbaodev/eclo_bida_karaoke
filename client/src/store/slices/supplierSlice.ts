// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supplierType } from '../types';
import { EditSupplierInput } from '@/utils/validators/supplier/edit-supplier.schema';
import env from '@/env';

const initialState: supplierType = {
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
  listSupplier: [],
};

export const getSuppliers = createAsyncThunk(
  'suppliers',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: string }) => {
    const url = new URL('/api/v1/suppliers', env.NEXT_API_URL);
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

export const getSinghle_Supplier = createAsyncThunk('supplier/getAllSupplier', async () => {
  try {
    const response = await axiosInstance.get('suppliers');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
export const createSupplier = createAsyncThunk('suppliers/createSupplier', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`suppliers`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateSupplier = createAsyncThunk(
  'suppliers/updateSupplier',
  async ({ supplier, active }: { supplier: EditSupplierInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`suppliers/${active}`, supplier);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`suppliers/${active}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const supplierSlice = createSlice({
  name: 'supplier',
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
      .addCase(getSuppliers.pending, (state: supplierType) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getSuppliers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSinghle_Supplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinghle_Supplier.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.listSupplier = result.result;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getSinghle_Supplier.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createSupplier.pending, (state: supplierType) => {
        state.isCreateLoading = true;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createSupplier.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateSupplier.pending, (state: supplierType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateSupplier.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = supplierSlice.actions;

export default supplierSlice.reducer;
