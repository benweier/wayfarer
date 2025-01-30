/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended', 'stylelint-config-recess-order'],
  rules: {
    'import-notation': 'string',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'theme', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'no-descending-specificity': null,
  },
}
