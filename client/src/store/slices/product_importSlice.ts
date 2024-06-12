// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { product_ImportType } from '../types';
import env from '@/env';
import { EditProduc_ImporttInput } from '@/utils/validators/edit-product_import.schema';
const initialState: product_ImportType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
  product:'',
  supplier:'',
};

export const getProductImports= createAsyncThunk(
  'products',
  async ({ page, pageSize, query }: { page: number; pageSize: number; query: string }) => {
    const url = new URL('/api/v1/product_imports', env.NEXT_API_URL);
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

export const createProduct = createAsyncThunk('product_imports/createProductImport', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`product_imports`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteProduct = createAsyncThunk('product_imports/deleteProductImport', async (active: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`product_imports/${active}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk('product_imports/updateProductImport',async ({ product_import, active }: { product_import: EditProduc_ImporttInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`product_imports/${active}`, product_import);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const product_importSlices = createSlice({
  name: 'product_import',
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
    setReset: (state) => {
      
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductImports.pending, (state: product_ImportType) => {
        state.isLoading = true;
      })
      .addCase(getProductImports.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getProductImports.rejected, (state) => {
        state.isLoading = false;
      })
   
      .addCase(createProduct.pending, (state: product_ImportType) => {
        state.isCreateLoading = true;
      })
      .addCase(createProduct.fulfilled, (state,action) => {
        state.isCreateLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateProduct.pending, (state: product_ImportType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setErrors } = product_importSlices.actions;

export default product_importSlices.reducer;