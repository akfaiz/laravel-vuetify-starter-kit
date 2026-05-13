<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import AppLogo from '@/components/AppLogo.vue';
import AppToast from '@/components/AppToast.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { getInitials } from '@/composables/useInitials';
import { dashboard, logout } from '@/routes';
import { edit as editProfile } from '@/routes/profile';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
};

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const auth = computed(() => page.props.auth);
const { mdAndDown } = useDisplay();
const isMobile = computed(() => mdAndDown.value);
const drawer = ref(!isMobile.value);
const rail = ref(false);
const { isCurrentUrl } = useCurrentUrl();

const pageTitle = computed(
    () =>
        props.title ??
        props.breadcrumbs.at(-1)?.title ??
        props.breadcrumbs[0]?.title ??
        'Laravel Starter Kit',
);

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'mdi-view-dashboard-outline',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/akfaiz/laravel-vuetify-starter-kit',
        icon: 'mdi-source-repository',
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: 'mdi-book-open-page-variant-outline',
    },
];

const toUrl = (href: NavItem['href']): string =>
    typeof href === 'string' ? href : href.url;

const handleLogout = (): void => {
    router.flushAll();
};

const toggleSidebar = (): void => {
    if (isMobile.value) {
        drawer.value = !drawer.value;

        return;
    }

    rail.value = !rail.value;
};

watch(
    isMobile,
    (mobile) => {
        if (mobile) {
            rail.value = false;
            drawer.value = false;

            return;
        }

        drawer.value = true;
    },
    { immediate: true },
);
</script>

<template>
    <VApp>
        <VNavigationDrawer
            v-model="drawer"
            :rail="isMobile ? false : rail"
            class="app-sidebar"
            :permanent="!isMobile"
            :temporary="isMobile"
            rail-width="72"
            scrim
            width="290"
        >
            <template #prepend>
                <Link :href="dashboard()" class="app-sidebar-brand">
                    <AppLogo />
                </Link>
            </template>

            <div class="app-sidebar-section-label">Platform</div>

            <nav class="app-sidebar-nav" aria-label="Platform">
                <Link
                    v-for="item in mainNavItems"
                    :key="item.title"
                    :href="item.href"
                    class="app-sidebar-link"
                    :class="{
                        'app-sidebar-link-active': isCurrentUrl(item.href),
                    }"
                >
                    <VIcon :icon="item.icon" size="20" />
                    <span class="app-sidebar-link-label">
                        {{ item.title }}
                    </span>
                </Link>
            </nav>

            <template #append>
                <nav class="app-sidebar-footer" aria-label="Resources">
                    <a
                        v-for="item in footerNavItems"
                        :key="item.title"
                        :href="toUrl(item.href)"
                        class="app-sidebar-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <VIcon :icon="item.icon" size="20" />
                        <span class="app-sidebar-link-label">
                            {{ item.title }}
                        </span>
                    </a>
                </nav>

                <VMenu location="top end">
                    <template #activator="{ props: menuProps }">
                        <button
                            v-bind="menuProps"
                            type="button"
                            class="app-sidebar-user"
                        >
                            <VAvatar
                                class="app-sidebar-user-avatar"
                                rounded="md"
                                size="36"
                            >
                                <VImg
                                    v-if="auth.user.avatar"
                                    :src="auth.user.avatar"
                                    :alt="auth.user.name"
                                />
                                <span v-else>
                                    {{ getInitials(auth.user.name) }}
                                </span>
                            </VAvatar>
                            <span class="app-sidebar-user-name">
                                {{ auth.user.name }}
                            </span>
                            <VIcon
                                class="app-sidebar-user-chevron"
                                icon="mdi-chevron-up-down"
                                size="18"
                            />
                        </button>
                    </template>

                    <VCard class="app-sidebar-user-menu" min-width="260">
                        <VList>
                            <VListItem
                                :title="auth.user.name"
                                :subtitle="auth.user.email"
                            >
                                <template #prepend>
                                    <VAvatar
                                        color="surface-variant"
                                        rounded="sm"
                                        size="36"
                                    >
                                        <VImg
                                            v-if="auth.user.avatar"
                                            :src="auth.user.avatar"
                                            :alt="auth.user.name"
                                        />
                                        <span v-else>
                                            {{ getInitials(auth.user.name) }}
                                        </span>
                                    </VAvatar>
                                </template>
                            </VListItem>
                        </VList>

                        <VDivider />

                        <VList density="compact">
                            <Link :href="editProfile()" prefetch>
                                <VListItem
                                    prepend-icon="mdi-cog-outline"
                                    title="Settings"
                                />
                            </Link>
                            <Link
                                :href="logout()"
                                as="button"
                                data-test="logout-button"
                                @click="handleLogout"
                            >
                                <VListItem
                                    prepend-icon="mdi-logout"
                                    title="Log out"
                                />
                            </Link>
                        </VList>
                    </VCard>
                </VMenu>
            </template>
        </VNavigationDrawer>

        <VMain class="app-main">
            <div class="app-frame">
                <header class="app-frame-header">
                    <VBtn
                        aria-label="Toggle sidebar"
                        icon="mdi-dock-left"
                        size="small"
                        variant="text"
                        @click="toggleSidebar"
                    />
                    <span class="app-frame-title">{{ pageTitle }}</span>
                </header>

                <main class="app-frame-body">
                    <slot />
                </main>
            </div>
        </VMain>

        <AppToast />
    </VApp>
</template>
