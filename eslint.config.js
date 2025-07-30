import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs as wdioConfig } from 'eslint-plugin-wdio';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores([
    '.node_modules/',
    'wdio.conf.js',
    '.allure/',
    'allure-report',
    'allure-results',
    'eslint.config.js',
  ]),
  wdioConfig['flat/recommended'],
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: { 'chai-friendly': pluginChaiFriendly, js },
    files: ['**/*.{js,mjs,cjs}', '**/*.steps.js'],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,     
        ...globals.mocha, 
        Given: 'readonly',
        When: 'readonly',
        Then: 'readonly',  
        expect: true,       
        driver: true,      
        $: true,           
        $$: true 
      } 
    },
    rules: {
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'prefer-const': 'warn',
      'mocha/no-mocha-arrows': 'off',
      'no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
    },
  },
]);
