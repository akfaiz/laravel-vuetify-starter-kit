<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { update } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Reset password',
        description: 'Please enter your new password below',
    },
});

const props = defineProps<{
    token: string;
    email: string;
}>();

const inputEmail = ref(props.email);
</script>

<template>
    <Head title="Reset password" />

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email: inputEmail })"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
    >
        <div class="starter-field mb-4">
            <label for="email">Email</label>
            <VTextField
                id="email"
                v-model="inputEmail"
                type="email"
                name="email"
                density="compact"
                variant="outlined"
                hide-details="auto"
                autocomplete="email"
                readonly
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
                autocomplete="new-password"
                autofocus
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
            data-test="reset-password-button"
        >
            Reset password
        </VBtn>
    </Form>
</template>
