import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated : boolean;
    user : string | null;

}

const initialState: AuthState = {
    isAuthenticated : false,
    user : null,

}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>){ // PayloadAction : 함수에 매개변수로 들어오는 자료형 지정정
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state){
            state.isAuthenticated = false;
            state.user = null;
        }

    }
    

})

export const {login, logout} = authSlice.actions;
export default authSlice