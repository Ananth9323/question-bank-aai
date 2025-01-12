import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    data: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.data = action.payload;
    },
    clearQuestions: (state) => {
      state.data = [];
    },
    replaceQuestion: (state, action) => {
      const { index, question } = action.payload;
      state.data[index] = question;
    },
  },
});

export const { setQuestions, clearQuestions, replaceQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
