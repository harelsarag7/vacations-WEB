import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { UserRole } from "../Models/userModel";


const token = window.localStorage.getItem('userToken');
let initialState = null;

if (token) {
    const { email, sub, firstName, lastName, role } = jwtDecode<{ email: string, sub: number, firstName: string, lastName: string, role: UserRole}>(token);
    initialState = {email, sub, firstName, lastName, role};
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const { email, sub, firstName, lastName, role } = jwtDecode<{ email: string, sub: number, firstName: string, lastName: string, role: UserRole }>(action.payload);
            state = {email, sub, firstName, lastName, role };
            window.localStorage.setItem('userToken', action.payload);
            return state;
        },
        logout: (state) => {
            window.localStorage.removeItem(`userToken`);
            return null;
        },
        
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
