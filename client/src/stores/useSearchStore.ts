import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search-store', () => {
    const searchValue = ref<string>('')

    return { searchValue }
})
