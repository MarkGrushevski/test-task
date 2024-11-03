<script lang="ts" setup>
defineProps<{ name?: string; workTime?: string; address?: string }>()
</script>

<template>
    <q-card bordered class="text-green" flat style="flex-grow: 1; width: 30%; border-color: green">
        <q-card-section>
            <div v-if="name" class="text-h6">{{ name }}</div>
            <div v-if="workTime" class="text-subtitle2">Время работы: {{ workTime }}</div>
        </q-card-section>
        <q-card-section v-if="address">
            <div class="text-subtitle2">Адрес: {{ address }}</div>
        </q-card-section>
    </q-card>
</template>
