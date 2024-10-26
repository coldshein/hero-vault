import { createSlice } from "@reduxjs/toolkit";

type StateType = {
    isEditing: boolean,
}

const initialState: StateType = {
    isEditing: false,
}

export const editingSlice = createSlice({
    name: 'editing',
    initialState,
    reducers: {
        setIsEditing: (state) => {
            state.isEditing = true
        },
        setIsNoEditing: (state) => {
            state.isEditing = false;
        }
    }
})

export const {setIsEditing, setIsNoEditing} = editingSlice.actions
export default editingSlice.reducer