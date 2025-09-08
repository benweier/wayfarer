import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import jsEslint from '@eslint/js'
import css from '@eslint/css'
import tsEslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginStylistic from '@stylistic/eslint-plugin'
import pluginImport from 'eslint-plugin-import'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import configPrettier from 'eslint-config-prettier'
import { tailwind4 } from 'tailwind-csstree'

export default tsEslint.config(
  jsEslint.configs.recommended,
  tsEslint.configs.recommendedTypeCheckedOnly,
  tsEslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: {
      css: css,
    },
    languageOptions: {
      customSyntax: tailwind4,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2024,
        sourceType: 'module',
      },
      parser: tsEslint.parser,
      globals: {
        ...globals.browser,
      },
    },
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.react,
      reactHooks.configs['recommended-latest'],
      pluginImport.flatConfigs.typescript,
      // pluginStylistic.configs['recommended-flat'],
    ],
    settings: {
      react: {
        defaultVersion: '19',
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: '@/',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/prefer-default-export': 'off',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx/jsx-one-expression-per-line': 'off',
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    },
    plugins: {
      'jsx-a11y': pluginJsxA11y,
      '@stylistic': pluginStylistic,
    },
  },
  {
    files: ['**/*.test.{js,mjs,cjs,ts,jsx,tsx}'],
    ...pluginTestingLibrary.configs['flat/react'],
  },
  configPrettier,
)
