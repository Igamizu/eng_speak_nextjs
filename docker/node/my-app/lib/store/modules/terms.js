'use client';
import { createSlice } from "@reduxjs/toolkit";

const terms = createSlice({
    name: 'terms',
    initialState: {
        unit: "%_%",
        genre: "%_%",
    },
    reducers: {
        setUnit(state, { payload }) {
            state.unit = payload;
        },
        setGenre(state, { payload }) {
            state.genre = payload;
        }
    }
});

const { setUnit, setGenre } = terms.actions;

export { setUnit, setGenre };
export default terms.reducer;