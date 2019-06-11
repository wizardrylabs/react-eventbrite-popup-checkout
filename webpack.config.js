const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    libraryTarget: 'umd',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { 'targets': { node: "6.10" } }], '@babel/preset-react'],
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  }
};
