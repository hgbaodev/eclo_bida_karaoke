// roleSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roleType } from '../types';

const initialState: roleType = {
  fetchData: [],
  fetchDataLoading: false,
};

export const fetchAllRoles = createAsyncThunk('roles', async () => {
  try {
    const response = await axiosInstance.get(`roles`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.fetchDataLoading = false;
        state.fetchData = action.payload.data;
      })
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.fetchDataLoading = false;
      });
  },
});

export default roleSlice.reducer;
