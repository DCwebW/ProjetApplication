module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-react', // Permet de transformer le JSX
    '@babel/preset-typescript', // Permet de transformer le TypeScript
    'module:metro-react-native-babel-preset' // Utilisé par défaut pour les projets React Native
  ];

  const plugins = [
    'react-native-reanimated/plugin', // Plugin nécessaire pour react-native-reanimated
    ["module-resolver", {
      "alias": {
        "expo-linear-gradient": "./node_modules/expo-linear-gradient/build/LinearGradient"
      }
    }],
    // Ajoutez ici les plugins supplémentaires nécessaires
  ];

  return {
    presets,
    plugins,
    overrides: [
      {
        test: (fileName) => !fileName.includes('node_modules/react-native-maps'),
        plugins: [
          ["@babel/plugin-transform-private-methods", { "loose": true }],
          ["@babel/plugin-transform-class-properties", { "loose": true }]
        ],
      },
    ],
  };
};

