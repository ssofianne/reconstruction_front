import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null; 
  id: number | null;
  is_staff: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null, 
  is_staff: false,
  id: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; id: number; is_staff: boolean}>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.is_staff =  action.payload.is_staff
      state.id = action.payload.id
      console.log(state.is_staff)
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.is_staff =  false;
      state.id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;