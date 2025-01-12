import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../slices/userSlice';
import questionsSlice from "../slices/questionsSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        questions: questionsSlice,
    },
});

export default store;