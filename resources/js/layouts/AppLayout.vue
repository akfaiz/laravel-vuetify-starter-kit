<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItem } from '@/types';

const { breadcrumbs = [], title } = defineProps<{
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}>();
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs" :title="title">
        <slot />
    </AppLayout>
</template>
