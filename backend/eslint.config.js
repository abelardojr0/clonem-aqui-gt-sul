// =============================================================================
// ESLint do BACKEND
// =============================================================================
// Este arquivo diz ao ESLint COMO ler o codigo do back.
//
// Rodar local:  cd backend && npm run lint
// No CI:        job "lint" do .github/workflows/ci.js.yml
//
// O que o ESLint faz:
//   le o codigo SEM executar a API
//   aponta problemas estaticos (variavel sem declarar, == , etc.)
//
// O que o ESLint NAO faz:
//   nao sobe o Express
//   nao usa Postgres
//   nao substitui teste unitario / integracao
// =============================================================================

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  // Pacote oficial de regras "recommended" do ESLint.
  // Inclui coisas basicas: variavel indefinida, codigo morto, etc.
  js.configs.recommended,

  {
    languageOptions: {
      // Aceita sintaxe moderna do JavaScript (async/await, etc.)
      ecmaVersion: 2022,

      // O back usa require/module.exports (CommonJS), nao import/export.
      sourceType: 'commonjs',

      globals: {
        // process, console, __dirname, etc. existem no Node
        ...globals.node,
        // describe, it, expect, beforeAll, etc. existem no Jest
        ...globals.jest,
      },
    },
  },
];
