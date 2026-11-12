// =============================================================================
// ESLint do FRONTEND
// =============================================================================
// Este arquivo diz ao ESLint COMO ler o codigo do front (React + Vite).
//
// Rodar local:  cd frontend && npm run lint
// No CI:        job "lint" do .github/workflows/ci.js.yml
//
// O que o ESLint faz aqui:
//   le os arquivos de src/
//   aplica regras de JavaScript + React + Hooks
//
// O que fica de fora:
//   dist/     -> pasta gerada pelo build (nao se lintar artefato)
//   cypress/  -> testes e2e (outro tipo de checagem)
// =============================================================================

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    // Pastas que o ESLint deve ignorar
    ignores: ['dist/**', 'cypress/**'],
  },

  // Regras basicas de JavaScript (variavel indefinida, == , etc.)
  js.configs.recommended,

  {
    // Aplica este bloco so em arquivos JS/JSX do front
    files: ['**/*.{js,jsx}'],

    // Plugins = conjuntos extras de regras
    plugins: {
      react, // regras especificas de React/JSX
      'react-hooks': reactHooks, // regras de useState/useEffect etc.
    },

    languageOptions: {
      ecmaVersion: 2022,

      // O front usa import/export (ES Modules). O Vite exige isso.
      sourceType: 'module',

      // window, document, etc. existem no browser
      globals: globals.browser,

      parserOptions: {
        ecmaFeatures: {
          // Permite ler sintaxe JSX (<App />, <li>, etc.)
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        // Descobre sozinho a versao do React no package.json
        version: 'detect',
      },
    },

    rules: {
      // Liga o pacote recommended do plugin React
      ...react.configs.recommended.rules,

      // Liga as regras de Hooks (ex.: Hook so no topo do componente)
      ...reactHooks.configs.recommended.rules,

      // React 17+ com Vite nao precisa de: import React from 'react'
      'react/react-in-jsx-scope': 'off',

      // Este treino nao usa PropTypes; desliga para nao gerar ruido
      'react/prop-types': 'off',
    },
  },
];
