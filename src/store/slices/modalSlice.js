import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false
}

const modalSlice = createSlice({
    name: 'enrollModal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true
        },

        closeModal: (state) => {
            state.isModalOpen = false
        }
    }
})

export default modalSlice.reducer
export const {openModal, closeModal} = modalSlice.actions