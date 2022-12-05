import { isRejectedWithValue } from '@reduxjs/toolkit'

import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'


const errroMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            try {
                if (
                    action.payload.status === 400 ||
                    action.payload.status === 404 ||
                    action.payload.status === 422
                ) {
                    return next(action)
                }
                if (action.payload.status === 403) {
                    window.location.href = `${process.env.URL_FRONTEND}/access_denied`
                    return next(action)
                }

                throw "error"
            } catch (error) {
                window.location.href = `${process.env.URL_FRONTEND}/error`
                return next(action)
            }
        }

        return next(action)
    }

export default errroMiddleware