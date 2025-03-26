import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/ts/app.ts',
            ],
        }),
        tailwindcss(),
    ],
    server: {
        hmr: false,
        watch: {
            usePolling: true,
            interval: 10000,
        },
    },
});
