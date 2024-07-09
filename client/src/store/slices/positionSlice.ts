// positonSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { positionType } from '../types';
import env from '@/env';
import { EditPositionInput } from '@/utils/validators/position/edit-position.schema';
const initialState: positionType = {
  data: [],
  fetchDataLoading: false,
  createLoading: false,
  updateLoading: false,
  isFiltered: false,
  page: 1,
  pageSize: 5,
  totalRow: 0,
  status: '',
  query: '',
  errors: '',
  listPositions: [],
};
export const getAllPositions = createAsyncThunk(
  'positions',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: string }) => {
    const url = new URL('/api/v1/positions', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('status', `${status}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);
export const getPositions = createAsyncThunk('positions/getAllPosition', async () => {
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

export const deletePosition = createAsyncThunk(
  'positions/deletePosition',
  async (active: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`positions/${active}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updatePosition = createAsyncThunk(
  'positions/updatePosition',
  async ({ position, active }: { position: EditPositionInput; active: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`positions/${active}`, position);
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
    setReset: (state) => {
      state.page = 1;
      state.status = '';
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPositions.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(getPositions.fulfilled, (state, action) => {
        state.fetchDataLoading = false;
        const result = action.payload.data;
        state.listPositions = result.result;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getPositions.rejected, (state) => {
        state.fetchDataLoading = false;
      })
      .addCase(createPosition.pending, (state: positionType) => {
        state.createLoading = true;
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.createLoading = false;
      })
      .addCase(createPosition.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(updatePosition.pending, (state: positionType) => {
        state.updateLoading = true;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(updatePosition.rejected, (state) => {
        state.updateLoading = false;
      })
      .addCase(getAllPositions.fulfilled, (state, action) => {
        state.fetchDataLoading = false;
        const result = action.payload.data;
        state.listPositions = result.result;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getAllPositions.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(getAllPositions.rejected, (state) => {
        state.fetchDataLoading = false;
      });
  },
});
export const { setPage, setPageSize, setReset, setStatus, setQuery, setErrors } = positionSlice.actions;

export default positionSlice.reducer;
