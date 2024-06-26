// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderType } from '../types';

const initialState: orderType = {
  areas: [],
  isLoading: false,
  order: null,
  isLoadingGetOrder: false,
  queryProduct: '',
  isLoadingQueryProduct: false,
  products: [],
};

export const getAreas = createAsyncThunk('orders/getAreas', async () => {
  try {
    const response = await axiosInstance.get('/areas/services/all');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const getOrder = createAsyncThunk('orders/getOrder', async (id: string) => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createOrder = createAsyncThunk('orders/createOrder', async (service_active: string) => {
  try {
    const response = await axiosInstance.post('/orders', { service_active });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getProducts = createAsyncThunk('orders/getProducts', async (query: string) => {
  try {
    const response = await axiosInstance.get(`/products?query=${query}&all=true`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setQueryProduct: (state, action) => {
      state.queryProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAddProduct: (state, action) => {
      const product = action.payload;
      if (state.order) {
        const index = state.order.products.findIndex((item) => item.active === product.active);
        if (index === -1) {
          state.order.products.push(product);
        } else {
          state.order.products[index].quantity = state.order.products[index].quantity + 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.areas = result;
      })
      .addCase(getAreas.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoadingGetOrder = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.data;
        state.isLoadingGetOrder = false;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isLoadingGetOrder = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoadingQueryProduct = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.result;
        state.isLoadingQueryProduct = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoadingQueryProduct = false;
      });
  },
});

export const { setQueryProduct, setProducts, setAddProduct } = orderSlice.actions;

export default orderSlice.reducer;
