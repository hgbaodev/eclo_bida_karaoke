// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { salary } from '../types';
import env from '@/env';
const currentDate = new Date();
const initialState: salary = {
  dataSalary: [],
  isLoading: false,
  isFiltered: false,
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
  query: '',
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getSalaries = createAsyncThunk(
  'salaries/getAllSalarys',
  async ({ month, year, query }: { month: number; year: number; query: string }) => {
    const url = new URL('/api/v1/salaries', env.NEXT_API_URL);
    url.searchParams.set('month', `${month}`);
    url.searchParams.set('query', `${query}`);
    url.searchParams.set('year', `${year}`);
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const createSalary = createAsyncThunk('attendances/createSalary', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`salaries`, data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateSalary = createAsyncThunk('salaries/updateSalary', async (attendance: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`salaries/`, attendance);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const Salary = createAsyncThunk('salaries/Salary', async (attendance: any, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`salaries/`, attendance);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const salarySlice = createSlice({
  name: 'salary',
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
      .addCase(getSalaries.pending, (state: salary) => {
        state.isLoading = true;
      })
      .addCase(getSalaries.fulfilled, (state, action) => {
        const returneData = action.payload.data;
        state.isLoading = false;
        state.dataSalary = returneData;
      })
      .addCase(getSalaries.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createSalary.pending, (state: salary) => {
        state.isCreateLoading = true;
      })
      .addCase(createSalary.fulfilled, (state, action) => {
        state.isCreateLoading = false;
      })
      .addCase(createSalary.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(updateSalary.pending, (state: salary) => {
        state.isUpdateLoading = true;
      })
      .addCase(updateSalary.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(updateSalary.rejected, (state) => {
        state.isUpdateLoading = false;
      })
      .addCase(Salary.pending, (state: salary) => {
        state.isUpdateLoading = true;
      })
      .addCase(Salary.fulfilled, (state, action) => {
        state.isUpdateLoading = false;
      })
      .addCase(Salary.rejected, (state) => {
        state.isUpdateLoading = false;
      });
  },
});
export const { setMonth, setYear, setQuery } = salarySlice.actions;

export default salarySlice.reducer;
