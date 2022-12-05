import { configureStore } from '@reduxjs/toolkit'

import { form, toastAlert } from '@ordelogy/ordelogy-fe-lib'

import errorMiddleware from './middlewares/error'

import api from './queries/index'


export const store = configureStore({
    reducer: {
        form,
        toastAlert,

        [api.reducerPath]: api.reducer
    },
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            immutableCheck: false,
            serializableCheck: false
        }
    ).concat(api.middleware, errorMiddleware)
})

export default store