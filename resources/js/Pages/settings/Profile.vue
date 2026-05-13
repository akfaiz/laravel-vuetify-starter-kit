<script setup lang="ts">
import { Form, Head, Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/DeleteUser.vue';
import Heading from '@/components/Heading.vue';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

type Props = {
    mustVerifyEmail: boolean;
    status?: string;
};

defineProps<Props>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Profile settings',
                href: edit(),
            },
        ],
    },
});

const page = usePage();
const user = computed(() => page.props.auth.user);
const name = ref(user.value.name);
const email = ref(user.value.email);
</script>

<template>
    <Head title="Profile settings" />

    <section class="settings-section">
        <Heading
            variant="small"
            title="Profile information"
            description="Update your name and email address"
        />

        <Form
            v-bind="ProfileController.update.form()"
            v-slot="{ errors, processing }"
        >
            <div class="starter-field mb-4">
                <label for="name">Name</label>
                <VTextField
                    id="name"
                    v-model="name"
                    name="name"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    required
                    autocomplete="name"
                    :error-messages="errors.name"
                />
            </div>

            <div class="starter-field mb-6">
                <label for="email">Email address</label>
                <VTextField
                    id="email"
                    v-model="email"
                    type="email"
                    name="email"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    required
                    autocomplete="username"
                    :error-messages="errors.email"
                />
            </div>

            <VAlert
                v-if="mustVerifyEmail && !user.email_verified_at"
                type="warning"
                variant="tonal"
                class="mb-4"
            >
                Your email address is unverified.
                <Link :href="send()" as="button" class="text-primary">
                    Click here to resend the verification email.
                </Link>

                <div v-if="status === 'verification-link-sent'" class="mt-2">
                    A new verification link has been sent to your email address.
                </div>
            </VAlert>

            <VBtn
                color="primary"
                type="submit"
                :loading="processing"
                :disabled="processing"
                data-test="update-profile-button"
            >
                Save
            </VBtn>
        </Form>
    </section>

    <DeleteUser />
</template>
