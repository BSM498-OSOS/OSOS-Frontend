import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const modemService=createApi({
    reducerPath:'modemService',
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
    tagTypes: ['Modem','ModemModel','ModemBrand'],
    endpoints:(builder)=>({
        deleteModemBrand:builder.mutation({
            query:(modemBrand)=>({
                url:`ModemBrands/modemBrandDelete`,
                method: 'DELETE',
                body:modemBrand
            }),
            invalidatesTags:['Modem','ModemModel','ModemBrand'],
        }),
        updateModemBrand:builder.mutation({
            query:(modemBrand)=>({
                url:`ModemBrands/modemBrandUpdate`,
                method: 'PATCH',
                body:modemBrand
            }),
            invalidatesTags:['Modem','ModemModel','ModemBrand'],
        }),
        addModemBrand:builder.mutation({
            query:(modemBrand)=>({
                url:`ModemBrands/modemBrandAdd`,
                method: 'POST',
                body:modemBrand
            }),
            invalidatesTags:['ModemBrand'],
        }),
        getModemBrandById:builder.query({
            query:(id)=>({
                url:`ModemBrands/modemBrandGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:['ModemBrand']
        }),
        getAllModemBrand:builder.query({
            query:()=>({
                url:`ModemBrands/modemBrandGetAll`,
                method: 'GET',
            }),
            providesTags:['ModemBrand']
        }),
        deleteModemModel:builder.mutation({
            query:(modemModel)=>({
                url:`ModemModels/modemModelDelete`,
                method: 'DELETE',
                body:modemModel
            }),
            invalidatesTags:['Modem','ModemModel','ModemBrand'],
        }),
        updateModemModel:builder.mutation({
            query:(modemModel)=>({
                url:`ModemModels/modemModelUpdate`,
                method: 'PATCH',
                body:modemModel
            }),
            invalidatesTags:['Modem','ModemModel','ModemBrand'],
        }),
        addModemModel:builder.mutation({
            query:(modemModel)=>({
                url:`ModemModels/modemModelAdd`,
                method: 'POST',
                body:modemModel
            }),
            invalidatesTags:['ModemBrand'],
        }),
        getModemModelById:builder.query({
            query:(id)=>({
                url:`ModemModels/modemModelGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:['ModemModel']
        }),
        getAllModemModel:builder.query({
            query:()=>({
                url:`ModemModels/modemModelGetAll`,
                method: 'GET',
            }),
            providesTags:['ModemModel']
        }),
        deleteModem:builder.mutation({
            query:(modem)=>({
                url:`Modems/modemDelete`,
                method: 'DELETE',
                body:modem
            }),
            invalidatesTags:(result, error, arg)=>[{type:'Modem',id:arg.id}],
        }),
        updateModem:builder.mutation({
            query:(modem)=>({
                url:`Modems/modemUpdate`,
                method: 'PATCH',
                body:modem
            }),
            invalidatesTags:(result, error, arg)=>[{type:'Modem',id:arg.id}],
        }),
        addModem:builder.mutation({
            query:(modem)=>({
                url:`Modems/modemAdd`,
                method: 'POST',
                body:modem
            }),
            invalidatesTags:['Modem'],
        }),
        getModemById:builder.query({
            query:(id)=>({
                url:`Modems/modemGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>[{type:'Modem',id:arg.id},'Modem'],
        }),
        getAllModem:builder.query({
            query:()=>({
                url:`Modems/modemGetAll`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>
            result
            ? [...result.data.map(({ id }) => ({ type: 'Modem', id })), 'Modem']
            : ['Modem'],
        }),
        getModemFullInfoById:builder.query({
            query:(modemId)=>({
                url:`modemGetWithCompleteInfoById?modemId=${modemId}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>[{tag:'Modem',id:result.data.id},'Modem']
        }),
        getAllModemFullInfo:builder.query({
            query:()=>({
                url:`Modems/modemGetAllWithCompleteInfo`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>
            result
            ? [...result.data.map(({ id }) => ({ type: 'Modem', id })), 'Modem']
            : ['Modem'],
        }),
    })
})

export const{
    useDeleteModemBrandMutation,
    useUpdateModemBrandMutation,
    useAddModemBrandMutation,
    useLazyGetModemBrandByIdQuery,
    useGetModemBrandByIdQuery,
    useLazyGetAllModemBrandQuery,
    useGetAllModemBrandQuery,
    useDeleteModemModelMutation,
    useUpdateModemModelMutation,
    useAddModemModelMutation,
    useLazyGetModemModelByIdQuery,
    useGetModemModelByIdQuery,
    useLazyGetAllModemModelQuery,
    useGetAllModemModelQuery,
    useDeleteModemMutation,
    useUpdateModemMutation,
    useAddModemMutation,
    useLazyGetModemByIdQuery,
    useGetModemByIdQuery,
    useLazyGetAllModemQuery,
    useGetAllModemQuery,
    useLazyGetModemFullInfoByIdQuery,
    useGetModemFullInfoByIdQuery,
    useLazyGetAllModemFullInfoQuery,
    useGetAllModemFullInfoQuery,
}=modemService