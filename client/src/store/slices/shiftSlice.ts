// positonSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shiftType } from '../types';
import env from '@/env';
import { EditShiftInput } from '@/utils/validators/edit-shift.schema';
const initialState: shiftType = {
  data: [],
  isLoading: false,
  isCreateLoading: false,
  isUpdateLoading: false,
  isFiltered: false,
  page: 1,
  pageSize: 5,
  totalRow: 0,
  status: '',
  shift_type: '',
  query: '',
  errors: '',
  listShifts: [],
};
export const getAllShifts = createAsyncThunk(
  'shifts',
  async ({
    page,
    pageSize,
    query,
    status,
    shift_type,
  }: {
    page: number;
    pageSize: number;
    query: string;
    status: string;
    shift_type: string;
  }) => {
    const url = new URL('/api/v1/shifts', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('status', `${status}`);
    url.searchParams.set('shift_type', `${shift_type}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);
export const getShifts = createAsyncThunk('shifts/getAllShift', async () => {
  try {
    const response = await axiosInstance.get('shifts');
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createShift = createAsyncThunk('shifts/createShift', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`shifts`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteShift = createAsyncThunk('shifts/deleteShift', async (active: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`shifts/${active}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateShift = createAsyncThunk(
  'shifts/updateShift',
  async ({ shift, active }: { shift: EditShiftInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`shifts/${active}`, shift);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const shiftSlice = createSlice({
  name: 'shift',
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
    setStatus: (state, action) => {
      state.page = 1;
      state.status = action.payload;
      state.isFiltered = true;
    },
    setShiftType: (state, action) => {
      state.page = 1;
      state.shift_type = action.payload;
      state.isFiltered = true;
    },
    setReset: (state) => {
      state.page = 1;
      state.status = '';
      state.shift_type = '';
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getShifts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShifts.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.data = result.result;
        state.totalRow = result.meta.total;
        state.listShifts = result.result;
      })
      .addCase(getShifts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createShift.pending, (state: shiftType) => {
        state.isCreateLoading = true;
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createShift.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateShift.pending, (state: shiftType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateShift.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateShift.rejected, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(getAllShifts.fulfilled, (state, action) => {
        state.isLoading = false;
        const result = action.payload.data;
        state.data = result.result;
        state.totalRow = result.meta.total;
        state.listShifts = result.result;
      })
      .addCase(getAllShifts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShifts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setPage, setPageSize, setReset, setStatus, setQuery, setErrors, setShiftType } = shiftSlice.actions;

export default shiftSlice.reducer;
