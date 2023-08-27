// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],

  rules: {
    'no-nested-ternary': 'off',
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'prefer-destructuring': 'off',
    'arrow-body-style': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'quote-props': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    camelcase: 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/display-name': 'off',
    'no-param-reassign': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'react/button-has-type': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'jsx-a11y/alt-text': 'off',
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreTemplateLiterals: true }],
    semi: ['error', 'never'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxBOF: 0,
      },
    ],
    'simple-import-sort/imports': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    // see here https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    'no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-underscore-dangle': ['error', { allowAfterThis: true, allow: ['_id'] }],
    '@typescript-eslint/type-annotation-spacing': [
      'warn',
      {
        after: true,
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
        },
      },
    ],
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      rules: {
        'dot-notation': 0,
        'no-underscore-dangle': 0,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            'groups': [
              // Side effect imports (without `from`)
              ['^\\u0000'],
              // Anything not matched in another groups
              ['^'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
