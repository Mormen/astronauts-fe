import api from './index'

import {
    astronautsResultType,
    astronautResultType
} from 'src/types/api'


const atronautsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAstronauts: build.query<astronautsResultType, { filters: string }>({
            query: (payload) => {
                const { filters } = payload
                return `/astronauts${filters}`
            },
            providesTags: ["ASTRONAUT"]
        }),
        getAstronaut: build.query<astronautResultType, { astronautId: string }>({
            query: (payload) => {
                const { astronautId } = payload
                return `/astronauts/${astronautId}`
            },
            providesTags: ["ASTRONAUT"]
        }),
        newAstronaut: build.mutation({
            query: (payload) => {
                const { form } = payload
                return {
                    url: "/astronauts",
                    method: "POST",
                    body: form
                }
            },
            invalidatesTags: (result, error, arg) => {
                if (result) return ["ASTRONAUT"]
            }
        }),
        editAstronaut: build.mutation({
            query: (payload) => {
                const { astronautId, form } = payload
                return {
                    url: `/astronauts/${astronautId}`,
                    method: "PUT",
                    body: form
                }
            },
            invalidatesTags: (result, error, arg) => {
                if (result) return ["ASTRONAUT"]
            }
        }),
        deleteAstronaut: build.mutation({
            query: (payload) => {
                const { astronautId } = payload
                return {
                    url: `/astronauts/${astronautId}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: (result, error, arg) => {
                if (result) return ["ASTRONAUT"]
            }
        })
    })
})

export const {
    useGetAstronautsQuery,
    useGetAstronautQuery,
    useNewAstronautMutation,
    useEditAstronautMutation,
    useDeleteAstronautMutation
} = atronautsApi