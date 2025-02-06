import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended'
  ),
  {
    ignores: ['.next/*', 'node_modules/'],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-wrap-multilines': ['off', {declaration: 'parens-new-line'}],
      'react/jsx-tag-spacing': [
        'off',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'allow',
          afterOpening: 'never',
          beforeClosing: 'allow',
        },
      ],
      'react/jsx-sort-props': [
        1,
        {multiline: 'last', noSortAlphabetically: true},
      ],
    },
  },
];

export default eslintConfig;
