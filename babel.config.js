module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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