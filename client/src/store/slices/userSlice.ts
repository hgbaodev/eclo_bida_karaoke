// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userType } from '../types';
import env from '@/env';
import { EditUserInput } from '@/utils/validators/edit-user.schema';

const initialState: userType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
  role: '',
  status: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const fetchAllUsers = createAsyncThunk(
  'users',
  async ({
    page,
    pageSize,
    query,
    status,
    role,
  }: {
    page: number;
    pageSize: number;
    query: string;
    status: string;
    role: string;
  }) => {
    const url = new URL('/api/v1/users', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
    url.searchParams.set('status', `${status}`);
    url.searchParams.set('role', `${role}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const createUser = createAsyncThunk('users/createUser', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`users`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`users/${id}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ user, id }: { user: EditUserInput; id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`users/${id}`, user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
      state.isFiltered = true;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.isFiltered = true;
    },
    setReset: (state) => {
      state.role = '';
      state.status = '';
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state: userType) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.pending, (state: userType) => {
        state.isCreateLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateUser.pending, (state: userType) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});

export const { setPage, setPageSize, setReset, setStatus, setRole, setQuery, setErrors } = userSlice.actions;

export default userSlice.reducer;
