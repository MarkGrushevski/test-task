<script lang="ts" setup>
import { mainAPI } from 'src/api'
import { useAdminAuthStore } from 'stores/useAdminAuthStore.ts'
import { onMounted, ref } from 'vue'

const authStore = useAdminAuthStore()
const loading = ref(false)

async function handleLogin() {
    return mainAPI.login(authStore.loginData.username, authStore.loginData.password).then((loggedIn) => {
        if (loggedIn) {
            authStore.isLoggedIn = true
        }
    })
}

onMounted(async () => {
    loading.value = true
    await handleLogin()
    loading.value = false
})
</script>

<template>
    <q-layout>
        <q-page-container>
            <q-page class="items-center justify-center row">
                <q-form class="col-3 row column" style="gap: 16px">
                    <q-input v-model.trim="authStore.loginData.username" label="Имя пользователя" stack-label />
                    <q-input v-model.trim="authStore.loginData.password" label="Пароль" stack-label />
                    <q-btn :disable="loading" color="primary" label="Войти" @click="handleLogin" />
                </q-form>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
