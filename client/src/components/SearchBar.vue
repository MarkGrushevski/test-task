<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import type { QSelect } from 'quasar'
import { useSearchStore } from 'stores/useSearchStore.ts'
import { useStoresFetch } from 'src/composables/useStoresFetch.ts'

const searchStore = useSearchStore()
const { storeNames, isFetching, fetchStores, fetchStoreNames } = useStoresFetch()

const selectRef = useTemplateRef<QSelect>('select')

function handleSearchInput(value: string) {
    if (searchStore.searchValue?.trim() === value?.trim()) return

    searchStore.searchValue = value?.trim() ?? ''

    if (searchStore.searchValue?.length >= 3) {
        fetchStoreNames()
    }
}

onMounted(() => {
    selectRef.value?.showPopup()
})
</script>

<template>
    <q-select
        ref="select"
        :loading="isFetching"
        :model-value="searchStore.searchValue"
        :options="searchStore.searchValue?.length >= 3 ? storeNames : []"
        class="col-8 bg-white"
        clear-icon="close"
        clearable
        color="green"
        emit-value
        fill-input
        hide-selected
        input-debounce="0"
        label="Название магазина"
        outlined
        rounded
        type="search"
        use-input
        @update:model-value="searchStore.searchValue = $event"
        @input-value="handleSearchInput"
    >
        <template #append>
            <q-btn flat label="Поиск" rounded text-color="green" @click="fetchStores()" />
        </template>
        <template #no-option="{ inputValue }">
            <q-item v-show="inputValue">
                <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
        </template>
    </q-select>
</template>
