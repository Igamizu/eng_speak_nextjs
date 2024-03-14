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
        filterQuestionsIncorrect(state, { payload }) {
            const rawQuestions = [...payload];
            state.questions = rawQuestions.filter((_question) => _question.incorrect).map((_question) => ({..._question, incorrect: false}));
        }
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
        builder.addCase(LoadAsyncQuestions.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(LoadAsyncQuestions.fulfilled, (state, { payload }) => {
            const { questions : loadedQuestions } = payload[0];
            state.questions = JSON.parse(loadedQuestions);
            state.status = 'fulfilled';
        });
        builder.addCase(LoadAsyncQuestions.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

const addAsyncWithStatus = createAsyncThunk(
    'questions/search',
    async (payload) => {
        const { unit, genre } = payload;
        const response = await fetch(`${ENDPOINT}?unit=${unit}&genre=${genre}`);
        return response.json();
    }
);

const LoadAsyncQuestions = createAsyncThunk(
    'questions/load',
    async (payload) => {
        const id = payload;
        const response = await fetch(`${ENDPOINT}/load_slot?id=${id}`);
        return response.json();
    }
)

const { setQuestionCorrect, setQuestionIncorrect, filterQuestionsIncorrect } = questions.actions;
export { filterQuestionsIncorrect , addAsyncWithStatus, LoadAsyncQuestions, setQuestionCorrect, setQuestionIncorrect };
export default questions.reducer;