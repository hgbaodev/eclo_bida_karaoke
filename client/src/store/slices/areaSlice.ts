// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { areaType } from '../types';

const initialState: areaType = {
  data: [],
  isCreateLoading: false,
  isEditLoading: false,
};

export const getAreas = createAsyncThunk('areas', async () => {
  try {
    const response = await axiosInstance.get('/areas');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createArea = createAsyncThunk(
  'areas/createArea',
  async (data: { name: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/areas', data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const editArea = createAsyncThunk(
  'areas/editArea',
  async (data: { name: string; description: string; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/areas/${data.active}`, data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(createArea.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createArea.fulfilled, (state, action) => {
        state.isCreateLoading = false;
        state.data.push(action.payload.data);
      })
      .addCase(createArea.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(editArea.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editArea.fulfilled, (state, action) => {
        state.isEditLoading = false;
        const index = state.data.findIndex((area) => area.active === action.payload.data.active);
        state.data[index] = action.payload.data;
      })
      .addCase(editArea.rejected, (state) => {
        state.isEditLoading = false;
      });
  },
});

export const {} = areaSlice.actions;

export default areaSlice.reducer;
