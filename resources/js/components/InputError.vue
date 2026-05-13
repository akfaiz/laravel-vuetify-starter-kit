<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>

<template>
    <VMessages
        v-if="message"
        active
        color="error"
        :messages="[message]"
        role="alert"
    />
</template>
