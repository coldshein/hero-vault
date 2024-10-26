import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./slices/heroSlice";
import asideSlice from "./slices/asideSlice";
import editingSlice from "./slices/editingSlice";

export const store = configureStore({
    reducer: {
        heroList: heroSlice,
        aside: asideSlice,
        editing: editingSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


