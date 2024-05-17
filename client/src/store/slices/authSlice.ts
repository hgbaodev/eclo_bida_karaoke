// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import { authType } from '../types';
import { setCookie } from 'cookies-next';

const setAuthCookie = (name: string, token: string) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

const initialState: authType = {
  isAuthenticated: false,
  isLoaded: false,
  first_name: '',
  last_name: '',
  email: '',
  image: '',
  accessToken: '',
  role: {
    name: '',
    permissions: [],
  },
};

export const signIn = createAsyncThunk('auth/signin', async (credentials: any) => {
  try {
    const response = await axios.post(`auth/signin`, credentials);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const signOut = createAsyncThunk('auth/singout', async () => {
  try {
    const response = await axios.post(`auth/singout`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

export const me = createAsyncThunk('auth/me', async () => {
  try {
    const response = await axios.get(`auth/me`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});

const updateAuthState = (state: any, action: any) => {
  const result = action.payload.data;
  state.isLoaded = true;
  state.isAuthenticated = true;
  state.first_name = result.first_name;
  state.last_name = result.last_name;
  state.accessToken = result.accessToken;
  state.image = result.image;
  state.email = result.email;
  state.role = result.role;
  setAuthCookie('accessToken', result.accessToken);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        updateAuthState(state, action);
      })
      .addCase(signIn.rejected, (state: any, action) => {
        state.isLoaded = true;
        state.isAuthenticated = false;
      })
      .addCase(me.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(me.fulfilled, (state, action) => {
        updateAuthState(state, action);
      })
      .addCase(me.rejected, (state: any) => {
        state.isLoaded = true;
        state.isAuthenticated = false;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoaded = true;
        state.isAuthenticated = false;
        state.first_name = '';
        state.last_name = '';
        state.email = '';
        state.image = '';
        state.accessToken = '';
        state.role = {
          name: '',
          permissions: [],
        };
        setCookie('accessToken', '');
      })
      .addCase(signOut.rejected, (state: any) => {
        state.isLoaded = true;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
