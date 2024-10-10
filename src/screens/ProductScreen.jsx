import { StyleSheet, Text, View,Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';

const ProductScreen = ({ productId,setProductId }) => {
    return (
        <View>
            <Pressable onPress={() => setProductId(null)}><Icon style={styles.goBack} name="arrow-back-ios" size={24} /></Pressable>
            <Text>{productId}</Text>
        </View>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    goBack:{
        padding:10,
        color:colors.grisMedio
    }
})