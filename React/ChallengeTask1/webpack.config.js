const HTMLWebpackPlugin = require('html-webpack-plugin');

if (module.hot)
  module.hot.accept()

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
        }
    ]
  }
} 