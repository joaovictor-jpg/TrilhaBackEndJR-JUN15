// eslint.config.mjs
import globals from 'globals';

// Exporta a configuração do ESLint como um módulo ESM
export default [
  {
    languageOptions: {
      ecmaVersion: 2021,        // Suporte para ES2021
      sourceType: 'script',     // Define como "script" para suportar CommonJS (require/module.exports)
      globals: {
        ...globals.node         // Habilita variáveis globais do Node.js
      }
    },
    rules: {
      // Estilo de código
      'indent': ['error', 2],                      // Indentação de 2 espaços
      'quotes': ['error', 'single'],               // Usa aspas simples
      'semi': ['error', 'always'],                 // Exige ponto e vírgula no final
      'comma-dangle': ['error', 'never'],          // Proíbe a vírgula final em objetos/arrays
      'no-trailing-spaces': 'error',               // Proíbe espaços em branco no final das linhas
      'eol-last': ['error', 'always'],             // Exige uma linha em branco no final dos arquivos

      // Boas práticas
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],  // Ignora argumentos que começam com '_'
      'eqeqeq': ['error', 'always'],              // Exige uso de === ao invés de ==
      'no-console': 'off',                        // Permite console.log (para desenvolvimento de APIs)
      'prefer-const': 'error',                    // Prefere const para variáveis não reassinaladas
      'no-var': 'error',                          // Proíbe o uso de var, recomendando let/const
      'consistent-return': 'error',               // Garante retornos consistentes em funções
      'no-param-reassign': ['error', { props: false }],  // Permite modificar parâmetros, exceto suas propriedades
      
      // Regras de formatação
      'arrow-parens': ['error', 'as-needed'],     // Permite omitir parênteses em arrow functions com um argumento
      'object-curly-spacing': ['error', 'always'], // Exige espaçamento dentro de chaves em objetos ({ key: value })
      'array-bracket-spacing': ['error', 'never'], // Não permite espaçamento dentro de colchetes em arrays ([1, 2, 3])
      'linebreak-style': ['error', 'windows'],       // Força quebras de linha estilo windows
      'brace-style': ['error', '1tbs'],           // Estilo de chaves (One True Brace Style)
    },
    ignores: ['node_modules', 'dist'],            // Ignora a pasta node_modules e dist
  },
];
