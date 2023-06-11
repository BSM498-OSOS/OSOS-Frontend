import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerService=createApi({
    reducerPath:'customerService',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_URL+'Customers/',
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token
            if(token){
                headers.set('Authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Customer'],
    endpoints:(builder)=>({
        deleteCustomer:builder.mutation({
            query:(customer)=>({
                url:`customerDelete`,
                method: 'DELETE',
                body:customer
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Customer', id: arg.id }],
        }),
        updateCustomer:builder.mutation({
            query:(customer)=>({
                url:`customerUpdate`,
                method: 'PATCH',
                body:customer
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Customer', id: arg.id }],
        }),
        addCustomer:builder.mutation({
            query:(customer)=>({
                url:`customerAdd`,
                method: 'POST',
                body:customer
            }),
            invalidatesTags:['Customer'],
        }),
        getCustomerById:builder.query({
            query:(id)=>({
                url:`customerGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg) =>
            result
            ? [{ type: 'Customer', id: result.data.id }, 'Customer']
            : ['Customer'],
        }),
        getCustomerByMeterSerialNo:builder.query({
            query:(serialNo)=>({
                url:`customerGetByMeterSerialNo?serialNo=${serialNo}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg) =>
            result
            ? [{ type: 'Customer', id: result.data.id }, 'Customer']
            : ['Customer'],
        }),
        getAllCustomer:builder.query({
            query:()=>({
                url:`customerGetAll`,
                method: 'GET',
            }),
            providesTags:(result, error, arg) =>
            result
            ? [...result.data.map(({ id }) => ({ type: 'Customer', id })), 'Customer']
            : ['Customer'],
        }),
    })
})

export const {
    useDeleteCustomerMutation,
    useUpdateCustomerMutation,
    useAddCustomerMutation,
    useLazyGetCustomerByIdQuery,
    useGetCustomerByIdQuery,
    useLazyGetCustomerByMeterSerialNoQuery,
    useGetCustomerByMeterSerialNoQuery,
    useLazyGetAllCustomerQuery,
    useGetAllCustomerQuery,
}=customerService