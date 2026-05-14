<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import PasswordInput from '@/components/PasswordInput.vue';
import { store } from '@/routes/password/confirm';

defineOptions({
    layout: {
        title: 'Confirm your password',
        description:
            'This is a secure area of the application. Please confirm your password before continuing.',
    },
});
</script>

<template>
    <Head title="Confirm password" />

    <Form
        v-bind="store.form()"
        reset-on-success
        v-slot="{ errors, processing }"
    >
        <div class="starter-field mb-6">
            <label for="password">Password</label>
            <PasswordInput
                id="password"
                name="password"
                density="compact"
                variant="outlined"
                hide-details="auto"
                required
                autocomplete="current-password"
                autofocus
                :error-messages="errors.password"
            />
        </div>

        <VBtn
            type="submit"
            color="primary"
            block
            size="large"
            :loading="processing"
            :disabled="processing"
            data-test="confirm-password-button"
        >
            Confirm password
        </VBtn>
    </Form>
</template>
