import { useSearchStore } from 'stores/useSearchStore.ts'
import { useGeoPositionStore } from 'stores/useGeoPositionStore.ts'
import { ref } from 'vue'
import { Store } from 'src/api/types.ts'
import { MainAPI } from 'src/api'
import { AxiosInstance } from 'axios'

const stores = ref<Store[]>([])
const storeNames = ref<string[]>([])
const isFetching = ref(false)

export function useStoresFetch() {
    async function fetchStoreNames(api: AxiosInstance) {
        isFetching.value = true
        try {
            const mainAPI = new MainAPI(api)

            storeNames.value = await mainAPI.getStores({
                name: useSearchStore().searchValue,
                ...useGeoPositionStore().currentPosition,
                onlyName: true
            })
        } catch (e) {
            console.error(e)
        }
        isFetching.value = false
    }

    async function fetchStores(api: AxiosInstance) {
        isFetching.value = true
        try {
            const mainAPI = new MainAPI(api)

            stores.value = await mainAPI.getStores({
                name: useSearchStore().searchValue,
                ...useGeoPositionStore().currentPosition
            })
        } catch (e) {
            console.error(e)
        }
        isFetching.value = false
    }

    return { stores, storeNames, isFetching, fetchStores, fetchStoreNames }
}
