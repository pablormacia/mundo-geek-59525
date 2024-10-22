import { configureStore } from '@reduxjs/toolkit'
import shopSlice from '../features/shop/shopSlice'

export const store = configureStore({
    reducer: { shopSlice }
})