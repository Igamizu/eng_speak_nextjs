'use client';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const terms = createSlice({
    name: 'terms',
    initialState: {
        unit: "1",
        matl: "giu",
        status: ''
    },
    reducers: {
        setUnit(state, { payload }) {
            state.unit = payload;
        },
        setMatl(state, { payload }) {
            state.matl = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoadAsyncMatl.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(LoadAsyncMatl.fulfilled, (state, { payload }) => {
            if (payload[0]) {
                state.matl = payload[0].matl;
                state.status = 'fulfilled';
            }
        });
        builder.addCase(LoadAsyncMatl.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

const LoadAsyncMatl = createAsyncThunk(
    'statistics/load',
    async (payload) => {
        const id = payload;
        const response = await fetch(`${ENDPOINT}/load_slot?id=${id}`);
        const responseObj = response.json();
        return responseObj;
    }
)

const { setUnit, setMatl } = terms.actions;

export { setUnit, setMatl, LoadAsyncMatl };
export default terms.reducer;