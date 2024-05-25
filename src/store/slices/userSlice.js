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


export const register = createAsyncThunk(
  "user/register",
  async ({ password, username }) => {
    try {
      const response = await fetch(`${URL}/api/auth/token/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

export const logOut = createAsyncThunk("user/logOut", async ({ token }) => {
  try {
    await fetch(`${URL}/api/auth/token/logout/`, {
      method: "POST",

      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  token: localStorage.getItem("token")?.length
    ? localStorage.getItem("token")
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.auth_token) {
        state.token = action.payload.auth_token;
        localStorage.setItem("token", action.payload.auth_token);
      }

      if (action.payload["non_field_errors"]) {
        alert(action.payload["non_field_errors"][0]);
      }
    });

    builder.addCase(logOut.fulfilled, (state) => {
      localStorage.removeItem("token");
      state.token = null;
    });

    builder.addCase(logOut.rejected, () => {
      alert("Вы не можете выйти с аккаунта");
    });
  },
});

export default userSlice.reducer;

// export const { login } = userSlice.actions;
