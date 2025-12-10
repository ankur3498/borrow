const path = require("path");
const { getDefaultConfig } = require("@react-native/metro-config");

module.exports = (() => {
  const projectRoot = __dirname;
  const config = getDefaultConfig(projectRoot);

  // Windows path normalization
  config.projectRoot = path.resolve(projectRoot);
  config.watchFolders = [path.resolve(projectRoot)];

  // SVG transformer
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
  };

  return config;
})();
