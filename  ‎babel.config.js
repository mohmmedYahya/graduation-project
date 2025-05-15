module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            components: "./components",
            hooks: "./hooks",
            theme: "./theme",
            assets: "./assets",
            constants: "./constants",
            utils: "./utils",
            providers: "./providers",
            atoms: "./atoms",
          },
        },
      ],
    ],
  };
};
