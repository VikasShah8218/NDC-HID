import { createSlice } from "@reduxjs/toolkit";
// import { loginUser ,logoutUser} from "../../globals/auth";
import { loginUser ,logoutUser} from "../../globals/auth";
import { loadUserInfo, checkInitialAuth } from "../../globals/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: checkInitialAuth(),
    user: loadUserInfo(),
    requestLoading : false,
  },
  reducers: {
    login: (state, action) => {
      const token = action.payload.token
      delete (action.payload).token
      loginUser(token, action.payload);
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
      logoutUser();
    },
    setRequestLoading:(state,action) =>{
      state.requestLoading = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setRequestLoading } = authSlice.actions;

export default authSlice.reducer;
