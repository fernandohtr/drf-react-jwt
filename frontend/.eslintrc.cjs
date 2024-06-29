module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react-refresh",
    "import",
    "jsx-a11y",
    "prettier",
  ],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
  },
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "tsx": true
    }
  },
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {}
    },
  }
};
