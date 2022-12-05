import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.URL_API,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }),
    endpoints: () => ({}),
    tagTypes: ["ASTRONAUT"]
})

export default api
