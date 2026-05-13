<script setup lang="ts">
import { useId } from 'vue';

const patternId = `pattern-${useId()}`;
</script>

<template>
    <svg class="placeholder-pattern" fill="none">
        <defs>
            <pattern
                :id="patternId"
                x="0"
                y="0"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
            >
                <path d="M-1 5L5 -1M3 9L8.5 3.5" stroke-width="0.5"></path>
            </pattern>
        </defs>
        <rect
            stroke="none"
            :fill="`url(#${patternId})`"
            width="100%"
            height="100%"
        ></rect>
    </svg>
</template>

<style scoped>
.placeholder-pattern {
    height: 100%;
    inset: 0;
    position: absolute;
    stroke: rgba(var(--v-theme-on-surface), 0.2);
    width: 100%;
}
</style>
