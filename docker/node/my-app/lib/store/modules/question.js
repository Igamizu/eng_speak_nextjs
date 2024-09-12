import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
            console.log(payload);
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
        const { key_value, matl } = payload;
        const response = await fetch(`${ENDPOINT}/${key_value}?matl=${matl}`);
        return response.json();
    }
);

export { addAsyncQuestion };
export default question.reducer;