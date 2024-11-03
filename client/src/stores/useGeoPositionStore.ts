import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeoPositionStore = defineStore('geo-position', () => {
    const currentPosition = ref<{ lat: number; lon: number }>({
        lat: 55.76,
        lon: 37.62
    })

    function askUserPosition() {
        navigator.geolocation.getCurrentPosition((geoData) => {
            console.log(geoData)
            currentPosition.value = {
                lat: geoData.coords.latitude,
                lon: geoData.coords.longitude
            }
        })
    }

    return { currentPosition, askUserPosition }
})
