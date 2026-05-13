<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogo from '@/components/AppLogo.vue';
import AppToast from '@/components/AppToast.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <VApp>
        <VMain class="auth-main">
            <VContainer class="fill-height d-flex align-center justify-center">
                <VCard class="auth-card" elevation="4">
                    <VCardText class="pa-8">
                        <Link
                            :href="home()"
                            class="d-flex align-center justify-center mb-6"
                        >
                            <AppLogo />
                        </Link>

                        <div class="text-center mb-6">
                            <h1 v-if="title" class="text-h5">
                                {{ title }}
                            </h1>
                            <p
                                v-if="description"
                                class="text-body-2 text-medium-emphasis mt-2"
                            >
                                {{ description }}
                            </p>
                        </div>

                        <slot />
                    </VCardText>
                </VCard>
            </VContainer>
        </VMain>
        <AppToast />
    </VApp>
</template>

<style scoped>
.auth-main {
    background: rgb(var(--v-theme-background));
}
</style>
