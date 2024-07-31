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

function testFunc() {
  if (item?.is_favorite) {
    if (keyword === "fav") {
      dispatch(deleteFromFav({ currentToken, id: item?.id })).then((data) => {
        setItems(data.payload);
      });
    } else {
      dispatch(deleteFromFav({ currentToken, id: item?.id })).then((data) => {
        // 1st way, but I'm not working with data, It's just view
        const newItem = {
          ...item,
          is_favorite: !item?.is_favorite,
        };

        const newItems = items.map((el) => {
          if (el.id === item?.id) {
            return newItem;
          }

          return el;
        });

        setItems(newItems);
      });
    }
  } else {
    if (keyword === "fav") {
      return;
    }
    if (keyword === "profile") {
      dispatch(addToFav({ currentToken, id: item?.id })).then((data) => {
        console.log("FROM PROFILE");
        console.log("DATA!!!", data);
        const updatedItem = data?.payload?.find(
          (profileItem) => profileItem?.id === item?.id
        );

        setItems(updatedItem);
      });
    } else {
      dispatch(addToFav({ currentToken, id: item?.id })).then((data) => {
        const updatedItem = data.payload.find(
          (favItem) => favItem?.id === item?.id
        );

        const updatedItems = items.map((existingItem) => {
          if (existingItem?.id === updatedItem?.id) {
            return updatedItem;
          }
          return existingItem;
        });

        setItems(updatedItems);
      });
    }
  }
}

function testFunc2() {
  if (item?.is_favorite) {
    if (keyword === "fav") {
      dispatch(deleteFromFav({ currentToken, id: item?.id })).then((data) => {
        setItems(data.payload);
      });
    } else {
      dispatch(deleteFromFav({ currentToken, id: item?.id })).then((data) => {
        // 1st way, but I'm not working with data, It's just view
        const newItem = {
          ...item,
          is_favorite: !item?.is_favorite,
        };

        const newItems = items.map((el) => {
          if (el.id === item?.id) {
            return newItem;
          }

          return el;
        });

        setItems(newItems);
      });
    }
  } else {
    if (keyword === "fav") {
      return;
    }
    if (keyword === "profile") {
      dispatch(addToFav({ currentToken, id: item?.id })).then((data) => {
        console.log("FROM PROFILE");
        console.log("DATA!!!", data);
        const updatedItem = data?.payload?.find(
          (profileItem) => profileItem?.id === item?.id
        );

        setItems(updatedItem);
      });
    } else {
      dispatch(addToFav({ currentToken, id: item?.id })).then((data) => {
        const updatedItem = data.payload.find(
          (favItem) => favItem?.id === item?.id
        );

        const updatedItems = items.map((existingItem) => {
          if (existingItem?.id === updatedItem?.id) {
            return updatedItem;
          }
          return existingItem;
        });

        setItems(updatedItems);
      });
    }
  }
}

export default favSlice.reducer;
export const { startTheme, changeTheme } = favSlice.actions;
