import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setCorrect, setIncorrect } from "./statistics";

const ENDPOINT = "/api/giu"

const question = createSlice({
    name: 'question',
    initialState: {
        question: null,
        status: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAsyncQuestion.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(addAsyncQuestion.fulfilled, (state, { payload }) => {
            [ state.question ] = payload;
            state.status = 'fulfilled';
        });
        builder.addCase(addAsyncQuestion.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

const addAsyncQuestion = createAsyncThunk(
    'question/seach',
    async (payload) => {
        const response = await fetch(`${ENDPOINT}/${payload}`);
        return response.json();
    }
);

export { addAsyncQuestion };
export default question.reducer;