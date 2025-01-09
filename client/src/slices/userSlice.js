import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : 'user',
    initialState: {
        role:null,
        token:null
    },
    reducers: {
        setUser : (state, action) => {
            console.log("Action payload:", action.payload);
            console.log("before updating state:", { role: state.role, token: state.token });
            state.role = action.payload.role;
            state.token = action.payload.token;
            console.log("Updated state:", { role: state.role, token: state.token });
        },
        logout : (state) => {
            state.role = null;
            state.token = null;
        }
    }

});

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;