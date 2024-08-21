import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";
import favSlice from "./slices/favSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    fav: favSlice,
    enrollModal: modalSlice,
  },
});





