<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
</script>

<template>
    <VAvatar color="#202020" rounded="sm" size="32">
        <AppLogoIcon class="app-logo-icon" />
    </VAvatar>
    <span class="app-logo-text text-subtitle-2 font-weight-bold ms-2">
        Laravel Starter Kit
    </span>
</template>

<style scoped>
.app-logo-icon {
    color: white;
    height: 20px;
    width: 20px;
}
</style>
