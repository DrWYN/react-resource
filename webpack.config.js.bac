var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      "./app.js"
    ],
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query:{presets:['es2015','react']}},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    resolve:{
        extensions:['','.js','.json','.scss']
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('./main.css', {
            allChunks: true
        })
    ]
};