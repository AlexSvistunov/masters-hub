import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import URL from "../../utils/backend-url";

export const addToFav = createAsyncThunk(
  "fav/addToFav",
  async function ({ currentToken, id }) {
    try {
      const response = await fetch(`${URL}/api/favorites/?id=${id}`, {
        method: "POST",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      console.log("addtofav data ->>> ", data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deleteFromFav = createAsyncThunk(
  "fav/deleteFromFav",
  async function ({ currentToken, id }) {
    try {
      const response = await fetch(`${URL}/api/favorites/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });

      const data = await response.json();
      console.log("deletefromfav data =>>> ", data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);
const initialState = {
  favList: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addToFav.fulfilled, (state, action) => {
      console.log(213);
      console.log(action);
      state.favList = action.payload;
    });
  },
});



export default favSlice.reducer;
export const { startTheme, changeTheme } = favSlice.actions;
