module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: [
        "react", "@typescript-eslint", "prettier"
    ],
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "airbnb",
        "airbnb-typescript",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint"
    ],
    rules: {
        "prettier/prettier": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-param-reassign": "off",
        "react/jsx-props-no-spreading": "off",
        "consistent-return": ["warn", { "treatUndefinedAsUnspecified": true }],
        "react/require-default-props": ["off", { "forbidDefaultForRequired": false, "ignoreFunctionalComponents": true }]
    }
}
