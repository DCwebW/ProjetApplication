module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-react', // Permet de transformer le JSX
    '@babel/preset-typescript', // Permet de transformer le TypeScript
    'module:@react-native/babel-preset' // Utilisé par défaut pour les projets React Native
  ];

  const plugins = [
     
    ["module-resolver", {
      "alias": {
        "expo-linear-gradient": "./node_modules/expo-linear-gradient/build/LinearGradient"
      }
    }],
    'react-native-reanimated/plugin'// Ajoutez ici les plugins supplémentaires nécessaires
  ];

  return {
    presets,
    plugins,
    overrides: [
      {
        test: (fileName) => !fileName.includes('node_modules/react-native-maps'),
        // plugins: [
        //   // ["@babel/plugin-transform-private-methods", { "loose": true }],
        //   // ["@babel/plugin-transform-class-properties", { "loose": true }],
        //   // ['@babel/plugin-transform-private-property-in-object', { "loose": true }]
        // ],
      },
    ],
  };
};

