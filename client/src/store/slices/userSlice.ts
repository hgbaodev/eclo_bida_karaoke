// roleSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userType } from '../types';

const initialState: userType = {
  fetchData: [],
  fetchDataLoading: false,
};

export const fetchAllUsers = createAsyncThunk('users', async () => {
  try {
    const response = await axiosInstance.get(`users`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.fetchDataLoading = false;
        state.fetchData = action.payload.data;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.fetchDataLoading = false;
      });
  },
});

export default userSlice.reducer;
