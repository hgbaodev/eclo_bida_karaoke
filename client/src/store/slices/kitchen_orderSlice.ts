import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axios';
import { kitchen_orderType, kitchenOrder } from '../types';

const initialState: kitchen_orderType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  status: '',
  errors: null,
};

// Thunk action để lấy danh sách đơn hàng từ API
export const getKitchenOrders = createAsyncThunk<any, void, {}>('kitchen_orders/getKitchenOrders', async () => {
  try {
    const response = await axiosInstance.get('/orders/kitchen-orders');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Thunk action để đánh dấu đơn hàng thành "Processing" và cập nhật lại trạng thái
export const markKitchenOrderAsProcessing = createAsyncThunk(
  'orders/markKitchenOrderAsProcessing',
  async (active: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-processing/${active}`);
      const { data } = response;
      // Cập nhật lại trạng thái đơn hàng sau khi hoàn thành hành động
      dispatch(markOrderAsProcessed({ active, status: 'P' }));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action để đánh dấu đơn hàng thành "Waiting" và cập nhật lại trạng thái
export const markKitchenOrderAsWaiting = createAsyncThunk(
  'orders/markKitchenOrderAsWaiting',
  async (active: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-waiting/${active}`);
      const { data } = response;
      // Cập nhật lại trạng thái đơn hàng sau khi hoàn thành hành động
      dispatch(markOrderAsWaited({ active, status: 'W' }));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action để đánh dấu đơn hàng thành "Done" và cập nhật lại trạng thái
export const markKitchenOrderAsDone = createAsyncThunk(
  'orders/markKitchenOrderAsDone',
  async (active: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-done/${active}`);
      const { data } = response;
      // Cập nhật lại trạng thái đơn hàng sau khi hoàn thành hành động
      dispatch(markOrderAsFinished({ active, status: 'D' }));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const kitchenOrderSlice = createSlice({
  name: 'kitchen_order',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string | null>) => {
      state.errors = action.payload;
    },
    setReset: (state) => {
      state.status = '';
      state.isFiltered = false;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
      state.isFiltered = true;
    },
    markOrderAsProcessed: (state, action: PayloadAction<{ active: string; status: string }>) => {
      const { active, status } = action.payload;
      const index = state.data.findIndex((order) => order.active === active);
      if (index !== -1) {
        state.data[index].status = status;
        state.data[index].isLoading = false; // Đặt lại isLoading về false
      }
    },
    markOrderAsWaited: (state, action: PayloadAction<{ active: string; status: string }>) => {
      const { active, status } = action.payload;
      const index = state.data.findIndex((order) => order.active === active);
      if (index !== -1) {
        state.data[index].status = status;
        state.data[index].isLoading = false; // Đặt lại isLoading về false
      }
    },
    markOrderAsFinished: (state, action: PayloadAction<{ active: string; status: string }>) => {
      const { active, status } = action.payload;
      const index = state.data.findIndex((order) => order.active === active);
      if (index !== -1) {
        state.data[index].status = status;
        state.data[index].isLoading = false; // Đặt lại isLoading về false
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKitchenOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKitchenOrders.fulfilled, (state, action: PayloadAction<{ data: kitchenOrder[] }>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getKitchenOrders.rejected, (state) => {
        state.isLoading = false;
      });
    /*
      .addCase(markKitchenOrderAsProcessing.pending, (state, action) => {})
      .addCase(markKitchenOrderAsProcessing.fulfilled, (state, action) => {})
      .addCase(markKitchenOrderAsProcessing.rejected, (state, action) => {})
      .addCase(markKitchenOrderAsWaiting.pending, (state, action) => {})
      .addCase(markKitchenOrderAsWaiting.fulfilled, (state, action) => {})
      .addCase(markKitchenOrderAsWaiting.rejected, (state, action) => {})
      .addCase(markKitchenOrderAsDone.pending, (state, action) => {})
      .addCase(markKitchenOrderAsDone.fulfilled, (state, action) => {})
      .addCase(markKitchenOrderAsDone.rejected, (state, action) => {})*/
  },
});

export const { setReset, setStatus, setErrors, markOrderAsProcessed, markOrderAsWaited, markOrderAsFinished } =
  kitchenOrderSlice.actions;

export default kitchenOrderSlice.reducer;
