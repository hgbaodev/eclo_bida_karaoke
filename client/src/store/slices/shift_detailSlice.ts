// positonSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shift_detailType } from '../types';
import env from '@/env';
import { EditShiftDetailInput } from '@/utils/validators/shift-detail/edit-shift_detail.schema';
const initialState: shift_detailType = {
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
};
export const getAllShiftDetails = createAsyncThunk(
  'shiftdetails',
  async ({
    page,
    pageSize,
    query,
    shift,
    day_of_week,
  }: {
    page: number;
    pageSize: number;
    query: string;
    shift: string;
    day_of_week: string;
  }) => {
    const url = new URL('/api/v1/shiftdetails', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('shift', shift);
    url.searchParams.set('day_of_week', day_of_week);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);
export const getShiftDetails = createAsyncThunk('positions/getAllShiftDetail', async () => {
  try {
    const response = await axiosInstance.get('positions');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createShiftDetail = createAsyncThunk(
  'shiftdetails/createShiftDetail',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`shiftdetails`, data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteShiftDetail = createAsyncThunk(
  'shiftdetails/deleteShiftDetail',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`shiftdetails/${active}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateShiftDetail = createAsyncThunk(
  'shiftdetails/updateShiftDetail',
  async ({ shift_detail, active }: { shift_detail: EditShiftDetailInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`shiftdetails/${active}`, shift_detail);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const shiftDetailSlice = createSlice({
  name: 'shiftdetail',
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
      .addCase(getShiftDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShiftDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getShiftDetails.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createShiftDetail.pending, (state: shift_detailType) => {
        state.isCreateLoading = true;
      })
      .addCase(createShiftDetail.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createShiftDetail.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateShiftDetail.pending, (state: shift_detailType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateShiftDetail.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateShiftDetail.rejected, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(getAllShiftDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getAllShiftDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShiftDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setShift, setPage, setPageSize, setReset, setDayOfWeek, setQuery, setErrors } = shiftDetailSlice.actions;

export default shiftDetailSlice.reducer;
