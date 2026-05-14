<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';

defineOptions({
    layout: {
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    },
});
</script>

<template>
    <Head title="Register" />

    <Form
        v-bind="store.form()"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
    >
        <div class="starter-field mb-4">
            <label for="name">Name</label>
            <VTextField
                id="name"
                name="name"
                density="compact"
                variant="outlined"
                hide-details="auto"
                required
                autofocus
                autocomplete="name"
                :error-messages="errors.name"
            />
        </div>

        <div class="starter-field mb-4">
            <label for="email">Email address</label>
            <VTextField
                id="email"
                type="email"
                name="email"
                density="compact"
                variant="outlined"
                hide-details="auto"
                required
                autocomplete="email"
                :error-messages="errors.email"
            />
        </div>

        <div class="starter-field mb-4">
            <label for="password">Password</label>
            <PasswordInput
                id="password"
                name="password"
                density="compact"
                variant="outlined"
                hide-details="auto"
                required
                autocomplete="new-password"
                :error-messages="errors.password"
            />
        </div>

        <div class="starter-field mb-6">
            <label for="password_confirmation">Confirm password</label>
            <PasswordInput
                id="password_confirmation"
                name="password_confirmation"
                density="compact"
                variant="outlined"
                hide-details="auto"
                required
                autocomplete="new-password"
                :error-messages="errors.password_confirmation"
            />
        </div>

        <VBtn
            type="submit"
            color="primary"
            block
            size="large"
            :loading="processing"
            :disabled="processing"
            data-test="register-user-button"
        >
            Create account
        </VBtn>

        <div class="text-center text-body-2 mt-6">
            Already have an account?
            <TextLink :href="login()" :tabindex="6">Log in</TextLink>
        </div>
    </Form>
</template>
