// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // archivo de entrada principal de tu app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.js$/, // aplica Babel a todos los archivos .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
  mode: 'development', // usa 'production' para optimizar el bundle
};
