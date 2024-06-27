// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { attendance } from '../types';
import env from '@/env';
import { EditAttendanceInput } from '@/utils/validators/attendance/edit-attendance-schema';
const initialState: attendance = {
  data: [],
  isLoading: false,
  isFiltered: false,
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getAllAttendances = createAsyncThunk('attendances/getAllAttendances', async (query: string) => {
  const url = new URL('/api/v1/attendances?all=true', env.NEXT_API_URL);
  url.searchParams.set('query', query);
  try {
    const response = await axiosInstance.get(url.href);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createAttendance = createAsyncThunk(
  'attendances/createAttendance',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`attendances`, data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteAttendance = createAsyncThunk(
  'attendances/deleteAttendance',
  async ({ uuid, day }: { uuid: string; day: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`attendances/${uuid}/${day}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateAttendance = createAsyncThunk(
  'attendances/updateAttendance',
  async (attendance: EditAttendanceInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`attendances/`, attendance);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAttendances.pending, (state: attendance) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendances.fulfilled, (state, action) => {
        const returneData = action.payload.data;
        state.isLoading = false;
        state.data = returneData.result;
      })
      .addCase(getAllAttendances.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createAttendance.pending, (state: attendance) => {
        state.isCreateLoading = true;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createAttendance.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateAttendance.pending, (state: attendance) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateAttendance.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export default attendanceSlice.reducer;
