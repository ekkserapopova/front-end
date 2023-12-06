import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
      value: ''
      
    },
    reducers: {
      setSeachValue: (state, action) => {
        state.value = action.payload;
      },
      resetValue: (state) =>{
        state.value = ''
      }
    },
  });

  export const {setSeachValue} = searchSlice.actions
  export default searchSlice.reducer