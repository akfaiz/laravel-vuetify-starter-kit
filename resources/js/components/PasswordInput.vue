<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

defineOptions({ inheritAttrs: false });

const showPassword = ref(false);
const inputRef = useTemplateRef('inputRef');

defineExpose({
    $el: inputRef,
    focus: () => inputRef.value?.focus(),
});
</script>

<template>
    <VTextField
        ref="inputRef"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        v-bind="$attrs"
        @click:append-inner="showPassword = !showPassword"
    />
</template>
