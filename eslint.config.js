import pluginJs from "@eslint/js"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react, // Adicionando explicitamente o plugin do React
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...react.configs.recommended.rules, // Trocando `flat.recommended` por `recommended`
      ...tseslint.configs.recommended.rules,

      // 🚀 Configuração para Hooks
      "react-hooks/rules-of-hooks": "error", // Garante que hooks sejam usados corretamente
      "react-hooks/exhaustive-deps": "warn", // Verifica as dependências do useEffect

      // 🚀 Regras essenciais para um código mais limpo
      "react/react-in-jsx-scope": "off", // Não precisa importar React no escopo
      "react/self-closing-comp": "error", // Exige fechamento automático em tags vazias
      "react/no-unknown-property": "error", // Evita uso incorreto de propriedades no JSX
      "react/prop-types": "off", // Desativa a exigência de PropTypes no React (já usamos TypeScript)

      // 🚀 Melhorias no TypeScript
      "@typescript-eslint/no-unused-vars": "warn", // Avisa sobre variáveis não utilizadas
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/explicit-function-return-type": "off", // Não exige retorno explícito

      // 🚀 Melhoria na Acessibilidade (JSX A11y)
      "jsx-a11y/alt-text": ["warn", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",

      // 🚀 Configuração de estilo (remove ponto e vírgula)
      semi: ["error", "never"], // Remove ponto e vírgula
      // quotes: ["error", "single"], // Usa aspas simples
      "arrow-parens": ["error", "always"], // Sempre usa parênteses em arrow functions
    },
  },
]
