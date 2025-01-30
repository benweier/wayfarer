import globals from 'globals'
import jseslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginStylistic from '@stylistic/eslint-plugin'
import pluginImport from 'eslint-plugin-import'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import configPrettier from 'eslint-config-prettier'

export default tseslint.config(
  jseslint.configs.recommended,
  tseslint.configs.recommendedTypeCheckedOnly,
  tseslint.configs.stylisticTypeChecked,
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
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
      },
    },
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.react,
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
      '@typescript-eslint/no-misused-promises': 'off',
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
