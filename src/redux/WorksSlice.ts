import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchWork: '',
  inputValue: '',
  works: [],
  count: 0,
  flagSearch: false,
};

const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setSearchWork: (state, action) => {
      state.searchWork = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setFlagSearch: (state, action) => {
      state.flagSearch = action.payload;
    },
    // setCount: (state, action) => {
    //   state.count = action.payload;
    // },
    resetSearch: (state) => {
      state.searchWork = '';
      state.inputValue = '';
      state.flagSearch = false;
    },
  },
});

export const { 
  setSearchWork, 
  setInputValue, 
  setFlagSearch, 
//   setCount, 
  resetSearch 
} = worksSlice.actions;

export default worksSlice.reducer;
