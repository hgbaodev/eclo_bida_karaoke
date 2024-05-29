// staffSlice.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productType } from '../types';
import env from '@/env';
// import { EditStaffInput } from '@/utils/validators/edit-user.schema';
const initialState: productType = {
  data: [],
  isLoading: false,
  isFiltered: false,
  totalRow: 0,
  page: 1,
  pageSize: 5,
  query: '',
  errors: null,
  isCreateLoading: false,
  isUpdateLoading: false,
};

export const getProducts= createAsyncThunk(
  'products',
  async ({ page, pageSize, query }: { page: number; pageSize: number; query: string }) => {
    const url = new URL('/api/v1/products', env.NEXT_API_URL);
    url.searchParams.set('page', `${page}`);
    url.searchParams.set('perPage', `${pageSize}`);
    url.searchParams.set('query', query);
 
    try {
      const response = await axiosInstance.get(url.href);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
);

// export const createStaff = createAsyncThunk('staffs/createStaff', async (data: any, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(`staffs`, data);
//     return response.data;
//   } catch (error: any) {
//     if (!error.response) {
//       throw error;
//     }
//     return rejectWithValue(error.response.data);
//   }
// });

// export const deleteStaff = createAsyncThunk('staffs/deleteStaff', async (active: string, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.delete(`staffs/${active}`);
//     return response.data;
//   } catch (error: any) {
//     if (!error.response) {
//       throw error;
//     }
//     return rejectWithValue(error.response.data);
//   }
// });

// export const updateStaff = createAsyncThunk(
//   'staffs/updateStaff',
//   async ({ staff, active }: { staff: EditStaffInput; active: string }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`staffs/${active}`, staff);
//       return response.data;
//     } catch (error: any) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

const productSlices = createSlice({
  name: 'product',
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
  
   
    setReset: (state) => {
      
      state.isFiltered = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: productType) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const result = action.payload.data;
        state.isLoading = false;
        state.data = result.result;
        state.totalRow = result.meta.total;
        console.log(result);
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
      });
      // .addCase(createStaff.pending, (state: productType) => {
      //   state.isCreateLoading = true;
      // })
      // .addCase(createStaff.fulfilled, (state, action) => {
      //   state.isCreateLoading = false;
      // })
      // .addCase(createStaff.rejected, (state) => {
      //   state.isCreateLoading = false;
      // })
      // .addCase(updateStaff.pending, (state: productType) => {
      //   state.isUpdateLoading = true;
      // })
      // .addCase(updateStaff.fulfilled, (state, action) => {
      //   state.isUpdateLoading = false;
      // })
      // .addCase(updateStaff.rejected, (state) => {
      //   state.isUpdateLoading = false;
      // });
  },
});

export const { setPage, setPageSize, setReset, setQuery, setErrors } = productSlices.actions;

export default productSlices.reducer;