import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../screens/CartScreen"
import Header from "../components/Header"

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <CartStack.Navigator
        screenOptions = {{
            header: ({route})=><Header subtitle={route.name}/>
        }}
    >
        <CartStack.Screen component={CartScreen} name="Carrito" />
    </CartStack.Navigator>
  )
}

export default CartNavigator

