import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axios';
import { kitchen_orderType, kitchenOrder } from '../types';
import env from '@/env';

const initialState: kitchen_orderType = {
  data: [] as kitchenOrder[],
  isLoading: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  isFiltered: false,
  status: '',
  errors: null,
};

// Thunk action để lấy danh sách đơn hàng từ API với tham số `all`
export const getKitchenOrders = createAsyncThunk<any, { all?: boolean }, {}>(
  'kitchen_orders/getKitchenOrders',
  async ({ all }) => {
    const url = new URL('/api/v1/orders/kitchen-orders', env.NEXT_API_URL);
    url.searchParams.set('all', `${all}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Thunk action để đánh dấu đơn hàng thành "Processing" và cập nhật lại trạng thái
export const markKitchenOrderAsProcessing = createAsyncThunk(
  'orders/markKitchenOrderAsProcessing',
  async (active: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/mark-kitchen-order-as-processing/${active}`);
      const { data } = response;
      // Cập nhật lại trạng thái đơn hàng sau khi hoàn thành hành động
      dispatch(markOrderStatus({ active, status: 'P' }));
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
      dispatch(markOrderStatus({ active, status: 'W' }));
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
      dispatch(removeOrder(active));
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
    markOrderStatus: (state, action: PayloadAction<{ active: string; status: string }>) => {
      const { active, status } = action.payload;
      const index = state.data.findIndex((order) => order.active === active);
      if (index !== -1) {
        state.data[index].status = status;
        state.data[index].isLoading = false; // Đặt lại isLoading về false
      }
    },
    appendOrders: (state, action: PayloadAction<{ data: kitchenOrder }>) => {
      const data = action.payload.data;
      console.log(data);
      state.data.push(data);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((order) => order.active !== action.payload);
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
  },
});

export const { setReset, setStatus, setErrors, markOrderStatus, removeOrder, appendOrders } = kitchenOrderSlice.actions;

export default kitchenOrderSlice.reducer;
