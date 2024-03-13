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
        initStatistics(state) {
            state.correct = 0;
            state.incorrect = 0;
        },
        loadStatistics(state, { payload }) {
            state.current = payload.current;
            state.correct = payload.correct;
            state.incorrect = payload.incorrect;
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
    }
});

const { initStatistics, setTotal, setCurrent, setCorrect, setIncorrect } = statistics.actions;

export { initStatistics, setTotal, setCurrent, setCorrect, setIncorrect };
export default statistics.reducer;