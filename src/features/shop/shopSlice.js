import { createSlice } from "@reduxjs/toolkit";
//import categories from '../../data/categories.json'
import products from '../../data/products.json'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            //categories: categories,
            products: products,
            categorySelected: "",
            productsFilteredByCategory:[],
            productId: null
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.productsFilteredByCategory = products.filter(product=>product.category.toLowerCase() === action.payload.toLowerCase())
            state.value.categorySelected = action.payload
        },
        setProductId: (state,action) => {
            state.value.productId = action.payload //productId o item.id
        }
    }
})

export const {setCategory,setProductId} = shopSlice.actions

export default shopSlice.reducer