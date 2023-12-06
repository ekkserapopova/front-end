import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user_id: null,
    is_authenticated: false,
    is_moderator: false,
    
  },
  reducers: {
    loginUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.is_authenticated = action.payload.is_authenticated;
      state.is_moderator = action.payload.is_moderator;
    },
    logoutUser: (state) => {
      state.user_id = null;
      state.is_authenticated = false;
      state.is_moderator = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;