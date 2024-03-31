module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { 
      targets: { node: 'current' }, // spécifie les versions de Node.js à prendre en charge
    }],
    '@babel/preset-react', // permet de transformer le JSX
    'module:metro-react-native-babel-preset', // permet de transformer le code pour React Native
  ];

  const plugins = [
    'react-native-reanimated/plugin',
   ["module-resolver", {
      "alias": {
        "expo-linear-gradient": "./node_modules/expo-linear-gradient/build/LinearGradient"
      }}] 
    // Ajoutez ici les plugins supplémentaires nécessaires
  ];

  return {
    presets,
    plugins,
  };
};

