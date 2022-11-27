module.exports = {
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': 'typescript',
  },
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
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
    'import/namespace': ['error', { allowComputed: true }],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/unbound-method': 'off',
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'jest.config.js', 'tailwind.config.js'],
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['src/**/*'],
      plugins: ['react'],
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      env: {
        browser: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      globals: { React: 'writable' },
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['cypress/**/*'],
      plugins: ['cypress', 'testing-library'],
      extends: ['plugin:cypress/recommended', 'plugin:testing-library/dom'],
      env: {
        'cypress/globals': true,
      },
      parserOptions: {
        project: ['tsconfig.json', 'cypress/tsconfig.json'],
      },
    },
    {
      files: ['src/**/*.stories.tsx'],
      extends: ['plugin:storybook/recommended'],
    },
    {
      files: ['src/**/*.spec.tsx', 'src/**/*.test.tsx', 'test/**/*'],
      plugins: ['jest', 'testing-library', 'jest-dom'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/dom',
        'plugin:testing-library/react',
      ],
      env: {
        'jest/globals': true,
      },
      settings: {
        jest: {
          version: 'detect',
        },
      },
      rules: {
        'testing-library/prefer-screen-queries': 'off',
      },
    },
  ],
}
