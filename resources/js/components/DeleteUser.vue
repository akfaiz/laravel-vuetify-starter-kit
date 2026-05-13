<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { ref, useTemplateRef } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/Heading.vue';
import PasswordInput from '@/components/PasswordInput.vue';

const dialog = ref(false);
const passwordInput = useTemplateRef('passwordInput');
</script>

<template>
    <section class="settings-section">
        <Heading
            variant="small"
            title="Delete account"
            description="Delete your account and all of its resources"
        />

        <VSheet class="delete-warning pa-5">
            <h3 class="text-subtitle-1 font-weight-bold mb-1">Warning</h3>
            <p class="text-body-2 mb-5">
                Please proceed with caution, this cannot be undone.
            </p>
            <VBtn
                color="error"
                class="starter-danger-btn"
                data-test="delete-user-button"
                @click="dialog = true"
            >
                Delete account
            </VBtn>
        </VSheet>
    </section>

    <VDialog v-model="dialog" max-width="520">
        <VCard>
            <Form
                v-bind="ProfileController.destroy.form()"
                reset-on-success
                :options="{ preserveScroll: true }"
                @error="() => passwordInput?.focus()"
                @success="dialog = false"
                v-slot="{ errors, processing, reset, clearErrors }"
            >
                <VCardTitle>Delete account?</VCardTitle>
                <VCardText>
                    <p class="text-body-2 text-medium-emphasis mb-4">
                        Once your account is deleted, all of its resources and
                        data will also be permanently deleted. Enter your
                        password to confirm.
                    </p>

                    <PasswordInput
                        id="password"
                        ref="passwordInput"
                        name="password"
                        label="Password"
                        placeholder="Password"
                        :error-messages="errors.password"
                    />
                </VCardText>

                <VCardActions>
                    <VSpacer />
                    <VBtn
                        variant="text"
                        @click="
                            () => {
                                clearErrors();
                                reset();
                                dialog = false;
                            }
                        "
                    >
                        Cancel
                    </VBtn>
                    <VBtn
                        type="submit"
                        color="error"
                        :loading="processing"
                        :disabled="processing"
                        data-test="confirm-delete-user-button"
                    >
                        Delete account
                    </VBtn>
                </VCardActions>
            </Form>
        </VCard>
    </VDialog>
</template>
