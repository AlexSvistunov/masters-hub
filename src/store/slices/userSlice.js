import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import URL from "../../utils/backend-url";

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ password, email }) => {
    try {
      const response = await fetch(`${URL}/api/auth/token/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ password, email }),
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, username, password }) => {

    try {
      const response = await fetch(`${URL}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // alert(error);
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
  token:
    localStorage.getItem("token")?.length &&
    localStorage.getItem("token") !== "undefined"
      ? localStorage.getItem("token")
      : null,
  image:
    localStorage.getItem("img")?.length &&
    localStorage.getItem("img") !== "undefined"
      ? localStorage.getItem("img")
      : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("img");
      state.token = null;
      state.image = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload.auth_token) {
        state.token = action.payload.auth_token;
        state.image = `/backend/masterhub/static${action.payload.image}`;
        localStorage.setItem("token", action.payload.auth_token);
        localStorage.setItem("img", `/backend/masterhub/static${action.payload.image}`);
      }
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.auth_token) {
        state.token = action.payload.auth_token;
        localStorage.setItem("token", action.payload.auth_token);
        state.image = `/backend/masterhub/static${action.payload.image}`;
        localStorage.setItem("img", `/backend/masterhub/static${action.payload.image}`);
      }

    });

    builder.addCase(logOut.fulfilled, (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("img");
      state.token = null;
      state.image = null
    });

    builder.addCase(logOut.rejected, () => {
      alert("Вы не можете выйти с аккаунта");
    });
  },
});

export default userSlice.reducer;

// export const { login } = userSlice.actions;
