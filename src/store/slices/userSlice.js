import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/backend-url";

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ password, email }) => {


    try {
      const response = await fetch(`${URL}/api/auth/token/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ password: password, email: email }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, username, specialization, password }) => {

    try {
      const response = await fetch(`${URL}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          specialization,
          password,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      alert(error);
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
  token: localStorage.getItem("token")?.length && localStorage.getItem('token') !== 'undefined'
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
    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action.payload.auth_token) {
        state.token = action.payload.auth_token;
        localStorage.setItem("token", action.payload.auth_token);
      } else {
        for(let key in action.payload) {
          alert(`Некорректный ${key}`)
        }
      }


    });

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
