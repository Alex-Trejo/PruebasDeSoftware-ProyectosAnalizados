import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean; // Asegúrate de que esta propiedad exista

}

const initialState: AuthState = {
  uid: null,
  email: null,
  loading: false,
  error: null,
  isAuthenticated: false, // Inicializa esta propiedad

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<{ uid: string; email: string }>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ uid: string; email: string }>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;

    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.uid = null;
      state.email = null;
      state.isAuthenticated = false;

    }
  },
});

export const { 
  registerStart, 
  registerSuccess, 
  registerFailure, 
  loginStart, loginSuccess, loginFailure, logout
} = authSlice.actions;
export default authSlice.reducer;
