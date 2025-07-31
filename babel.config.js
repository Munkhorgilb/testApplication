module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          '#': './src',
          '#images': './assets/images',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
