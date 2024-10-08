import { useEffect,useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image,Pressable } from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'


const ProductsScreen = ({ category,setCategory }) => {
    const [productsFiltered, setProductsFiltered] = useState([])

    useEffect(()=>{
        const productsTempFiltered = products.filter(product=>product.category.toLowerCase() === category.toLowerCase())
        setProductsFiltered(productsTempFiltered)
    },[category])

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
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                    <View style={styles.tags}>
                        <Text style={styles.tagText}>Tags : </Text>
                        {
                            <FlatList
                                style={styles.tags}
                                data={item.tags}
                                keyExtractor={() => Math.random()}
                                renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                            />
                        }
                    </View>
                    {
                        item.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>Descuento {item.discount} %</Text></View>
                    }
                    {
                        item.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
                    }
                    <Text style={styles.price}>Precio: $ {item.price}</Text>
                </View>
            </FlatCard>
        )
    }




    return (
        <>
        <Pressable onPress={()=>setCategory("")}><Text>Volver</Text></Pressable>
        <FlatList
            data={productsFiltered}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
        />
        </>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 10,
        alignItems: "center",
        gap: 10
    },
    productImage: {
        width: 100,
        height: 100
    },
    productDescription: {
        width: "80%",
        padding: 20,
        gap: 10
        //height:100,
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 18
    },
    shortDescription: {

    },
    tags: {
        flexDirection: 'row',
        gap: 5
    },
    tagText: {
        //fontFamily:"Montserrat",
        fontWeight: '600',
        fontSize: 12,
        color: colors.morado
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    discount: {
        backgroundColor: colors.naranjaBrillante,
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start'
    },
    discountText: {
        color: colors.blanco
    },
    noStockText: {
        color: 'red'
    }
})