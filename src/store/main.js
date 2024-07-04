import { configureStore } from "@reduxjs/toolkit";
import  themeSlice  from "./slices/ThemeSlice";
import userSlice from './slices/userSlice'
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


const catalog = [
  {id: 1, title: 'брови'},
  {id: 2, title: 'ресницы'},
  {id: 3, title: 'ногти'},
]

const chosen = [2, 3]

const result = chosen.map(chosenElement => {
  return catalog.find(catalogEl => catalogEl.id === chosenElement)['title']
})

console.log(result);
