import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ENDPOINT = "/api/giu"

const questions = createSlice({
    name: 'questions',
    initialState: {
        questions: null,
        status: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAsyncWithStatus.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(addAsyncWithStatus.fulfilled, (state, { payload }) => {
            state.questions = payload;
            state.status = 'fulfilled';
        });
        builder.addCase(addAsyncWithStatus.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

const addAsyncWithStatus = createAsyncThunk(
    'questions/seach',
    async (payload) => {
        const { unit, genre } = payload;
        const response = await fetch(`${ENDPOINT}?unit=${unit}&genre=${genre}`);
        return response.json();
    }
);

export { addAsyncWithStatus };
export default questions.reducer;