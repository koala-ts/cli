import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                'src/index.ts',
                '**/tests/**',
                '**/types.ts',
            ],
        },
    },
});
