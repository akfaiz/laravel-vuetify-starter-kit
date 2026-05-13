<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import { computed, ref, watchEffect } from 'vue';
import TextLink from '@/components/TextLink.vue';
import { store } from '@/routes/two-factor/login';
import type { TwoFactorConfigContent } from '@/types';

const showRecoveryInput = ref<boolean>(false);
const code = ref<string>('');

const authConfigContent = computed<TwoFactorConfigContent>(() => {
    if (showRecoveryInput.value) {
        return {
            title: 'Recovery code',
            description:
                'Please confirm access to your account by entering one of your emergency recovery codes.',
            buttonText: 'login using an authentication code',
        };
    }

    return {
        title: 'Authentication code',
        description:
            'Enter the authentication code provided by your authenticator application.',
        buttonText: 'login using a recovery code',
    };
});

watchEffect(() => {
    setLayoutProps({
        title: authConfigContent.value.title,
        description: authConfigContent.value.description,
    });
});

const toggleRecoveryMode = (clearErrors: () => void): void => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = '';
};
</script>

<template>
    <Head title="Two-factor authentication" />

    <Form
        v-bind="store.form()"
        reset-on-error
        @error="code = ''"
        #default="{ errors, processing, clearErrors }"
    >
        <template v-if="!showRecoveryInput">
            <input type="hidden" name="code" :value="code" />

            <VOtpInput
                id="otp"
                v-model="code"
                length="6"
                type="number"
                autofocus
                :disabled="processing"
                :error="Boolean(errors.code)"
            />

            <VMessages
                v-if="errors.code"
                active
                color="error"
                :messages="[errors.code]"
                class="mb-4"
            />
        </template>

        <div v-else class="starter-field mb-6">
            <label for="recovery_code">Recovery code</label>
            <VTextField
                id="recovery_code"
                name="recovery_code"
                density="compact"
                variant="outlined"
                hide-details="auto"
                autocomplete="one-time-code"
                autofocus
                required
                :error-messages="errors.recovery_code"
            />
        </div>

        <VBtn
            type="submit"
            color="primary"
            block
            size="large"
            :loading="processing"
            :disabled="processing || (!showRecoveryInput && code.length < 6)"
        >
            Continue
        </VBtn>

        <div class="text-center text-body-2 mt-6">
            <span>or you can </span>
            <TextLink
                href="#"
                as="button"
                @click.prevent="() => toggleRecoveryMode(clearErrors)"
            >
                {{ authConfigContent.buttonText }}
            </TextLink>
        </div>
    </Form>
</template>
