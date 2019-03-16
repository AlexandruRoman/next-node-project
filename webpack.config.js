var fs = require('fs');
var path = require('path')
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/server.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'server.js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    alias: {
      src: path.resolve(__dirname, 'src/')
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  target: 'node',
  externals: nodeModules,
};