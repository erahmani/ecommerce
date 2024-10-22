// eslint.config.cjs
module.exports = [
  {
    files: ["*.js", "*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module"
    },
    env: {
      es2021: true,
      node: true
    },
    rules: {
      // Extends equivalent
      // ...eslintPluginNode.configs.recommended.rules,
      // ...eslintPluginPrettier.configs.recommended.rules,

      // Best practices
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-console": "off",
      "consistent-return": "error",
      "no-var": "error",
      "prefer-const": "error",
      'linebreak-style': 'off',

      // Clean code principles
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "arrow-body-style": ["error", "as-needed"],
      "no-magic-numbers": [
        "warn",
        { ignoreArrayIndexes: true, enforceConst: true }
      ],
      "no-param-reassign": ["error", { props: false }],
      "no-shadow": ["error"],
      camelcase: ["error", { properties: "never" }],

      // Stylistic preferences
      indent: ["error", 2],
      quotes: ["error", "single", { avoidEscape: true }],
      semi: ["error", "always"],
      "space-before-blocks": "error",
      "no-trailing-spaces": "error",
      "keyword-spacing": ["error", { before: true, after: true }],
      "comma-dangle": ["error", "never"],

      // Prettier integration
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          printWidth: 80,
          trailingComma: "none",
          tabWidth: 2
        }
      ]
    }
  }
];
