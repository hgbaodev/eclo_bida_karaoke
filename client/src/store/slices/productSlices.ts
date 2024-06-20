// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productType } from '../types';
import env from '@/env';
import { EditProductInput } from '@/utils/validators/edit-product.schema';
const initialState: productType = {
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
  listProduct:[],
};

export const getProducts= createAsyncThunk(
  'products',
  async ({ page, pageSize, query }: { page: number; pageSize: number; query: string }) => {
    const url = new URL('/api/v1/products', env.NEXT_API_URL);
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
export const getSinghle_Product = createAsyncThunk('product/getAllProduct', async () => {
  try {
    const response = await axiosInstance.get('products');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
export const createProduct = createAsyncThunk('products/createProduct', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`products`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (active: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`products/${active}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct',async ({ product, active }: { product: EditProductInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`products/${active}`, product);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const productSlices = createSlice({
  name: 'product',
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
      .addCase(getProducts.pending, (state: productType) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSinghle_Product.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinghle_Product.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.listProduct = result.result;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getSinghle_Product.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createProduct.pending, (state: productType) => {
        state.isCreateLoading = true;
      })
      .addCase(createProduct.fulfilled, (state,action) => {
        state.isCreateLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateProduct.pending, (state: productType) => {
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

export const { setPage, setPageSize, setReset, setQuery, setErrors } = productSlices.actions;

export default productSlices.reducer;