import { configureStore } from '@reduxjs/toolkit'
import termsReducer from "./modules/terms"
import questionsReducer from './modules/questions';
import questionReducer from './modules/question';
import statisticsReducer from './modules/statistics';

export const makeStore = () => {
    return configureStore({
        reducer: {
            terms: termsReducer,
            questions: questionsReducer,
            question: questionReducer,
            statistics: statisticsReducer
        }
    });
}