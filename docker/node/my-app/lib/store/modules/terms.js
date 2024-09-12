'use client';
import { createSlice } from "@reduxjs/toolkit";

const terms = createSlice({
    name: 'terms',
    initialState: {
        unit: "1",
        matl: "giu",
    },
    reducers: {
        setUnit(state, { payload }) {
            state.unit = payload;
        },
        setMatl(state, { payload }) {
            state.matl = payload;
        }
    }
});

const { setUnit, setMatl } = terms.actions;

export { setUnit, setMatl };
export default terms.reducer;