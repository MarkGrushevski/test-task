<script lang="ts" setup>
import StoreCard from 'components/StoreCard.vue'
import { useStoresFetch } from 'src/composables/useStoresFetch.ts'
import StoresLayout from 'layouts/StoresLayout.vue'
import SearchBar from 'components/SearchBar.vue'
import AdminGuardLayout from 'layouts/AdminGuardLayout.vue'
import { useAdminAuthStore } from 'stores/useAdminAuthStore.ts'

const authStore = useAdminAuthStore()
const { stores } = useStoresFetch()
</script>

<template>
    <AdminGuardLayout v-if="!authStore.isLoggedIn" />
    <StoresLayout v-else>
        <template #header>
            <SearchBar />
        </template>
        <q-page class="row items-start q-pa-md" style="gap: 16px">
            <StoreCard
                v-for="store in stores"
                :key="store.name"
                :address="store.address"
                :name="store.name"
                :work-time="store.hours"
            />
        </q-page>
    </StoresLayout>
</template>
