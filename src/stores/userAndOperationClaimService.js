import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAndOperationClaimService=createApi({
    reducerPath:'userAndOperationClaimService',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_URL,
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token
            if(token){
                headers.set('Authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['User'],
    endpoints:(builder)=>({
        getAllOperationClaim:builder.query({
            query:()=>({
                url:`AuthOperationClaims/authOpearationClaimGetAll`,
                method: 'GET',
            })
        }),
        addUserOperationClaim:builder.mutation({
            query:(userOpClaim)=>({
                url:`AuthUserOperationClaims/authUserOperationClaimAdd`,
                method: 'POST',
                body:userOpClaim
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.userID }],
        }),
        deleteUserOperationClaim:builder.mutation({
            query:(userOpClaim)=>({
                url:`AuthUserOperationClaims/authUserOperationClaimDelete`,
                method: 'DELETE',
                body:userOpClaim
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.userID }],
        }),
        getAllUser:builder.query({
            query:()=>({
                url:`AuthUsers/authUserGetAll`,
                method: 'GET',
            }),
            providesTags:(result, error, arg) =>
            result
            ? [...result.data.map(({ id }) => ({ type: 'User', id })), 'User']
            : ['User'],
        }),
        getUserById:builder.query({
            query:(id)=>({
                url:`AuthUsers/authUserGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:(result, error, id) =>[{ type: 'User', id }]
        }),
    })
})

export const {
    useLazyGetAllOperationClaimQuery,
    useGetAllOperationClaimQuery,
    useAddUserOperationClaimMutation,
    useDeleteUserOperationClaimMutation,
    useLazyGetAllUserQuery,
    useGetAllUserQuery,
    useLazyGetUserByIdQuery,
    useGetUserByIdQuery
}=userAndOperationClaimService