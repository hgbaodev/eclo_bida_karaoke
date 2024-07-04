// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { attendance } from '../types';
import env from '@/env';
const currentDate = new Date();
const initialState: attendance = {
  dataAttendance: [],
  isLoading: false,
  isFiltered: false,
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
  query: '',
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getAttendances = createAsyncThunk(
  'attendances/getAllAttendances',
  async ({ month, year }: { month: number; year: number }) => {
    const url = new URL('/api/v1/attendances', env.NEXT_API_URL);
    url.searchParams.set('month', `${month}`);
    url.searchParams.set('year', `${year}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

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
  async (attendance: any, { rejectWithValue }) => {
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

export const Attendance = createAsyncThunk('attendances/Attendance', async (attendance: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`attendances/`, attendance);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
      state.isFiltered = true;
    },
    setYear: (state, action) => {
      state.year = action.payload;
      state.isFiltered = true;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendances.pending, (state: attendance) => {
        state.isLoading = true;
      })
      .addCase(getAttendances.fulfilled, (state, action) => {
        const returneData = action.payload.data;
        state.isLoading = false;
        state.dataAttendance = returneData;
      })
      .addCase(getAttendances.rejected, (state) => {
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
      })
      .addCase(Attendance.pending, (state: attendance) => {
        state.isUpdateLoading = true;
      })
      .addCase(Attendance.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(Attendance.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});
export const { setMonth, setYear, setQuery } = attendanceSlice.actions;

export default attendanceSlice.reducer;
