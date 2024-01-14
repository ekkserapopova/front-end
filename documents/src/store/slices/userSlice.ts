import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      value: ''
    },
    reducers: {
      setUser: (state, action) => {
        state.value = action.payload;
      },
      resetUser: (state) =>{
        state.value = ''
      }
    },
  });

  export const {setUser} = userSlice.actions
  export default userSlice.reducer