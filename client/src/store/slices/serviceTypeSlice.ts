// userSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { service_typeType } from '../types';
// import { EditServiceTypeInput } from '@/utils/validators/edit-serviceType.schema';
import env from '@/env';

const initialState: service_typeType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  status: '',
  query: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getServiceTypes = createAsyncThunk(
  'service_types',
  async ({ page, pageSize, query, status }: { page: number; pageSize: number; query: string; status: string }) => {
    const url = new URL('/api/v1/service_types', env.NEXT_API_URL);
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

// export const createCustomer = createAsyncThunk('customers/createCustomer', async (data: any, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(`customers`, data);
//     return response.data;
//   } catch (error: any) {
//     if (!error.response) {
//       throw error;
//     }
//     return rejectWithValue(error.response.data);
//   }
// });

// export const updateCustomer = createAsyncThunk(
//   'customers/updateCustomer',
//   async ({ customer, active }: { customer: EditCustomerInput; active: string }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`customers/${active}`, customer);
//       return response.data;
//     } catch (error: any) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const deleteCustomer = createAsyncThunk(
//   'customers/deleteCustomer',
//   async (active: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.delete(`customers/${active}`);
//       return response.data;
//     } catch (error: any) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

const serviceTypeSlice = createSlice({
  name: 'service_type',
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
    setErrors: (state, action) => {
      state.page = 1;
      state.errors = action.payload;
    },
    setReset: (state) => {
      state.page = 1;
      state.status = '';
      state.isFiltered = false;
    },
    setStatus: (state, action) => {
      state.page = 1;
      state.status = action.payload;
      state.isFiltered = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceTypes.pending, (state: service_typeType) => {
        state.isLoading = true;
      })
      .addCase(getServiceTypes.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
      })
      .addCase(getServiceTypes.rejected, (state) => {
        state.isLoading = false;
      });
    // .addCase(createCustomer.pending, (state: serviceTypeType) => {
    //   state.isCreateLoading = true;
    // })
    // .addCase(createCustomer.fulfilled, (state, action) => {
    //   state.isCreateLoading = false;
    // })
    // .addCase(createCustomer.rejected, (state) => {
    //   state.isCreateLoading = false;
    // });
    // .addCase(updateCustomer.pending, (state: serviceTypeType) => {
    //   state.isUpdateLoading = true;
    // })
    // .addCase(updateCustomer.fulfilled, (state, action) => {
    //   state.isUpdateLoading = false;
    // })
    // .addCase(updateCustomer.rejected, (state) => {
    //   state.isUpdateLoading = false;
    // });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setStatus, setErrors } = serviceTypeSlice.actions;

export default serviceTypeSlice.reducer;
