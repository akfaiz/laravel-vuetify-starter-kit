<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import AlertError from '@/components/AlertError.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref<boolean>(false);
const recoveryCodeSectionRef = useTemplateRef('recoveryCodeSectionRef');

const toggleRecoveryCodesVisibility = async (): Promise<void> => {
    if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }

    isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

    if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(async () => {
    if (!recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }
});
</script>

<template>
    <VCard variant="tonal">
        <VCardTitle class="d-flex align-center ga-2">
            <VIcon icon="mdi-lock-key-outline" />
            2FA recovery codes
        </VCardTitle>
        <VCardText>
            <p class="text-body-2 text-medium-emphasis mb-4">
                Recovery codes let you regain access if you lose your 2FA
                device. Store them in a secure password manager.
            </p>

            <div class="d-flex flex-wrap ga-3 mb-4">
                <VBtn
                    :prepend-icon="
                        isRecoveryCodesVisible ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click="toggleRecoveryCodesVisibility"
                >
                    {{ isRecoveryCodesVisible ? 'Hide' : 'View' }} recovery
                    codes
                </VBtn>

                <Form
                    v-if="isRecoveryCodesVisible && recoveryCodesList.length"
                    v-bind="regenerateRecoveryCodes.form()"
                    method="post"
                    :options="{ preserveScroll: true }"
                    @success="fetchRecoveryCodes"
                    #default="{ processing }"
                >
                    <VBtn
                        type="submit"
                        variant="tonal"
                        prepend-icon="mdi-refresh"
                        :loading="processing"
                        :disabled="processing"
                    >
                        Regenerate codes
                    </VBtn>
                </Form>
            </div>

            <VExpandTransition>
                <div v-show="isRecoveryCodesVisible">
                    <AlertError v-if="errors.length" :errors="errors" />

                    <div v-else>
                        <div ref="recoveryCodeSectionRef">
                            <VSheet
                                class="pa-4 font-monospace"
                                rounded="lg"
                                border
                            >
                                <template v-if="!recoveryCodesList.length">
                                    <VSkeletonLoader type="paragraph" />
                                </template>
                                <div
                                    v-for="(code, index) in recoveryCodesList"
                                    v-else
                                    :key="index"
                                >
                                    {{ code }}
                                </div>
                            </VSheet>
                        </div>

                        <p class="text-caption text-medium-emphasis mt-3">
                            Each recovery code can be used once to access your
                            account and will be removed after use.
                        </p>
                    </div>
                </div>
            </VExpandTransition>
        </VCardText>
    </VCard>
</template>
