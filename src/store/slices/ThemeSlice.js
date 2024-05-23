import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: 'dark'
  },

  reducers: {
    changeTheme: (state) => {
      const newTheme = state.currentTheme === 'dark' ? 'light': 'dark'
      state.currentTheme = newTheme
    }
  }
})

export default themeSlice.reducer

export const {changeTheme} = themeSlice.actions