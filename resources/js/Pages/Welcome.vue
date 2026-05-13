<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AppLogo from '@/components/AppLogo.vue';
import { dashboard, login, register } from '@/routes';

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);
</script>

<template>
    <Head title="Welcome" />

    <VApp>
        <VMain>
            <VContainer class="py-6">
                <div class="d-flex justify-space-between align-center mb-10">
                    <Link :href="dashboard()" class="d-flex align-center">
                        <AppLogo />
                    </Link>

                    <div class="d-flex ga-2">
                        <Link v-if="$page.props.auth.user" :href="dashboard()">
                            <VBtn color="primary">Dashboard</VBtn>
                        </Link>
                        <template v-else>
                            <Link :href="login()">
                                <VBtn variant="text">Log in</VBtn>
                            </Link>
                            <Link v-if="canRegister" :href="register()">
                                <VBtn color="primary">Register</VBtn>
                            </Link>
                        </template>
                    </div>
                </div>

                <VRow align="center" class="min-screen">
                    <VCol cols="12" md="6">
                        <h1 class="text-h3 mb-4">Laravel Starter Kit</h1>
                        <p class="text-body-1 text-medium-emphasis mb-6">
                            A Laravel, Inertia, Vue, Fortify, Wayfinder, and
                            Vuetify foundation for building authenticated
                            applications.
                        </p>

                        <div class="d-flex flex-wrap ga-3">
                            <Link
                                v-if="$page.props.auth.user"
                                :href="dashboard()"
                            >
                                <VBtn
                                    color="primary"
                                    size="large"
                                    prepend-icon="mdi-view-dashboard-outline"
                                >
                                    Dashboard
                                </VBtn>
                            </Link>
                            <template v-else>
                                <Link :href="login()">
                                    <VBtn
                                        color="primary"
                                        size="large"
                                        prepend-icon="mdi-login"
                                    >
                                        Log in
                                    </VBtn>
                                </Link>
                                <Link v-if="canRegister" :href="register()">
                                    <VBtn
                                        variant="tonal"
                                        size="large"
                                        prepend-icon="mdi-account-plus-outline"
                                    >
                                        Register
                                    </VBtn>
                                </Link>
                            </template>
                        </div>
                    </VCol>

                    <VCol cols="12" md="6">
                        <VCard variant="flat" border>
                            <VList lines="two">
                                <VListItem
                                    prepend-icon="mdi-vuetify"
                                    title="Vuetify UI"
                                    subtitle="Material components, themes, icons, and responsive layout primitives."
                                />
                                <VDivider />
                                <VListItem
                                    prepend-icon="mdi-laravel"
                                    title="Laravel backend"
                                    subtitle="Fortify authentication, settings, and two-factor flows."
                                />
                                <VDivider />
                                <VListItem
                                    prepend-icon="mdi-link-variant"
                                    title="Wayfinder routes"
                                    subtitle="Typed frontend links and forms connected to Laravel endpoints."
                                />
                            </VList>
                        </VCard>
                    </VCol>
                </VRow>
            </VContainer>
        </VMain>
    </VApp>
</template>

<style scoped>
.min-screen {
    min-height: calc(100vh - 180px);
}
</style>
