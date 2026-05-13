<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', icon: 'mdi-white-balance-sunny', label: 'Light' },
    { value: 'dark', icon: 'mdi-weather-night', label: 'Dark' },
    { value: 'system', icon: 'mdi-monitor', label: 'System' },
] as const;
</script>

<template>
    <VBtnToggle
        :model-value="appearance"
        mandatory
        color="primary"
        variant="outlined"
        divided
        density="compact"
        @update:model-value="updateAppearance"
    >
        <VBtn
            v-for="{ value, icon, label } in tabs"
            :key="value"
            :prepend-icon="icon"
            :value="value"
            density="compact"
            size="small"
        >
            {{ label }}
        </VBtn>
    </VBtnToggle>
</template>
