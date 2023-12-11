import { createSlice } from '@reduxjs/toolkit';

const priceMaxSlice = createSlice({
    name: 'max_price',
    initialState: {
      max_value: ''
      
    },
    reducers: {
      setSeachValueMax: (state, action) => {
        state.max_value = action.payload;
      },
      resetValue: (state) =>{
        state.max_value = ''
      }
    },
  });

  export const {setSeachValueMax} = priceMaxSlice.actions
  export default priceMaxSlice.reducer