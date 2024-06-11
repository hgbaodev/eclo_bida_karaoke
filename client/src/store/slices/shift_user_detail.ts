// positonSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shift_user_detailType } from '../types';
import env from '@/env';
const initialState: shift_user_detailType = {
  data: [],
  isLoading: false,
  isCreateLoading: false,
  isUpdateLoading: false,
  isFiltered: false,
  page: 1,
  pageSize: 5,
  totalRow: 0,
  query: '',
  day_of_week: '',
  shift: '',
  errors: '',
  listShiftUserDetail: [],
};

export const getAllShiftUserDetails = createAsyncThunk('shiftuserdetails/getAllShiftUserDetail', async () => {
  try {
    const response = await axiosInstance.get('shiftuserdetails');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createShiftDetail = createAsyncThunk(
  'shiftuserdetails/createShiftDetail',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`shiftuserdetails`, data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteShiftUserDetail = createAsyncThunk(
  'shiftuserdetails/deleteShiftUserDetail',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`shiftuserdetailss/${active}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const shiftUserDetailSlice = createSlice({
  name: 'shiftuserdetail',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setQuery: (state, action) => {
      state.page = 1;
      state.query = action.payload;
    },
    setShift: (state, action) => {
      state.shift = action.payload;
      state.isFiltered = true;
    },
    setDayOfWeek: (state, action) => {
      state.page = 1;
      state.isFiltered = true;
    },
    setReset: (state) => {
      state.page = 1;
      state.day_of_week = '';
      state.shift = '';
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createShiftDetail.pending, (state: shift_user_detailType) => {
        state.isCreateLoading = true;
      })
      .addCase(createShiftDetail.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createShiftDetail.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(getAllShiftUserDetails.pending, (state: shift_user_detailType) => {
        state.isLoading = true;
      })
      .addCase(getAllShiftUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.data = result;
        state.listShiftUserDetail = result;
      })
      .addCase(getAllShiftUserDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setShift, setPage, setPageSize, setReset, setDayOfWeek, setQuery, setErrors } =
  shiftUserDetailSlice.actions;

export default shiftUserDetailSlice.reducer;
