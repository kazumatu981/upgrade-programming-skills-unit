import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    {
        rules: {
            // メトリクスに関するルール
            complexity: ['error', { max: 10 }],
            'max-depth': ['error', { max: 4 }],
            'max-lines': [
                'error',
                { max: 300, skipBlankLines: true, skipComments: true },
            ],
            'max-lines-per-function': [
                'error',
                { max: 50, skipBlankLines: true, skipComments: true },
            ],
            'max-nested-callbacks': ['error', { max: 3 }],
            'max-params': ['error', { max: 4 }],
            'max-statements': ['error', { max: 10 }],
        },
    },
    {
        files: ['**/__tests__/**/*.{js,mjs,cjs}'],
        rules: {
            'no-console': 'off',
        },
    },
]);
