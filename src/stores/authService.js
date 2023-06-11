import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authService=createApi({
    reducerPath:'authService',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_URL+'Auth/',
    }),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(form)=>({
                url:`login`,
                method: 'POST',
                body:form
            })
        }),
        register:builder.mutation({
            query:(form)=>({
                url:`register`,
                method: 'POST',
                body:form
            })
        }),
    })
})

export const {
useLoginMutation,
useRegisterMutation,
}=authService