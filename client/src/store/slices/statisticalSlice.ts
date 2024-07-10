// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { statisticalType } from '../types';

const initialState: statisticalType = {
  dataOverview: [],
  isLoadingOverView: false,
  dataStats: [],
  selectedStats: 'week',
  revenueEx: null,
  isRevenueExLoading: false,
};

export const getOverview = createAsyncThunk('statistical/getOverview', async () => {
  try {
    const response = await axiosInstance.get(`/statistical/over-view`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const getStatTime = createAsyncThunk('statistical/getStatTime', async (query: string) => {
  try {
    const response = await axiosInstance.get(`/statistical/time?time=${query}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const getRevenueEx = createAsyncThunk(
  'statistical/getRevenueEx',
  async (data: { start_day: string; end_day: string }) => {
    try {
      const response = await axiosInstance.post(`/statistical/revenue-ex`, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

const statisticalSlice = createSlice({
  name: 'statistical',
  initialState,
  reducers: {
    setSelectedStats: (state, action) => {
      state.selectedStats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOverview.pending, (state) => {
        state.isLoadingOverView = true;
      })
      .addCase(getOverview.fulfilled, (state, action) => {
        state.dataOverview = action.payload.data;
        state.isLoadingOverView = false;
      })
      .addCase(getOverview.rejected, (state) => {
        state.isLoadingOverView = false;
      })
      .addCase(getStatTime.fulfilled, (state, action) => {
        state.dataStats = action.payload.data;
      })
      .addCase(getRevenueEx.pending, (state) => {
        state.isRevenueExLoading = true;
      })
      .addCase(getRevenueEx.fulfilled, (state, action) => {
        state.revenueEx = action.payload.data;
        state.isRevenueExLoading = false;
      })
      .addCase(getRevenueEx.rejected, (state) => {
        state.isRevenueExLoading = false;
      });
  },
});

export const { setSelectedStats } = statisticalSlice.actions;

export default statisticalSlice.reducer;
