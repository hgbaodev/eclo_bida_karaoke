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
  queryCustomer: '',
  isLoadingQueryCustomer: false,
  customers: [],
  isLoadingPayOrder: false,
  isLoadingUpdateOrder: false,
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

export const getCustomer = createAsyncThunk('orders/getCustomer', async (query: string) => {
  try {
    const response = await axiosInstance.get(`/customers?query=${query}&all=true`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const payOrder = createAsyncThunk('orders/payOrder', async (data: any) => {
  try {
    const response = await axiosInstance.post(`/orders/${data.order_active}/pay`, data);
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const updateOrder = createAsyncThunk('orders/updateOrder', async (data: any) => {
  try {
    const response = await axiosInstance.post(`/orders/${data.order_active}/update`, data);
    if (response) {
      return response.data;
    }
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
    setQueryCustomer: (state, action) => {
      state.queryCustomer = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
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
        const newOrder = state.order;
        state.order = newOrder;
      }
    },
    changeQuantity: (state, action) => {
      const { active, quantity } = action.payload;
      if (state.order) {
        const index = state.order.products.findIndex((item) => item.active === active);
        if (index !== -1) {
          state.order.products[index].quantity = quantity;
          if (quantity == '0') {
            state.order.products.splice(index, 1);
          }
        }
      }
    },
    setCustomer: (state, action) => {
      if (state.order) {
        state.order.customer = action.payload;
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
        if (state.order) {
          state.queryCustomer =
            state.order.customer != null ? state.order.customer.first_name + ' ' + state.order.customer.last_name : '';
        }
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
      })
      .addCase(getCustomer.pending, (state) => {
        state.isLoadingQueryCustomer = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customers = action.payload.data.result;
        state.isLoadingQueryCustomer = false;
      })
      .addCase(getCustomer.rejected, (state) => {
        state.isLoadingQueryCustomer = false;
      })
      .addCase(payOrder.pending, (state) => {
        state.isLoadingPayOrder = true;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.isLoadingPayOrder = false;
      })
      .addCase(payOrder.rejected, (state) => {
        state.isLoadingPayOrder = false;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoadingUpdateOrder = true;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.isLoadingUpdateOrder = false;
      })
      .addCase(updateOrder.rejected, (state) => {
        state.isLoadingUpdateOrder = false;
      });
  },
});

export const {
  setQueryProduct,
  setProducts,
  setAddProduct,
  changeQuantity,
  setQueryCustomer,
  setCustomers,
  setCustomer,
} = orderSlice.actions;

export default orderSlice.reducer;
