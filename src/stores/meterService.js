import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const meterService=createApi({
    reducerPath:'meterService',
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
    tagTypes: ['Meter','MeterModel','MeterBrand'],
    endpoints:(builder)=>({
        deleteMeterBrand:builder.mutation({
            query:(meterBrand)=>({
                url:`MeterBrands/meterBrandDelete`,
                method: 'DELETE',
                body:meterBrand
            }),
            invalidatesTags:['Meter','MeterModel','MeterBrand'],
        }),
        updateMeterBrand:builder.mutation({
            query:(meterBrand)=>({
                url:`MeterBrands/meterBrandUpdate`,
                method: 'PATCH',
                body:meterBrand
            }),
            invalidatesTags:['Meter','MeterModel','MeterBrand'],
        }),
        addMeterBrand:builder.mutation({
            query:(meterBrand)=>({
                url:`MeterBrands/meterBrandAdd`,
                method: 'POST',
                body:meterBrand
            }),
            invalidatesTags:['MeterBrand'],
        }),
        getMeterBrandById:builder.query({
            query:(id)=>({
                url:`MeterBrands/meterBrandGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:['MeterBrand']
        }),
        getAllMeterBrand:builder.query({
            query:()=>({
                url:`MeterBrands/meterBrandGetAll`,
                method: 'GET',
            }),
            providesTags:['MeterBrand']
        }),
        deleteMeterModel:builder.mutation({
            query:(meterModel)=>({
                url:`MeterModels/meterModelDelete`,
                method: 'DELETE',
                body:meterModel
            }),
            invalidatesTags:['Meter','MeterModel','MeterBrand'],
        }),
        updateMeterModel:builder.mutation({
            query:(meterModel)=>({
                url:`MeterModels/meterModelUpdate`,
                method: 'PATCH',
                body:meterModel
            }),
            invalidatesTags:['Meter','MeterModel','MeterBrand'],
        }),
        addMeterModel:builder.mutation({
            query:(meterModel)=>({
                url:`MeterModels/meterModelAdd`,
                method: 'POST',
                body:meterModel
            }),
            invalidatesTags:['MeterBrand'],
        }),
        getMeterModelById:builder.query({
            query:(id)=>({
                url:`MeterModels/meterModelGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:['MeterModel']
        }),
        getAllMeterModel:builder.query({
            query:()=>({
                url:`MeterModels/meterModelGetAll`,
                method: 'GET',
            }),
            providesTags:['MeterModel']
        }),
        getMeterReadingTimeById:builder.query({
            query:(id)=>({
                url:`MeterReadingTimes/meterReadingTimeGetById?id=${id}`,
                method: 'GET',
            }),
        }),
        getAllMeterReadingTime:builder.query({
            query:()=>({
                url:`MeterReadingTimes/meterReadingTimeGetAll`,
                method: 'GET',
            }),
        }),
        deleteMeter:builder.mutation({
            query:(meter)=>({
                url:`Meters/meterDelete`,
                method: 'DELETE',
                body:meter
            }),
            invalidatesTags:(result, error, arg)=>[{type:'Meter',id:arg.id}],
        }),
        updateMeter:builder.mutation({
            query:(meter)=>({
                url:`Meters/meterUpdate`,
                method: 'PATCH',
                body:meter
            }),
            invalidatesTags:(result, error, arg)=>[{type:'Meter',id:arg.id}],
        }),
        addMeter:builder.mutation({
            query:(meter)=>({
                url:`Meters/meterAdd`,
                method: 'POST',
                body:meter
            }),
            invalidatesTags:['Meter'],
        }),
        getMeterById:builder.query({
            query:(id)=>({
                url:`Meters/meterGetById?id=${id}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>[{type:'Meter',id:arg.id},'Meter'],
        }),
        getMeterBySerialNo:builder.query({
            query:(serialNo)=>({
                url:`Meters/meterGetBySerialNo?serialNo=${serialNo}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>[{type:'Meter',id:result.data.id},'Meter'],
        }),
        getAllMeter:builder.query({
            query:()=>({
                url:`Meters/meterGetAll`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>
            result
            ? [...result.data.map(({ id }) => ({ type: 'Meter', id })), 'Meter']
            : ['Meter'],
        }),
        getMeterFullInfoById:builder.query({
            query:(meterId)=>({
                url:`meterGetWithCompleteInfoById?meterId=${meterId}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>[{tag:'Meter',id:result.data.id},'Meter']
        }),
        getMeterFullInfoBySerialNo:builder.query({
            query:(serialNo)=>({
                url:`Meters/meterGetWithCompleteInfoBySerialNo?serialNo=${serialNo}`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>[{tag:'Meter',id:result.data.id},'Meter']
        }),
        getAllMeterFullInfo:builder.query({
            query:()=>({
                url:`Meters/meterGetAllWithCompleteInfo`,
                method: 'GET',
            }),
            providesTags:(result, error, arg)=>
            result
            ? [...result.data.map(({ id }) => ({ type: 'Meter', id })), 'Meter']
            : ['Meter'],
        }),
    })
})

export const{
    useDeleteMeterBrandMutation,
    useUpdateMeterBrandMutation,
    useAddMeterBrandMutation,
    useLazyGetMeterBrandByIdQuery,
    useGetMeterBrandByIdQuery,
    useLazyGetAllMeterBrandQuery,
    useGetAllMeterBrandQuery,
    useDeleteMeterModelMutation,
    useUpdateMeterModelMutation,
    useAddMeterModelMutation,
    useLazyGetMeterModelByIdQuery,
    useGetMeterModelByIdQuery,
    useLazyGetAllMeterModelQuery,
    useGetAllMeterModelQuery,
    useLazyGetAllMeterReadingTimeQuery,
    useGetAllMeterReadingTimeQuery,
    useLazyGetMeterReadingTimeByIdQuery,
    useGetMeterReadingTimeByIdQuery,
    useDeleteMeterMutation,
    useUpdateMeterMutation,
    useAddMeterMutation,
    useLazyGetMeterByIdQuery,
    useGetMeterByIdQuery,
    useLazyGetMeterBySerialNoQuery,
    useGetMeterBySerialNoQuery,
    useLazyGetAllMeterQuery,
    useGetAllMeterQuery,
    useLazyGetMeterFullInfoByIdQuery,
    useGetMeterFullInfoByIdQuery,
    useLazyGetMeterFullInfoBySerialNoQuery,
    useGetMeterFullInfoBySerialNoQuery,
    useLazyGetAllMeterFullInfoQuery,
    useGetAllMeterFullInfoQuery,
}=meterService