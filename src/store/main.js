import { configureStore } from "@reduxjs/toolkit";
import  themeSlice  from "./slices/ThemeSlice";
import userSlice from './slices/userSlice'
import favSlice from "./slices/favSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    fav: favSlice
  },
});
