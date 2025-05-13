// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      "prettier/prettier": 1,
      "react-hooks/exhaustive-deps": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "react-hooks/rules-of-hooks": 1,
      "no-console": "error",
      "import/no-unresolved": [
        2,
        {
          caseSensitive: false,
          ignores: [
            "^hooks",
            "^app",
            "^components",
            "^assets",
            "^theme",
            "^constants",
          ],
        },
      ],
    },
  },
]);
