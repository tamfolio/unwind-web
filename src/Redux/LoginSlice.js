// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isFetching: false,
  error: false,
  success: false,
};

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.success = true;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
    logout: (state) => {
      state.currentUser = {};
      state.error = false;
      state.success = false;
      state.isFetching = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  resetSuccess
} = loginSlice.actions;

export default loginSlice.reducer;