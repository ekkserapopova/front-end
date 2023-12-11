import { createSlice } from '@reduxjs/toolkit';

const priceMinSlice = createSlice({
    name: 'min_price',
    initialState: {
      min_value: ''
      
    },
    reducers: {
      setSeachValueMin: (state, action) => {
        state.min_value = action.payload;
      },
      resetValue: (state) =>{
        state.min_value = ''
      }
    },
  });

  export const {setSeachValueMin} = priceMinSlice.actions
  export default priceMinSlice.reducer