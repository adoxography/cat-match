export default {
  plugins: [
    'stylelint-selector-bem-pattern',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      componentName: '[A-Z]+',
      componentSelectors: {
        initial: '^\\.{componentName}(?:-[a-z]+)?$',
        combined: '^\\.combined-{componentName}-[a-z]+$'
      },
      utilitySelectors: '^\\.util-[a-z]+$'
    },
    'selector-class-pattern': null,
  },
};
