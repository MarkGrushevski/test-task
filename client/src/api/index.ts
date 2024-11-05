import { Store } from 'src/api/types.ts'
import { AxiosInstance } from 'axios'

export interface GetStoresRequest {
    name: string
    city?: string
    lat?: string | number
    lon?: string | number
    onlyName?: boolean
}

export class MainAPI {
    api: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        if (!axiosInstance) throw new Error('AxiosInstance not defined')
        this.api = axiosInstance
    }

    async getStores<T extends GetStoresRequest>(params: T): Promise<(T['onlyName'] extends true ? string : Store)[]> {
        const { name, city, lat, lon, onlyName } = params

        const url = new URL('http://localhost:8000/stores')

        url.searchParams.append('name', name)
        if (city) url.searchParams.append('city', city)
        if (lat) url.searchParams.append('lat', lat.toString())
        if (lon) url.searchParams.append('lon', lon.toString())
        if (onlyName) url.searchParams.append('only', 'name')

        return this.api.get(url.toString()).then((res) => res.data)
    }

    async login(username: string, password: string) {
        const url = new URL('http://localhost:8000/admin/login')
        return this.api.post(url.toString(), { username, password }).then((res) => res.data)
    }
}
