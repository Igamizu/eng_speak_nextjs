import { configureStore } from '@reduxjs/toolkit'
import termsReducer from "./modules/terms"
import questionsReducer from './modules/questions';
import questionReducer from './modules/question';

export const makeStore = () => {
    return configureStore({
        reducer: {
            terms: termsReducer,
            questions: questionsReducer,
            question: questionReducer
        }
    });
}