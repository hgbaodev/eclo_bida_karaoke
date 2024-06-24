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

export const updateKitchenOrder = createAsyncThunk(
  'orders/updateKitchenOrder',
  async ({ product, active }: { product: any; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/kitchen-orders/${active}`, product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const markKitchenOrderAsProcessing = createAsyncThunk(
  'orders/markKitchenOrderAsProcessing',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-processing/${active}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const markKitchenOrderAsWaiting = createAsyncThunk(
  'orders/markKitchenOrderAsWaiting',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-waiting/${active}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const markKitchenOrderAsDone = createAsyncThunk(
  'orders/markKitchenOrderAsDone',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-done/${active}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteKitchenOrder = createAsyncThunk(
  'orders/deleteKitchenOrder',
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
      .addCase(updateKitchenOrder.pending, (state: kitchen_orderType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateKitchenOrder.fulfilled, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateKitchenOrder.rejected, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(markKitchenOrderAsProcessing.pending, (state: kitchen_orderType) => {
        state.isLoading = true;
      })
      .addCase(markKitchenOrderAsProcessing.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(markKitchenOrderAsProcessing.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(markKitchenOrderAsWaiting.pending, (state: kitchen_orderType) => {
        state.isLoading = true;
      })
      .addCase(markKitchenOrderAsWaiting.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(markKitchenOrderAsWaiting.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(markKitchenOrderAsDone.pending, (state: kitchen_orderType) => {
        state.isLoading = true;
      })
      .addCase(markKitchenOrderAsDone.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(markKitchenOrderAsDone.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setReset, setStatus, setErrors } = kitchenOrderSlice.actions;

export default kitchenOrderSlice.reducer;
