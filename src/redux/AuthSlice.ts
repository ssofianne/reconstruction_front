import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  id: number | null;
  is_staff: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  is_staff: false,
  id: null,
  loading: false,
  error: null,
};

// Асинхронный thunk для входа
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login.loginCreate({ email, password });
      return { username: email, id: response.data.pk, is_staff: response.data.is_staff };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка входа');
    }
  }
);

// Асинхронный thunk для выхода
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.logout.logoutCreate();
    return {};
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || 'Ошибка выхода');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ username: string; id: number; is_staff: boolean }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.id = action.payload.id;
        state.is_staff = action.payload.is_staff;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Обработка logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.id = null;
        state.is_staff = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
