const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias:{
           // Alias pour la version de React requise par react-native
           'react-native$': 'react-native-web',
           // Alias pour la version de React requise par les autres packages
           react: path.resolve(__dirname, './node_modules/react-18.3.1'),   
    }
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8081,
  },
};