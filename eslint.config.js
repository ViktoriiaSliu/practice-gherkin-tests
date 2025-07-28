import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import mochaPlugin from 'eslint-plugin-mocha';
import { configs as wdioConfig } from 'eslint-plugin-wdio';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';

export default defineConfig([
  globalIgnores([
    '.node_modules/',
    'wdio.conf.js',
    '.allure/',
    'allure-report',
    'allure-results',
    'eslint.config.js',
  ]),
  mochaPlugin.configs.recommended,
  wdioConfig['flat/recommended'],
  js.configs.recommended,
  {
    plugins: { 'chai-friendly': pluginChaiFriendly, js },
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,     
        ...globals.mocha,   
        expect: true,       
        driver: true,      
        $: true,           
        $$: true 
      } 
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'prefer-const': 'warn',
      'mocha/no-mocha-arrows': 'off',
      'no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
    },
  },
]);
