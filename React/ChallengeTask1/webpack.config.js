const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  entry: './src/index.js',

  
  plugins: [
    new HTMLWebpackPlugin({
        template: './src/index.html'
    })
  ],

  
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
              }
          }
        },
        {
          test: /\.css$/, use: [ 'style-loader', 'css-loader' ]
        }
    ]
  }
} 