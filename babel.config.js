module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    // Keep this as the last plugin
    'react-native-worklets/plugin',
  ],
};



// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//       'react-native-reanimated/plugin',
//   ],
// };