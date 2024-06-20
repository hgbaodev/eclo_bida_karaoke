import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axios';
import { requested_productsType } from '../types';

const initialState: requested_productsType = {
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

export const getRequestedProducts = createAsyncThunk<any, void, {}>(
  'requested_products/getRequestedProducts',
  async () => {
    try {
      const response = await axiosInstance.get('/orders/requested-products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const createRequestedProduct = createAsyncThunk(
  'requested_products/createRequestedProduct',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/orders/requested-products', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateRequestedProduct = createAsyncThunk(
  'requested_products/updateRequestedProduct',
  async ({ product, id }: { product: any; id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/requested-products/${id}`, product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteRequestedProduct = createAsyncThunk(
  'requested_products/deleteRequestedProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/orders/requested-products/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const orderRequestedProductsSlice = createSlice({
  name: 'requested_products',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setReset: (state) => {
      state.status = '';
      state.isFiltered = false;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.isFiltered = true;
    },
    updateRequestedProducts: (state, action: PayloadAction<any>) => {
      const updatedProducts = action.payload.requestedProduct;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequestedProducts.pending, (state: requested_productsType) => {
        state.isLoading = true;
      })
      .addCase(getRequestedProducts.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result;
        // state.totalRow = result.meta.total;
      })
      .addCase(getRequestedProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createRequestedProduct.pending, (state: requested_productsType) => {
        state.isCreateLoading = true;
      })
      .addCase(createRequestedProduct.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createRequestedProduct.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateRequestedProduct.pending, (state: requested_productsType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateRequestedProduct.fulfilled, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateRequestedProduct.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});
export const { setReset, setStatus, setErrors, updateRequestedProducts } = orderRequestedProductsSlice.actions;

export default orderRequestedProductsSlice.reducer;
