<script lang="ts" setup>
import { useAdminAuthStore } from 'stores/useAdminAuthStore.ts'

const authStore = useAdminAuthStore()
</script>

<template>
    <q-layout>
        <q-page-container>
            <q-page class="items-center justify-center row">
                <q-form class="col-3 row column" style="gap: 16px" @submit.prevent="authStore.handleLogin()">
                    <q-input v-model.trim="authStore.loginData.username" label="Имя пользователя" stack-label />
                    <q-input v-model.trim="authStore.loginData.password" label="Пароль" stack-label />
                    <q-btn :disable="authStore.isLoading" color="primary" label="Войти" type="submit" />
                </q-form>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
