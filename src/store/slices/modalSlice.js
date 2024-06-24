import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    modalId: null,
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
        },

        setId: (state, action) => {
            state.modalId = action.payload.id
        }
    }
})

export default modalSlice.reducer
export const {openModal, closeModal, setId} = modalSlice.actions