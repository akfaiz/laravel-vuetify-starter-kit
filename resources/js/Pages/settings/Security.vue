<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { onUnmounted, ref } from 'vue';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import Heading from '@/components/Heading.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { edit } from '@/routes/security';
import { disable, enable } from '@/routes/two-factor';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    canManageTwoFactor: false,
    requiresConfirmation: false,
    twoFactorEnabled: false,
});

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Security settings',
                href: edit(),
            },
        ],
    },
});

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const showSetupModal = ref<boolean>(false);

onUnmounted(() => clearTwoFactorAuthData());
</script>

<template>
    <Head title="Security settings" />

    <section class="settings-section">
        <Heading
            variant="small"
            title="Update password"
            description="Ensure your account is using a long, random password to stay secure"
        />

        <Form
            v-bind="SecurityController.update.form()"
            :options="{ preserveScroll: true }"
            reset-on-success
            :reset-on-error="[
                'password',
                'password_confirmation',
                'current_password',
            ]"
            v-slot="{ errors, processing }"
        >
            <div class="starter-field mb-4">
                <label for="current_password">Current password</label>
                <PasswordInput
                    id="current_password"
                    name="current_password"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    autocomplete="current-password"
                    :error-messages="errors.current_password"
                />
            </div>

            <div class="starter-field mb-4">
                <label for="password">New password</label>
                <PasswordInput
                    id="password"
                    name="password"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
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
                    autocomplete="new-password"
                    :error-messages="errors.password_confirmation"
                />
            </div>

            <VBtn
                color="primary"
                type="submit"
                :loading="processing"
                :disabled="processing"
                data-test="update-password-button"
            >
                Save password
            </VBtn>
        </Form>
    </section>

    <section v-if="canManageTwoFactor" class="settings-section">
        <Heading
            variant="small"
            title="Two-factor authentication"
            description="Manage your two-factor authentication settings"
        />

        <template v-if="!twoFactorEnabled">
            <p class="text-body-2 text-medium-emphasis mb-4">
                When you enable two-factor authentication, you will be prompted
                for a secure pin during login. This pin can be retrieved from a
                TOTP-supported application on your phone.
            </p>

            <VBtn
                v-if="hasSetupData"
                prepend-icon="mdi-shield-check-outline"
                color="primary"
                @click="showSetupModal = true"
            >
                Continue setup
            </VBtn>
            <Form
                v-else
                v-bind="enable.form()"
                @success="showSetupModal = true"
                #default="{ processing }"
            >
                <VBtn
                    type="submit"
                    color="primary"
                    :loading="processing"
                    :disabled="processing"
                >
                    Enable 2FA
                </VBtn>
            </Form>
        </template>

        <template v-else>
            <p class="text-body-2 text-medium-emphasis mb-4">
                You will be prompted for a secure, random pin during login,
                which you can retrieve from the TOTP-supported application on
                your phone.
            </p>

            <Form v-bind="disable.form()" #default="{ processing }">
                <VBtn
                    type="submit"
                    color="error"
                    class="mb-6 starter-danger-btn"
                    :loading="processing"
                    :disabled="processing"
                >
                    Disable 2FA
                </VBtn>
            </Form>

            <TwoFactorRecoveryCodes />
        </template>

        <TwoFactorSetupModal
            v-model:isOpen="showSetupModal"
            :requires-confirmation="requiresConfirmation"
            :two-factor-enabled="twoFactorEnabled"
        />
    </section>
</template>
