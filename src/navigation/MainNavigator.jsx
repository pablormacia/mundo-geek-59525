import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

import { useGetProfilePictureQuery } from "../services/userService";
import { setProfilePicture } from "../features/auth/authSlice";

import { fetchSession } from "../db";
import { setUser } from "../features/auth/authSlice";

const MainNavigator = () => {
    const user = useSelector(state=>state.authReducer.value.email)
    const localId = useSelector(state=>state.authReducer.value.localId)

    //console.log(localId)

    const dispatch = useDispatch()

    const {data:profilePicture, isLoading, error} = useGetProfilePictureQuery(localId)

    useEffect(()=>{
        if(!user){
            (async ()=>{
                try{
                    const session = await fetchSession()
                    //console.log("Session: ",session)
                    if(session.length){
                        //console.log("session _array",session)
                        dispatch(setUser(session[0]))
                    }
                }catch(error){
                    console.log("Error al obtener la sesión", error)
                }    
            })()
        }
    },[user])

    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
        
    },[profilePicture])
    

    return (
        <NavigationContainer>
            {
                user ? <TabNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator