import { Store } from 'src/api/types.ts'
import axios from 'axios'

export interface GetStoresRequest {
    name: string
    city?: string
    lat?: string | number
    lon?: string | number
    onlyName?: boolean
}

export const mainAPI = {
    getStores: async <T extends GetStoresRequest>(
        params: T
    ): Promise<(T['onlyName'] extends true ? string : Store)[]> => {
        const { name, city, lat, lon, onlyName } = params

        const url = new URL('http://localhost:8000/stores')

        url.searchParams.append('name', name)
        if (city) url.searchParams.append('city', city)
        if (lat) url.searchParams.append('lat', lat.toString())
        if (lon) url.searchParams.append('lon', lon.toString())
        if (onlyName) url.searchParams.append('only', 'name')

        return axios.get(url.toString(), { withCredentials: true }).then((res) => res.data)
    },
    login: async (username: string, password: string) => {
        const url = new URL('http://localhost:8000/admin/login')
        return axios.post(url.toString(), { username, password }, { withCredentials: true }).then((res) => res.data)
    }
}
