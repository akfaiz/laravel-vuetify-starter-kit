<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

defineOptions({
    layout: {
        title: 'Verify email',
        description:
            'Please verify your email address by clicking on the link we just emailed to you.',
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Email verification" />

    <VAlert
        v-if="status === 'verification-link-sent'"
        type="success"
        variant="tonal"
        class="mb-4"
    >
        A new verification link has been sent to the email address you provided
        during registration.
    </VAlert>

    <Form v-bind="send.form()" class="text-center" v-slot="{ processing }">
        <VBtn
            type="submit"
            color="primary"
            :loading="processing"
            :disabled="processing"
        >
            Resend verification email
        </VBtn>

        <div class="mt-4">
            <TextLink :href="logout()" as="button">Log out</TextLink>
        </div>
    </Form>
</template>
