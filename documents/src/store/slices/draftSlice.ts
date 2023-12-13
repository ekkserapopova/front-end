import { createSlice } from '@reduxjs/toolkit';




const draftSlice = createSlice({
    name: 'draft',
    initialState:{
        app: false,
        appId: -1
    },
    reducers: {
      appSetReset: (state, action) => {
        state.app = action.payload.app
        state.appId = action.payload.appId

      }
    },
  });

  export const {appSetReset} = draftSlice.actions
  export default draftSlice.reducer