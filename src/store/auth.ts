import { createSlice } from "@reduxjs/toolkit";

import { LoginContext } from "@/types";

const loginContextString: string | null = localStorage.getItem("login_context");
const loginContext: LoginContext = loginContextString ? JSON.parse(loginContextString) : {};

const initialAuthState = loginContext;

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload;

      localStorage.setItem("login_context", JSON.stringify(state));
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("login_context");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
