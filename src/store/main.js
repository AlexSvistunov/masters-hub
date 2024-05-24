import { configureStore } from "@reduxjs/toolkit";
import  themeSlice  from "./slices/ThemeSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice
  },
});
