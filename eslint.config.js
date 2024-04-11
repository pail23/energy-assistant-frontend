import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['energy_assistant_frontend/**/*', 'energy_assistant_frontend.egg-info/*'],
  },

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: '.vue',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      //TODO: Remove the following lines
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);
/*
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:prettier/recommended',
          'plugin:vue/vue3-recommended',
          '@vue/eslint-config-typescript',
          'prettier',
          'plugin:prettier/recommended',
        ],
        plugins: ['prettier', '@typescript-eslint'],
        rules: {
          quotes: ['error', 'single'],
          'prettier/prettier': [
            'error',
            {
              singleQuote: true,
              endOfLine: 'auto',
            },
            {
              usePrettierrc: true,
            },
          ],
          'vue/multi-word-component-names': 'off',
          'vue/html-self-closing': 'off',
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars-experimental': 'off',
          '@typescript-eslint/ban-ts-comment': 'off',
        },
        */
