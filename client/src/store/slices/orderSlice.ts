// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderType } from '../types';

const initialState: orderType = {
  areas: [],
  isLoading: false,
};

export const getAreas = createAsyncThunk('orders/getAreas', async () => {
  try {
    const response = await axiosInstance.get('/areas/services/all');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
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
      });
  },
});

export default orderSlice.reducer;
