// roleSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roleType } from '../types';

const initialState: roleType = {
  fetchData: [],
  fetchDataLoading: false,
  createLoading: false,
  updateLoading: false,
  listRoles: [],
  listFunctionals: [],
};

export const getRoles = createAsyncThunk('roles', async () => {
  try {
    const response = await axiosInstance.get(`roles`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const getAllRoles = createAsyncThunk('roles/getAllRoles', async () => {
  try {
    const response = await axiosInstance.get(`roles?all=true`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const createRole = createAsyncThunk('roles/createRole', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`roles`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const renameRole = createAsyncThunk(
  'roles/renameRole',
  async ({ id, role }: { id: number; role: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`roles/${id}/rename`, role);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id: number, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`roles/${id}`);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (value: { id: number; functionals: any }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`roles/${value.id}`, value);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const getFunctionals = createAsyncThunk('roles/getFunctionals', async () => {
  try {
    const response = await axiosInstance.get(`functionals`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.fetchDataLoading = false;
        state.fetchData = action.payload.data;
      })
      .addCase(getRoles.rejected, (state) => {
        state.fetchDataLoading = false;
      })
      .addCase(createRole.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.createLoading = false;
        state.fetchData = [...state.fetchData, action.payload.data];
      })
      .addCase(createRole.rejected, (state) => {
        state.createLoading = false;
      })
      .addCase(renameRole.pending, (state) => {
        state.fetchDataLoading = true;
      })
      .addCase(renameRole.fulfilled, (state) => {
        state.fetchDataLoading = false;
      })
      .addCase(renameRole.rejected, (state) => {
        state.fetchDataLoading = false;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.fetchData = state.fetchData.filter((role) => role.id !== action.payload.data.id);
      })
      .addCase(updateRole.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.updateLoading = false;
        const result = action.payload.data;
        const index = state.fetchData.findIndex((role) => role.id == result.id);
        if (index !== -1) {
          state.fetchData[index].functionals = result.functionals;
        } else {
          console.error('Role not found in state.fetchData');
        }
      })
      .addCase(updateRole.rejected, (state) => {
        state.updateLoading = false;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.listRoles = action.payload.data;
      })
      .addCase(getFunctionals.fulfilled, (state, action) => {
        state.listFunctionals = action.payload.data;
      });
  },
});

export default roleSlice.reducer;
