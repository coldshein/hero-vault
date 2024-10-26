import { createSlice } from "@reduxjs/toolkit";

type StateType = {
    isOpen: boolean;
}

const initialState: StateType = {
    isOpen: false
}

const asideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        setOpenAside: (state) => {
            state.isOpen = true;
        },
        setCloseAside: (state) => {
            state.isOpen = false;
        }
    }
})

export const {setOpenAside, setCloseAside} = asideSlice.actions;
export default asideSlice.reducer;