import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";
import favSlice from "./slices/favSlice";
import modalSlice from "./slices/modalSlice";
import successAlertSlice from './slices/successAlert'
import errorAlertSlice from './slices/errorAlert'

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    fav: favSlice,
    enrollModal: modalSlice,
    successAlert: successAlertSlice,
    errorAlert: errorAlertSlice,
  },
});





