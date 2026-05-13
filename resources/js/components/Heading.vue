<script setup lang="ts">
type Props = {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
};

withDefaults(defineProps<Props>(), {
    variant: 'default',
});
</script>

<template>
    <header :class="variant === 'small' ? 'mb-4' : 'mb-8'">
        <h2 :class="variant === 'small' ? 'text-h6' : 'text-h5'">
            {{ title }}
        </h2>
        <p v-if="description" class="text-body-2 text-medium-emphasis mt-1">
            {{ description }}
        </p>
    </header>
</template>
