import xo from 'eslint-config-xo';
import xoReact from 'eslint-config-xo-react';
import designSystemPlugin from '@atlaskit/eslint-plugin-design-system';
import uiStylingStandardPlugin from '@atlaskit/eslint-plugin-ui-styling-standard';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSecurity from 'eslint-plugin-security';
import pluginQuery from '@tanstack/eslint-plugin-query';
import compiled from '@compiled/eslint-plugin';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    // Global ignores - files and directories to exclude from linting
    {
        ignores: [
            "src/jira.d.ts",
            "dist/",
            "node_modules/",
            "**/*.config.js",
            "**/*.config.cjs",
            "**/*.config.mjs",
            "coverage/",
            "build/",
            ".cache/",
            "tsconfig.json",
        ]
    },
    // XO config - strict JavaScript/TypeScript linting rules (browser globals)
    ...xo({browser: true}),
    
    // XO React config - provides React-specific linting rules
    ...xoReact(),
    
    // TanStack Query plugin - ensures best practices for React Query
    ...pluginQuery.configs['flat/recommended'],
    
    // Compiled plugin - ensures proper usage of @compiled/react
    compiled.configs['flat/recommended'],
    
    // Security plugin - catches common security issues
    pluginSecurity.configs.recommended,
    
    // Prettier integration - must be last to override formatting rules
    eslintPluginPrettierRecommended,
    
    // TypeScript and React-specific configuration
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@atlaskit/design-system': designSystemPlugin,
            '@atlaskit/ui-styling-standard': uiStylingStandardPlugin,
        },
        rules: {
            // Atlaskit Design System rules
            ...designSystemPlugin.configs.recommended.rules,
            ...uiStylingStandardPlugin.configs.recommended.rules,
            
            // React 18+ doesn't require React import for JSX
            'react/react-in-jsx-scope': 'off',

            // React components are conventionally named in PascalCase
            'unicorn/filename-case': ['error', {cases: {kebabCase: true, pascalCase: true}}],

            // Webpack resolves imports without extensions (moduleResolution: bundler)
            'n/file-extension-in-import': 'off',
        },
    },
]);
