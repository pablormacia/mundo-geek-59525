import { configureStore } from '@reduxjs/toolkit'
import shopReducer from '../features/shop/shopSlice'
import { shopApi } from '../services/shopService'

export const store = configureStore({
    reducer: { 
        shopReducer,
        [shopApi.reducerPath] : shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(shopApi.middleware)
})