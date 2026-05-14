<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import { login } from '@/routes';
import { email } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Forgot password',
        description: 'Enter your email to receive a password reset link',
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Forgot password" />

    <VAlert v-if="status" type="success" variant="tonal" class="mb-4">
        {{ status }}
    </VAlert>

    <Form v-bind="email.form()" v-slot="{ errors, processing }">
        <div class="starter-field mb-6">
            <label for="email">Email address</label>
            <VTextField
                id="email"
                type="email"
                name="email"
                density="compact"
                variant="outlined"
                hide-details="auto"
                autocomplete="off"
                autofocus
                :error-messages="errors.email"
            />
        </div>

        <VBtn
            type="submit"
            color="primary"
            block
            size="large"
            :loading="processing"
            :disabled="processing"
            data-test="email-password-reset-link-button"
        >
            Email password reset link
        </VBtn>
    </Form>

    <div class="text-center text-body-2 mt-6">
        Or, return to <TextLink :href="login()">log in</TextLink>
    </div>
</template>
