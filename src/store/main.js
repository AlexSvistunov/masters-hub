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

const url = 'http://localhost:5173/catalog/?page=2'
const array = url.split('?')
const element = array.find(el => el.startsWith('page')).split('=').find(el => el !== 'page')
console.log(element)




