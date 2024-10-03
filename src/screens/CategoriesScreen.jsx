import { StyleSheet, Text, View, FlatList } from 'react-native'
import categories from "../data/categories.json"

const CategoriesScreen = () => {
    //console.log("Categories: ", categories)

    const renderCategoryItem = ({item}) =>{
        return(
            <Text>{item.title}</Text>
        )
    }


    return (
        <View style={styles.categoriesContainer}>
            <FlatList
                data={categories}
                keyExtractor={item=>item.id}
                renderItem={renderCategoryItem}
            />
        </View>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({})