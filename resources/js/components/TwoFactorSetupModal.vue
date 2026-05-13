<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import AlertError from '@/components/AlertError.vue';
import { useAppearance } from '@/composables/useAppearance';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import type { TwoFactorConfigContent } from '@/types';

type Props = {
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
};

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('isOpen');

const { resolvedAppearance } = useAppearance();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } =
    useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<string>('');
const copied = ref(false);
const pinInputContainerRef = useTemplateRef('pinInputContainerRef');

const modalConfig = computed<TwoFactorConfigContent>(() => {
    if (props.twoFactorEnabled) {
        return {
            title: 'Two-factor authentication enabled',
            description:
                'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            buttonText: 'Close',
        };
    }

    if (showVerificationStep.value) {
        return {
            title: 'Verify authentication code',
            description: 'Enter the 6-digit code from your authenticator app',
            buttonText: 'Continue',
        };
    }

    return {
        title: 'Enable two-factor authentication',
        description:
            'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        buttonText: 'Continue',
    };
});

const copySetupKey = async (): Promise<void> => {
    if (!manualSetupKey.value) {
        return;
    }

    await navigator.clipboard.writeText(manualSetupKey.value);
    copied.value = true;
    window.setTimeout(() => {
        copied.value = false;
    }, 1600);
};

const handleModalNextStep = (): void => {
    if (props.requiresConfirmation) {
        showVerificationStep.value = true;

        nextTick(() => {
            pinInputContainerRef.value?.querySelector('input')?.focus();
        });

        return;
    }

    clearSetupData();
    isOpen.value = false;
};

const resetModalState = (): void => {
    if (props.twoFactorEnabled) {
        clearSetupData();
    }

    showVerificationStep.value = false;
    code.value = '';
    copied.value = false;
};

watch(
    () => isOpen.value,
    async (isOpen) => {
        if (!isOpen) {
            resetModalState();

            return;
        }

        if (!qrCodeSvg.value) {
            await fetchSetupData();
        }
    },
);
</script>

<template>
    <VDialog v-model="isOpen" max-width="520">
        <VCard>
            <VCardTitle class="d-flex align-center ga-2">
                <VIcon icon="mdi-qrcode-scan" />
                {{ modalConfig.title }}
            </VCardTitle>

            <VCardSubtitle>{{ modalConfig.description }}</VCardSubtitle>

            <VCardText>
                <template v-if="!showVerificationStep">
                    <AlertError v-if="errors.length" :errors="errors" />

                    <template v-else>
                        <div class="d-flex justify-center my-4">
                            <VSheet
                                width="256"
                                height="256"
                                rounded="lg"
                                border
                                class="pa-4 d-flex align-center justify-center"
                            >
                                <VProgressCircular
                                    v-if="!qrCodeSvg"
                                    indeterminate
                                    color="primary"
                                />
                                <div
                                    v-else
                                    class="qr-code"
                                    v-html="qrCodeSvg"
                                    :style="{
                                        filter:
                                            resolvedAppearance === 'dark'
                                                ? 'invert(1) brightness(1.5)'
                                                : undefined,
                                    }"
                                />
                            </VSheet>
                        </div>

                        <VBtn
                            color="primary"
                            block
                            class="mb-4"
                            @click="handleModalNextStep"
                        >
                            {{ modalConfig.buttonText }}
                        </VBtn>

                        <VDivider class="my-4">or enter manually</VDivider>

                        <VTextField
                            :model-value="manualSetupKey"
                            readonly
                            label="Setup key"
                            :loading="!manualSetupKey"
                            append-inner-icon="mdi-content-copy"
                            @click:append-inner="copySetupKey"
                        />

                        <VAlert
                            v-if="copied"
                            type="success"
                            variant="tonal"
                            density="compact"
                        >
                            Setup key copied.
                        </VAlert>
                    </template>
                </template>

                <template v-else>
                    <Form
                        v-bind="confirm.form()"
                        error-bag="confirmTwoFactorAuthentication"
                        reset-on-error
                        @finish="code = ''"
                        @success="isOpen = false"
                        v-slot="{ errors, processing }"
                    >
                        <input type="hidden" name="code" :value="code" />

                        <div ref="pinInputContainerRef">
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
                        </div>

                        <div class="d-flex ga-3">
                            <VBtn
                                type="button"
                                variant="tonal"
                                block
                                :disabled="processing"
                                @click="showVerificationStep = false"
                            >
                                Back
                            </VBtn>
                            <VBtn
                                type="submit"
                                color="primary"
                                block
                                :loading="processing"
                                :disabled="processing || code.length < 6"
                            >
                                Confirm
                            </VBtn>
                        </div>
                    </Form>
                </template>
            </VCardText>
        </VCard>
    </VDialog>
</template>
