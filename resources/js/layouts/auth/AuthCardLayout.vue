<script setup lang="ts">
import AuthSimpleLayout from '@/layouts/auth/AuthSimpleLayout.vue';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <AuthSimpleLayout :title="title" :description="description">
        <slot />
    </AuthSimpleLayout>
</template>
