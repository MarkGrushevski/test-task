import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { Cookies } from 'quasar'
import { QSsrContext } from '@quasar/app-vite'

declare module 'vue' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance
    }
}

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $axios: AxiosInstance
    }
}

export default boot(({ app, store, ssrContext }) => {
    const api = axios.create({ baseURL: 'http://localhost:8000', withCredentials: true })

    const cookies = getCookies(ssrContext)

    api.interceptors.request.use(
        (config) => {
            const token = cookies.get('jwt')

            console.group(process.env.SERVER ? 'Request server' : 'Request client')
            console.log('cookies', cookies.getAll())
            console.groupEnd()

            if (token) {
                config.headers.Cookie = 'jwt=' + token
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    api.interceptors.response.use(
        (config) => {
            // const cookies = getCookies(ssrContext)
            const token = cookies.get('jwt')

            console.group(process.env.SERVER ? 'Response server' : 'Response client')
            console.log('cookies', cookies.getAll())
            console.groupEnd()

            if (token) {
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    app.provide('axios', api)

    store.use(() => ({ $axios: api }))

    app.config.globalProperties.$axios = api
})

function getCookies(ssrContext: QSsrContext | null | undefined) {
    return process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
}
