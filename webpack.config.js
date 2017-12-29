var path = require('path');

var SRC_DIR = path.join(__dirname, "src");
var NODE_MODULES = path.join(__dirname, 'node_modules');

module.exports = {
 module: {
  loaders: [
   {
    test: /\.js?/,
    include: SRC_DIR,
    exclude: NODE_MODULES,
    loader: 'babel',
    query: {
     presets: ['es2015']
    }
   }
  ]
 },
 watch: true,
 devtool: "inline-source-map",
 entry: SRC_DIR + '/app.js',
 output: {
  filename: 'app.bundle.js'
 }
};