import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems:[],
            user:"demo",
            total: null,
            cartLenght:0,
            updateAt: Date.now().toLocaleString() //unix timestamp
        }
    },
    reducers: {
        addItem: (state,action)=>{
            const productInCart = state.value.cartItems.find(item=>item.id===action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload) //action.payload es el producto
                state.value.cartLenght += 1
            }else{
                state.value.cartItems.map(item=>{
                    if(item.id===action.payload.id){
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }

            const total = calculate_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total, 
                updatedAt: new Date().toLocaleString()
            }

        },
        removeItem: (state,action)=>{
            state.value.cartItems = state.value.cartItems.filter(item=item.id!==action.payload)
            state.value.total = calculate_total_price(state.value.cartItems)
            state.value.cartLenght -= 1

        },
        clearCart: (state) => {
            state.value.cartItems=[]
            state.value.total=null
            state.value.cartLenght = 0
        }
    }
})

export const {addItem, removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer