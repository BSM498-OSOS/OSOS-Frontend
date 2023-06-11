import {createSlice} from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";

const initialState={
    token : localStorage.getItem("token")|| false,
    user: localStorage.getItem("token")?jwt_decode(localStorage.getItem("token")):false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        saveUser:(state,action)=>{
            state.token=action.payload
            state.user=jwt_decode(state.token)
        },
        removeUser:(state)=>{
            localStorage.removeItem('token')
            state.token=false
            state.user=false
        },
    }
})

export const {saveUser,removeUser}=authSlice.actions
export default authSlice.reducer