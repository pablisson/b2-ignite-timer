import pluginJs from "@eslint/js"
// import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
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
      jsxA11y,
      tseslint,
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
      "react/react-in-jsx-scope": "off", // 🚀 Desativa a exigência de importação do React
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      semi: ["error", "never"],

      //configurações rocketseat
      "react/self-closing-comp": "error",

      "react/prop-types": "off",
      "jsxA11y/alt-text": [
        "warn",
        {
          elements: ["img"],
          img: ["Image"],
        },
      ],
      "jsxA11y/aria-props": "warn",
      "jsxA11y/aria-proptypes": "warn",
      "jsxA11y/aria-unsupported-elements": "warn",
      "jsxA11y/role-has-required-aria-props": "warn",
      "jsxA11y/role-supports-aria-props": "warn",
      "react/no-unknown-property": "error",
    },
  },
]
