import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'doc_in_app',
    initialState: {
      value: '+'
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