import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setCorrect, setIncorrect } from "./statistics";

const ENDPOINT = "/api/giu"

const question = createSlice({
    name: 'question',
    initialState: {
        question: null,
        cCorrect: false,
        cIncorrect: false,
        status: ''
    },
    reducers: {
        clickCorrect ({cCorrect, cIncorrect}){
            if(!cCorrect && !cIncorect) {
                cCorrect = true;
                const dispatch = useDispatch();
                dispatch(setCorrect(1));
            } else if(cCorrect && !cIncorrect) {
                cCorrect = false;
                const dispatch = useDispatch();
                dispatch(setCorrect(-1));
            } else if(!cCorrect && cIncorrect) {
                cCorrect = true;
                const dispatch = useDispatch();
                dispatch(setCorrect(1));
                cIncorrect = false;
                dispatch(setIncorrect(-1));
            }
        },
        clickIncorrect({ cCorrect, cIncorrect }) {
            if(!cCorrect && !cIncorect) {
                const dispatch = useDispatch();
                cIncorrect = true;
                dispatch(setIncorrect(1));
            } else if(!cCorrect && cIncorrect) {
                const dispatch = useDispatch();
                cInorrect = false;
                dispatch(setIncorrect(-1));
            } else if(cCorrect && !cIncorrect) {
                const dispatch = useDispatch();
                cCorrect = false;
                dispatch(setCorrect(-1));
                cIncorrect = true;
                dispatch(setIncorrect(1));
            }            
        }
    },
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

const { clickCorrect, clickIncorrect } = question.actions;
export { addAsyncQuestion, clickCorrect, clickIncorrect };
export default question.reducer;