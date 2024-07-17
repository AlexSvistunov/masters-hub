import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme: localStorage.getItem('currentTheme') ?  localStorage.getItem('currentTheme') : 'dark'
};

const themeSlice = createSlice({
  name: "currentTheme",
  initialState,
  reducers: {
    startTheme: (state) => {
    
      document.querySelector('html').setAttribute('data-theme', state.currentTheme)
    },

    changeTheme: (state) => {
    
     const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark'
     state.currentTheme = newTheme

     localStorage.setItem('currentTheme', newTheme)
    //  document.querySelector('html').setAttribute('data-theme', state.currentTheme)
    //  themeSlice.actions.startTheme()
    },
  },
});

export default themeSlice.reducer;

export const { startTheme, changeTheme } = themeSlice.actions;
