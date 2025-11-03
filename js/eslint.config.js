import xoTypeScript from 'eslint-config-xo-typescript';
import xoReact from 'eslint-config-xo-react';
import designSystemPlugin from '@atlaskit/eslint-plugin-design-system';
import uiStylingStandardPlugin from '@atlaskit/eslint-plugin-ui-styling-standard';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSecurity from 'eslint-plugin-security';
import pluginQuery from '@tanstack/eslint-plugin-query'
import compiled from '@compiled/eslint-plugin';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    {
        ignores: ["src/jira.d.ts", ".config/", "dist/", "tsconfig.json", "**/*.config.js", "dist/"] // acts as global ignores, due to the absence of other properties
    },
    ...xoTypeScript,
    ...xoReact,
    ...pluginQuery.configs['flat/recommended'],
    compiled.configs['flat/recommended'],
    pluginSecurity.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: [
                    './tsconfig.json',
                ],
                tsconfigRootDir: import.meta.dirname
            }
        },
        plugins: {
            '@atlaskit/design-system': designSystemPlugin,
            '@atlaskit/ui-styling-standard': uiStylingStandardPlugin,
        },
        rules: {
            ...designSystemPlugin.configs.recommended.rules,
            ...uiStylingStandardPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off"
        },
    },
]);
