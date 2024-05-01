module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { 
      targets: { node: 'current' }, // spécifie les versions de Node.js à prendre en charge
    }],
    '@babel/preset-react', // permet de transformer le JSX
    'module:metro-react-native-babel-preset', 
    '@babel/preset-typescript'
  ];

  const plugins = [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ["module-resolver", {
      "alias": {
        "expo-linear-gradient": "./node_modules/expo-linear-gradient/build/LinearGradient"
      }
    }],
    ['module:react-native-dotenv'] 
    // Ajoutez ici les plugins supplémentaires nécessaires
  ];

  return {
    presets,
    plugins,
  };
};
