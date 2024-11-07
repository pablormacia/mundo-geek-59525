import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email:null,
            token:null,
            localId:"",
            profilePicture: ""
        }
    },
    reducers: {
        setUser:(state,action)=>{
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
            state.value.localId = action.payload.localId
        },
        clearUser: (state)=>{
            state.value.email = null
            state.value.token = null
            state.value.localId = ""
            state.value.profilePicture= ""
        },
        setProfilePicture: (state,action) => {
            state.value.profilePicture = action.payload
        } 
    }
})

export const {setUser,clearUser,setProfilePicture} = authSlice.actions

export default authSlice.reducer