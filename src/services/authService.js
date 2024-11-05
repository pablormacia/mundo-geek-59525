import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import { base_auth_url, api_key } from '../firebase/database'



export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_AUTH_URL }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signUp?key=${process.env.EXPO_PUBLIC_API_KEY}`,
                method: 'POST',
                body: auth
            })
        }),
        login: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signInWithPassword?key=${process.env.EXPO_PUBLIC_API_KEY}`,
                method: 'POST',
                body: auth
            })
        })
    })
})

export const { useSignupMutation, useLoginMutation } = authApi