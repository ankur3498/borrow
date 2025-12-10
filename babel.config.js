// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // other plugins...
    'react-native-reanimated/plugin', // must be last
    // if your setup/docs request it: 'react-native-worklets/plugin'
  ],
};
