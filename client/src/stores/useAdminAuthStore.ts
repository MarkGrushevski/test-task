import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginData } from 'src/api/types.ts'
import { MainAPI } from 'src/api'
import { Loading } from 'quasar'

export const useAdminAuthStore = defineStore('admin-auth', () => {
    const isLoading = ref(false)
    const isLoggedIn = ref(false)

    const loginData = ref<LoginData>({
        username: '',
        password: ''
    })

    async function handleLogin() {
        console.log('handleLogin')
        const axios = useAdminAuthStore().$axios
        const mainAPI = new MainAPI(axios)

        Loading.show()
        isLoading.value = true
        try {
            const loggedIn = await mainAPI.login(loginData.value.username, loginData.value.password)
            isLoggedIn.value = !!loggedIn
        } catch (e) {
            // @ts-expect-error e as AxiosError
            console.error(`handleLogin status ${e?.status}`)
        }
        console.log('handleLogin isLoggedIn', isLoggedIn.value)
        isLoading.value = false
        Loading.hide()
    }

    return { isLoading, isLoggedIn, loginData, handleLogin }
})
