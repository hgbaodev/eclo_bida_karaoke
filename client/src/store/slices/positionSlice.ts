// positonSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { positionType } from '../types';

const initialState: positionType = {
  fetchData: [],
  fetchDataLoading: false,
  createLoading: false,
  updateLoading: false,
  listPositions: [],
};

export const getPositions = createAsyncThunk('positions', async () => {
  try {
    const response = await axiosInstance.get('positions');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createPosition = createAsyncThunk('positions/createPosition', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`positions`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deletePosition = createAsyncThunk('positions/deletePosition', async (id: number, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`positions/${id}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updatePosition = createAsyncThunk(
  'positions/updatePosition',
  async (value: { id: number; functionals: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`positions/${value.id}`, value);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPositions.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(getPositions.fulfilled, (state, action) => {
        state.fetchDataLoading = false;
        state.fetchData = action.payload.data;
        const result = action.payload.data;
        state.listPositions = result.result;
      })
      .addCase(getPositions.rejected, (state) => {
        state.fetchDataLoading = false;
      })
      .addCase(createPosition.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.createLoading = false;
        state.fetchData = [...state.fetchData, action.payload.data];
      })
      .addCase(createPosition.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.fetchData = state.fetchData.filter((position) => position.id !== action.payload.data.id);
      })
      .addCase(updatePosition.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.updateLoading = false;
        const result = action.payload.data;
        const index = state.fetchData.findIndex((position) => position.id == result.id);
        if (index !== -1) {
          state.fetchData[index].functionals = result.functionals;
        } else {
          console.error('Position not found in state.fetchData');
        }
      })
      .addCase(updatePosition.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});

export default positionSlice.reducer;
