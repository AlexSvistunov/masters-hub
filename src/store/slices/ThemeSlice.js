import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme: localStorage.getItem("currentTheme")
};

const themeSlice = createSlice({
  name: "currentTheme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      const localStorageTheme = localStorage.getItem('currentTheme')
      const newTheme = state.currentTheme === "dark" ? "light" : "dark";
      state.currentTheme = newTheme;

      document.querySelector("html").setAttribute("data-theme", newTheme);
      localStorage.setItem("currentTheme", newTheme);
    },
  },
});

export default themeSlice.reducer;

export const { changeTheme } = themeSlice.actions;
