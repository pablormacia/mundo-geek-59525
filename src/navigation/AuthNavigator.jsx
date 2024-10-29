import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />    
        </Stack.Navigator>
    )
}

export default AuthNavigator
