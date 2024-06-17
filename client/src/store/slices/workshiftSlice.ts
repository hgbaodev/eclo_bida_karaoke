// positonSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { work_shiftType } from '../types';
import { env } from 'process';
const initialState: work_shiftType = {
  data: [],
  isLoading: false,
  isCreateLoading: false,
  isUpdateLoading: false,
  isFiltered: false,
  oneWorkShift: '',
};

export const getAllWorkShifts = createAsyncThunk('workshifts/getAllWorkShift', async () => {
  try {
    const response = await axiosInstance.get('workshifts');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
export const getWorkShift = createAsyncThunk('workshifts', async (active: string) => {
  try {
    const response = await axiosInstance.get('workshifts/' + active);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createWorkShift = createAsyncThunk(
  'workshifts/createShiftDetail',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`workshifts`, data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const workShiftSlice = createSlice({
  name: 'workshift',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkShift.pending, (state: work_shiftType) => {
        state.isCreateLoading = true;
      })
      .addCase(createWorkShift.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createWorkShift.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(getAllWorkShifts.pending, (state: work_shiftType) => {
        state.isLoading = true;
      })
      .addCase(getAllWorkShifts.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result;
      })
      .addCase(getAllWorkShifts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getWorkShift.pending, (state: work_shiftType) => {
        state.isLoading = true;
      })
      .addCase(getWorkShift.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.oneWorkShift = result;
      })
      .addCase(getWorkShift.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default workShiftSlice.reducer;
