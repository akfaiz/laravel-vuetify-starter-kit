import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';

const initialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const appearance = window.localStorage.getItem('appearance');

    if (appearance === 'light' || appearance === 'dark') {
        return appearance;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
};

export default createVuetify({
    defaults: {
        VBtn: {
            rounded: 'sm',
        },
        VCard: {
            rounded: 'lg',
        },
        VTextField: {
            density: 'comfortable',
            variant: 'outlined',
        },
        VTextarea: {
            density: 'comfortable',
            variant: 'outlined',
        },
    },
    theme: {
        defaultTheme: initialTheme(),
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
