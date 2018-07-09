const {resolve} = require('path');
require('webpack')
require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
  context: __dirname + "/src",	
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'fluidtype.js',
    library: 'fluidtype'
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Testing FluidType Library',
      filename: 'index.html',
      template: 'assets/test.html'
    })
  ]
}