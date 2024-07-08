// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { staffType } from '../types';
import env from '@/env';
import { EditStaffInput } from '@/utils/validators/edit-staff.schema';
const initialState: staffType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
  position: '',
  status: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
  listStaffs: [],
  oneStaff: '',
};

export const getStaffs = createAsyncThunk(
  'staffs',
  async ({
    page,
    pageSize,
    query,
    position,
    status,
  }: {
    page: number;
    pageSize: number;
    query: string;
    position: string;
    status: string;
  }) => {
    const url = new URL('/api/v1/staffs', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('position', `${position}`);
    url.searchParams.set('status', `${status}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);
export const getAllStaffs = createAsyncThunk('staffs/getAllStaffs', async (query: string) => {
  const url = new URL('/api/v1/staffs?all=true', env.NEXT_API_URL);
  url.searchParams.set('query', query);
  try {
    const response = await axiosInstance.get(url.href);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
export const getOneStaff = createAsyncThunk('staffs/getOneStaff', async (active: string) => {
  const url = new URL('/api/v1/staffs', env.NEXT_API_URL);
  url.searchParams.set('user', active);
  try {
    const response = await axiosInstance.get(url.href);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
export const createStaff = createAsyncThunk('staffs/createStaff', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`staffs`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteStaff = createAsyncThunk('staffs/deleteStaff', async (active: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`staffs/${active}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateStaff = createAsyncThunk(
  'staffs/updateStaff',
  async ({ staff, active }: { staff: any; active: string }, { rejectWithValue }) => {
    try {
      console.log(staff);
      const response = await axiosInstance.post(`staffs/${active}`, staff);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const staffSlice = createSlice({
  name: 'staff',
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
    setPosition: (state, action) => {
      state.position = action.payload;
      state.isFiltered = true;
    },
    setStatus: (state, action) => {
      state.page = 1;
      state.status = action.payload;
      state.isFiltered = true;
    },
    setReset: (state) => {
      state.page = 1;
      state.position = '';
      state.status = '';
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStaffs.pending, (state: staffType) => {
        state.isLoading = true;
      })
      .addCase(getStaffs.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getStaffs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOneStaff.pending, (state: staffType) => {
        state.isLoading = true;
      })
      .addCase(getOneStaff.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.oneStaff = result.result;
      })
      .addCase(getOneStaff.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllStaffs.pending, (state: staffType) => {
        state.isLoading = true;
      })
      .addCase(getAllStaffs.fulfilled, (state, action) => {
        const returneData = action.payload.data;
        state.isLoading = false;
        state.data = returneData.result;
        state.listStaffs = returneData.result;
      })
      .addCase(getAllStaffs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createStaff.pending, (state: staffType) => {
        state.isCreateLoading = true;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createStaff.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateStaff.pending, (state: staffType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateStaff.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setStatus, setPosition, setQuery, setErrors } = staffSlice.actions;

export default staffSlice.reducer;
