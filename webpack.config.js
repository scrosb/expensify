
const path = require('path');

console.log();

module.exports = {
  entry: './src/app.js',
  output: {
    path:path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules:[{
      loader: 'babel-loader',
      //checks if the file loaded ends in js
      test: /\.js$/,
      //exclude node_modules folder
      exclude: /node_modules/

    }, {
      //anyfile that ends with .scss and css, the question mark makes it optional
      test: /\.s?css$/,
      //use provides us an array of loaders
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool:'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    // historyAPIfallback-WE will be handling routing for our client side code
    historyApiFallback:true
  }
};

//loader - run through babel

