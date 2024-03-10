'use client';
import { createSlice } from "@reduxjs/toolkit";

const statistics = createSlice({
    name: 'statistics',
    initialState: {
        total: 0,
        current: 0,
        correct: 0,
        incorrect: 0
    },
    reducers: {
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
    }
});

const { setTotal, setCurrent, setCorrect, setIncorrect } = statistics.actions;

export { setTotal, setCurrent, setCorrect, setIncorrect };
export default statistics.reducer;