import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertError: {
    alertState: false,
    message: '',
  }
}

const errorAlertSlice = createSlice({
  name: 'errorAlert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alertError.alertState = true
      state.alertError.message = action.payload.text
    },

    hideAlert: (state) => {
      state.alertError.alertState = false
      state.alertError.message = ''
    }
  }
})

export const {showAlert: showAlertError, hideAlert} = errorAlertSlice.actions

export default errorAlertSlice.reducer;