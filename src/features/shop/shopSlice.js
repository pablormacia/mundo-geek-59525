import { createSlice } from "@reduxjs/toolkit";
import categories from '../../data/categories.json'

export const shopSlice = createSlice({
    name: 'shop',
    initialState:{
        value:{
            categories:categories,
        }
    },
    reducers:{

    }
})

export default shopSlice.reducer