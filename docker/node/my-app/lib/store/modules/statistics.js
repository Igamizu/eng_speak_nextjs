'use client';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ENDPOINT = "/api/giu"

const statistics = createSlice({
    name: 'statistics',
    initialState: {
        total: 0,
        current: 0,
        correct: 0,
        incorrect: 0,
        status: ''
    },
    reducers: {
        initStatistics(state) {
            state.current = 1;
            state.correct = 0;
            state.incorrect = 0;
        },
        setTotal(state, { payload }) {
            state.total = payload;
        },
        setCurrent(state, { payload }) {
            state.current = payload;
        },
        setCorrect(state, { payload }) {
            state.correct += payload;
        },
        setIncorrect(state, { payload }) {
            state.incorrect += payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoadAsyncStatistics.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(LoadAsyncStatistics.fulfilled, (state, { payload }) => {
            if (payload[0]) {
                state.current = payload[0].current;
                state.correct = payload[0].correct;
                state.incorrect = payload[0].incorrect;
                state.status = 'fulfilled';
            }
        });
        builder.addCase(LoadAsyncStatistics.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

const LoadAsyncStatistics = createAsyncThunk(
    'statistics/load',
    async (payload) => {
        const id = payload;
        const response = await fetch(`${ENDPOINT}/load_slot?id=${id}`);
        const responseObj = response.json();
        return responseObj;
    }
)

const { initStatistics, setTotal, setCurrent, setCorrect, setIncorrect } = statistics.actions;
export { LoadAsyncStatistics, initStatistics, setTotal, setCurrent, setCorrect, setIncorrect };
export default statistics.reducer;