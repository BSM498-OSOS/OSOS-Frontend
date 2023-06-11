import {createSlice} from '@reduxjs/toolkit'
import navlinks from '../items/navlinks'

const initialState={
    navlink : false,
}

const sidebarSlice = createSlice({
    name:'sidebar',
    initialState,
    reducers:{
        changeLink:(state,action)=>{
            state.navlink=action.payload??false
        },
    }
})

export const {changeLink}=sidebarSlice.actions
export default sidebarSlice.reducer