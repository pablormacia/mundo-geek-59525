import { StyleSheet, Text, View } from 'react-native'


const MontserratText = ({children,style}) => {
  return (
      <Text style={{...styles.textMontserrat,...style}}>{children}</Text>
  )
}

export default MontserratText

const styles = StyleSheet.create({
    textMontserrat:{
        fontFamily: 'Montserrat'
    }
})