import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ENDPOINT = "/api/giu"

const questions = createSlice({
    name: 'questions',
    initialState: {
        questions: null,
        status: '',
    },
    reducers: {
        setQuestionCorrect({ questions }, { payload }){
            if(questions) {
                questions[payload].correct = !questions[payload].correct;
            }
        },
        setQuestionIncorrect({ questions }, { payload }){
            if(questions) {
                questions[payload].incorrect = !questions[payload].incorrect;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addAsyncWithStatus.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(addAsyncWithStatus.fulfilled, (state, { payload }) => {
            state.questions = payload;
            state.questions = state.questions.map(question => ({...question, correct: false, incorrect: false}));
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

const { setQuestionCorrect, setQuestionIncorrect } = questions.actions;
export { addAsyncWithStatus, setQuestionCorrect, setQuestionIncorrect };
export default questions.reducer;