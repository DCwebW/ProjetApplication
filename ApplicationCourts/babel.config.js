module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      'module:metro-react-native-babel-preset', // Utilisé par défaut pour React Native
      '@babel/preset-react', // Transforme le JSX
      '@babel/preset-typescript', // Transforme le TypeScript
      
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'expo-linear-gradient': './node_modules/expo-linear-gradient/build/LinearGradient',
          },
        },
      ],
      'react-native-reanimated/plugin', // Important : doit être le dernier plugin
    ],
    overrides: [
      {
        plugins: [
          ['@babel/plugin-transform-private-methods', { loose: true }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-private-property-in-object', { loose: true }],
        ],
      },
    ],
  };
};
