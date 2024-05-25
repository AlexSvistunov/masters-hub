import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/backend-url";

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ password, username }) => {
    try {
      const response = await fetch(`${URL}/api/auth/token/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },

        body: JSON.stringify({ password: password, username: username }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;

// export const { login } = userSlice.actions;
