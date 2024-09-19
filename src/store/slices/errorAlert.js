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

const formData = new FormData()
formData.append('categories[]', [1,3,3])
console.log(Object.fromEntries(formData.entries()))

export const {showAlert: showAlertError, hideAlert} = errorAlertSlice.actions

export default errorAlertSlice.reducer;