import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertSuccess: {
    alertState: false,
    message: '',
  }
}

const successAlertSlice = createSlice({
  name: 'successAlert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alertSuccess.alertState = true
      state.alertSuccess.message = action.payload.text
    },

    hideAlert: (state) => {
      state.alertSuccess.alertState = false
      state.alertSuccess.message = ''
    }
  }
})

export const {showAlert, hideAlert} = successAlertSlice.actions

export default successAlertSlice.reducer;