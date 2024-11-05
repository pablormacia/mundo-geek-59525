import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlacesScreen from "../screens/MyPlacesScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const MyPlacesNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Mundo Geek" subtitle={route.name} />)
    }}>
        <Stack.Screen name="Mis lugares" component={MyPlacesScreen} />
    </Stack.Navigator>
)

export default MyPlacesNavigator