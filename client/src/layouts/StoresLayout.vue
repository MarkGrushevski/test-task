<script lang="ts" setup>
import { onMounted } from 'vue'
import { useGeoPositionStore } from 'stores/useGeoPositionStore.ts'

onMounted(() => {
    useGeoPositionStore().askUserPosition()
})
</script>

<template>
    <q-layout>
        <q-header class="justify-center row q-pa-md bg-white">
            <slot name="header" />
        </q-header>

        <q-page-container>
            <slot></slot>
        </q-page-container>
    </q-layout>
</template>
