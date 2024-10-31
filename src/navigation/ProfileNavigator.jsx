import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const ProfileNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Mundo Geek" subtitle={route.name} />)
    }}>
        <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
)

export default ProfileNavigator
