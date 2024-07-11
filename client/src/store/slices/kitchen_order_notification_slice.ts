import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { kitchen_order_notification_type } from '../types';

const initialState: kitchen_order_notification_type = {
  data: [],
  isLoading: false,
  errors: null,
};

const kitchenOrderNotificationSlice = createSlice({
  name: 'kitchen_order_notification',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string | null>) => {
      state.errors = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    appendNoti: (state, action: PayloadAction<any>) => {
      //@ts-ignore
      state.data.push(action.payload);
      state.isLoading = false; // Reset loading state after appending notification
    },
    removeNoti: (state, action: PayloadAction<string>) => {
      //@ts-ignore
      state.data = state.data.filter((noti) => noti.active !== action.payload);
      state.isLoading = false;
    },
  },
});

export const { setErrors, setIsLoading, appendNoti, removeNoti } = kitchenOrderNotificationSlice.actions;

export default kitchenOrderNotificationSlice.reducer;
