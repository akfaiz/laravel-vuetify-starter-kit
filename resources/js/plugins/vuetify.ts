import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import type { Appearance } from '@/types';

const DEFAULT_APPEARANCE: Appearance = 'system';

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return DEFAULT_APPEARANCE;
    }

    const value = window.localStorage.getItem('appearance');

    if (value === 'light' || value === 'dark' || value === 'system') {
        return value;
    }

    return DEFAULT_APPEARANCE;
};

export default createVuetify({
    ssr: true,
    defaults: {
        VBtn: {
            rounded: 'sm',
        },
        VCard: {
            rounded: 'lg',
        },
        VTextField: {
            density: 'compact',
            variant: 'outlined',
            hideDetails: 'auto',
        },
        VTextarea: {
            density: 'compact',
            variant: 'outlined',
            hideDetails: 'auto',
        },
    },
    theme: {
        // Bootstrap Vuetify with persisted preference to avoid reload mismatch.
        defaultTheme: getStoredAppearance(),
        themes: {
            light: {
                dark: false,
                colors: {
                    // Neutral monochrome foundation
                    primary: '#111111',
                    secondary: '#424242',

                    // Base surfaces
                    background: '#f5f5f5',
                    surface: '#ffffff',

                    // Semantic colors tuned to monochrome primary
                    success: '#1b5e20',
                    warning: '#b26a00',
                    error: '#b3261e',
                    info: '#1565c0',
                },
            },
            dark: {
                dark: true,
                colors: {
                    // Inverted monochrome adaptation
                    primary: '#f5f5f5',
                    secondary: '#b0b0b0',

                    // Dark surfaces
                    background: '#0f0f10',
                    surface: '#18181b',

                    // Semantic colors adjusted for dark readability
                    success: '#81c784',
                    warning: '#ffb74d',
                    error: '#f2b8b5',
                    info: '#64b5f6',
                },
            },
        },
    },
});
