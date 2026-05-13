import { router } from '@inertiajs/vue3';
import { reactive } from 'vue';
import type { FlashToast } from '@/types/ui';

export const flashToastState = reactive<{
    show: boolean;
    toast: FlashToast | null;
}>({
    show: false,
    toast: null,
});

export function initializeFlashToast(): void {
    router.on('flash', (event) => {
        const flash = (event as CustomEvent).detail?.flash;
        const data = flash?.toast as FlashToast | undefined;

        if (!data) {
            return;
        }

        flashToastState.toast = data;
        flashToastState.show = true;
    });
}
