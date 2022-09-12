const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/useEventbrite.js',
  output: {
    libraryTarget: 'umd',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: require('./package.json').name,
    umdNamedDefine: true,
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 'targets': { node: "6.10" } }],
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
};
