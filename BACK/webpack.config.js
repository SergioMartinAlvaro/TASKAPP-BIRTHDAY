const path = require('path');

module.exports = {
  entry: './index.ts',  // Ajusta la ruta según la estructura de tu proyecto
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),  // Carpeta de salida para el bundle
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
        "url": require.resolve("url/"),
        "path": require.resolve("path/"),
        "path": require.resolve("stream/"),
        "querystring": require.resolve("querystring-es3"),
        "http": require.resolve("stream-http"),
        "zlib": require.resolve("browserify-zlib"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/")
      }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};