<script setup lang="ts">
import { computed } from 'vue';
import { flashToastState } from '@/lib/flashToast';

const color = computed(() => {
    switch (flashToastState.toast?.type) {
        case 'error':
            return 'error';
        case 'info':
            return 'info';
        case 'warning':
            return 'warning';
        default:
            return 'success';
    }
});
</script>

<template>
    <VSnackbar v-model="flashToastState.show" :color="color" location="top end">
        {{ flashToastState.toast?.message }}

        <template #actions>
            <VBtn
                variant="text"
                icon="mdi-close"
                @click="flashToastState.show = false"
            />
        </template>
    </VSnackbar>
</template>
