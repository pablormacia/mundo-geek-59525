import { StyleSheet, Text, View,Pressable } from 'react-native'
import { colors } from '../global/colors'
import MontserratText from './MontserratText'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { clearSessions } from '../db'

const Header = ({subtitle}) => {
  const user = useSelector(state=>state.authReducer.value.email)
  const dispatch = useDispatch()

  const onLogout = ()=>{
    dispatch(clearUser())
    clearSessions()
      .then(()=>console.log("Sesión eliminada"))
      .catch((error)=>console.log("Error al eliminar la sesión"))
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Mundo Geek</Text>
      <MontserratText style={styles.subtitle}>{subtitle}</MontserratText>
      {
        user &&  <Pressable onPress={onLogout} style={styles.access}><Icon name="logout" size={16} color="#fff" /></Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height: 150,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.grisOscuro
    },
    title:{
        fontSize:24,
        //fontWeight: 'bold',
        color:colors.amarillo,
        fontFamily:'PressStart2P'
    },
    subtitle:{
      fontSize:18,
      fontWeight:700,
      color:colors.blanco,
      //fontFamily:"PressStart2P"
    },
    access:{
      alignSelf: "flex-end",
      paddingRight: 16
    } 
})