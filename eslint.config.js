import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";
import ts from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import globals from "globals";

import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { 
      globals: globals.browser,
      parser: tsparser, 
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react, // Adicionando explicitamente o plugin do React
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...react.configs.recommended.rules, // Trocando `flat.recommended` por `recommended`
      ...ts.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // 🚀 Desativa a exigência de importação do React
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

];
