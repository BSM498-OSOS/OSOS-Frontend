import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const readingService=createApi({
    reducerPath:'readingService',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_URL+'Readings/',
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token
            if(token){
                headers.set('Authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({
        getReadingsBySerialNo:builder.query({
            query:(serialNo)=>({
                url:`readingGetBySerialNo?serialNo=${serialNo}`,
                method: 'GET',
            })
        }),
        getAllReadings:builder.query({
            query:()=>({
                url:`readingGetAll`,
                method: 'GET',
            })
        }),
        getAllReadingsByDates:builder.query({
            query:(minDate,maxDate)=>({
                url:`readingGetAllbyDates?minDate=${minDate}&maxDate=${maxDate}`,
                method: 'GET',
            })
        }),
        getAllTotalConsumptions:builder.query({
            query:()=>({
                url:`readingGetAllTotalConsumptions`,
                method: 'GET',
            })
        }),
        getAllTotalConsumptionsDaily:builder.query({
            query:()=>({
                url:`readingGetAllTotalConsumptionDaily`,
                method: 'GET',
            })
        }),
        getAllTotalConsumptionsMonthly:builder.query({
            query:()=>({
                url:`readingGetAllTotalConsumptionMonthly`,
                method: 'GET',
            })
        }),
        getAllTotalConsumptionsYearly:builder.query({
            query:()=>({
                url:`readingGetAllTotalConsumptionYearly`,
                method: 'GET',
            })
        }),
        getTotalConsumptionsDailyBySerialNo:builder.query({
            query:(serialNo)=>({
                url:`readingGetTotalConsumptionDailyBySerialNo?serialNo=${serialNo}`,
                method: 'GET',
            })
        }),
        getTotalConsumptionsMonthlyBySerialNo:builder.query({
            query:(serialNo)=>({
                url:`readingGetTotalConsumptionMonthlyBySerialNo?serialNo=${serialNo}`,
                method: 'GET',
            })
        }),
        getTotalConsumptionsYearlyBySerialNo:builder.query({
            query:(serialNo)=>({
                url:`readingGetTotalConsumptionYearlyBySerialNo?serialNo=${serialNo}`,
                method: 'GET',
            })
        }),
    })
})

export const{
    useLazyGetReadingsBySerialNoQuery,
    useGetReadingsBySerialNoQuery,
    useLazyGetAllReadingsQuery,
    useGetAllReadingsQuery,
    useLazyGetAllReadingsByDatesQuery,
    useGetAllReadingsByDatesQuery,
    useLazyGetAllTotalConsumptionsQuery,
    useGetAllTotalConsumptionsQuery,
    useLazyGetAllTotalConsumptionsDailyQuery,
    useGetAllTotalConsumptionsDailyQuery,
    useLazyGetAllTotalConsumptionsMonthlyQuery,
    useGetAllTotalConsumptionsMonthlyQuery,
    useLazyGetAllTotalConsumptionsYearlyQuery,
    useGetAllTotalConsumptionsYearlyQuery,
    useLazyGetTotalConsumptionsDailyBySerialNoQuery,
    useGetTotalConsumptionsDailyBySerialNoQuery,
    useLazyGetTotalConsumptionsMonthlyBySerialNoQuery,
    useGetTotalConsumptionsMonthlyBySerialNoQuery,
    useLazyGetTotalConsumptionsYearlyBySerialNoQuery,
    useGetTotalConsumptionsYearlyBySerialNoQuery,
}=readingService