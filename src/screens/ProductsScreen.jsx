import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'

const ProductsScreen = () => {
    
    const renderProductItem = ({ item }) => {
        return (
            <FlatCard style={styles.productContainer}>
                <View>
                    <Image
                        source={{ uri: item.mainImage }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text>{item.title}</Text>
                    <Text>{item.shortDescription}</Text>
                    <FlatList
                        data={item.tags}
                        keyExtractor={()=>Math.random(Date.now())}
                        renderItem={({item})=><Text>{item}</Text>}
                    />
                    {
                        item.discount>0 && <Text>Descuento: {item.discount}</Text>
                    }
                    <Text>{item.price}</Text>
                </View>
            </FlatCard>
        )
    }




    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
        />
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'flex-start',
        gap:15,
    },
    productImage: {
        width: 100,
        height: 100
    },
    productDescription:{
        width: '75%',
    }
})