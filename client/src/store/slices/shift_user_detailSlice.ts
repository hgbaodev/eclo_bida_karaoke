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
  workshift: '',
  errors: '',
  listShiftUserDetail: [],
  listShiftUserDetailByUser: [],
};

export const getAllShiftUserDetails = createAsyncThunk('shiftuserdetails/getAllShiftUserDetail', async () => {
  try {
    const response = await axiosInstance.get('shiftuserdetails');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const getShiftUserDetails = createAsyncThunk('shiftuserdetail', async (workshift: string) => {
  const url = new URL('/api/v1/shiftuserdetails', env.NEXT_API_URL);
  url.searchParams.set('workshift', `${workshift}`);
  try {
    const response = await axiosInstance.get(url.href);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const getShiftUserDetailsByUser = createAsyncThunk(
  'shiftuserdetailbyuser',
  async ({ workshift, staff }: { workshift: string; staff: string }) => {
    const url = new URL('/api/v1/shiftuserdetails', env.NEXT_API_URL);
    url.searchParams.set('workshift', `${workshift}`);
    url.searchParams.set('staff', `${staff}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const createShiftUserDetail = createAsyncThunk(
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
export const createShiftUserDetailByWorkShift = createAsyncThunk(
  'shiftuserdetails/createShiftUserDetailByWorkShift',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`shiftuserdetails/workshift`, data);
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
      const response = await axiosInstance.delete(`shiftuserdetails/${active}`);
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
    setWorkShift: (state, action) => {
      state.workshift = action.payload;
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
      state.workshift = '';
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createShiftUserDetail.pending, (state: shift_user_detailType) => {
        state.isCreateLoading = true;
      })
      .addCase(createShiftUserDetail.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createShiftUserDetail.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createShiftUserDetailByWorkShift.pending, (state: shift_user_detailType) => {
        state.isCreateLoading = true;
      })
      .addCase(createShiftUserDetailByWorkShift.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createShiftUserDetailByWorkShift.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(getAllShiftUserDetails.pending, (state: shift_user_detailType) => {
        state.isLoading = true;
      })
      .addCase(getAllShiftUserDetails.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result;
        state.listShiftUserDetail = result;
      })
      .addCase(getAllShiftUserDetails.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getShiftUserDetailsByUser.pending, (state: shift_user_detailType) => {
        state.isLoading = true;
      })
      .addCase(getShiftUserDetailsByUser.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.listShiftUserDetailByUser = result;
      })
      .addCase(getShiftUserDetailsByUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getShiftUserDetails.pending, (state: shift_user_detailType) => {
        state.isLoading = true;
      })
      .addCase(getShiftUserDetails.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.listShiftUserDetail = result;
      })
      .addCase(getShiftUserDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setShift, setPage, setPageSize, setReset, setDayOfWeek, setQuery, setErrors, setWorkShift } =
  shiftUserDetailSlice.actions;

export default shiftUserDetailSlice.reducer;
