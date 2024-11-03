import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginData } from 'src/api/types.ts'

export const useAdminAuthStore = defineStore('admin-auth', () => {
    const loginData = ref<LoginData>({
        username: '',
        password: ''
    })

    const isLoggedIn = ref(false)

    return { loginData, isLoggedIn }
})
