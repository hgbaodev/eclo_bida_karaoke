import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axios';
import { kitchen_orderType } from '../types';

const initialState: kitchen_orderType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  page: 1,
  pageSize: 5,
  status: '',
  query: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getKitchenOrders = createAsyncThunk<any, void, {}>('kitchen_orders/getKitchenOrders', async () => {
  try {
    const response = await axiosInstance.get('/orders/kitchen-orders');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createKitchenOrder = createAsyncThunk(
  'kitchen_orders/createKitchenOrder',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/orders/kitchen-orders', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateKitchenOrder = createAsyncThunk(
  'kitchen_orders/updateKitchenOrder',
  async ({ product, active }: { product: any; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/kitchen-orders/${active}`, product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteKitchenOrder = createAsyncThunk(
  'kitchen_orders/deleteKitchenOrder',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/orders/kitchen-orders/${active}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const kitchenOrderSlice = createSlice({
  name: 'kitchen_order',
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
      .addCase(getKitchenOrders.pending, (state: kitchen_orderType) => {
        state.isLoading = true;
      })
      .addCase(getKitchenOrders.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result;
      })
      .addCase(getKitchenOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createKitchenOrder.pending, (state: kitchen_orderType) => {
        state.isCreateLoading = true;
      })
      .addCase(createKitchenOrder.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createKitchenOrder.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateKitchenOrder.pending, (state: kitchen_orderType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateKitchenOrder.fulfilled, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateKitchenOrder.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});
export const { setReset, setStatus, setErrors } = kitchenOrderSlice.actions;

export default kitchenOrderSlice.reducer;
