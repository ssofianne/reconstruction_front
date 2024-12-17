import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const loadAuthStateFromLocalStorage = () => {
//     const authState = localStorage.getItem('auth');
//     return authState ? JSON.parse(authState) : { isAuthenticated: false, user: { username: null, id: null } };
// };
  
// const saveAuthStateToLocalStorage = (authState: AuthState) => {
//     localStorage.setItem('auth', JSON.stringify(authState));
// };

// const initialState: AuthState = loadAuthStateFromLocalStorage();

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
      // saveAuthStateToLocalStorage(state)
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.is_staff =  false;
      state.id = null;
      // saveAuthStateToLocalStorage(state)
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;