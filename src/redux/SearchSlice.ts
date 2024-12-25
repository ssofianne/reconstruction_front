import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchWork: '',
  inputValue: '',
  works: [],
  count: 0,
  flagSearch: false,
};

const searchSlice = createSlice({
  name: 'search',
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
  resetSearch 
} = searchSlice.actions;

export default searchSlice.reducer;

