var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app.js",

    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                 test: /\.js?$/, 
                 loaders: ['react-hot', 'babel'], 
                 exclude: /node_modules/ 
             },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader', 
                query: { presets: ['es2015', 'react'] } 
            },
            { 
                test: /\.scss$/, 
                loader: 'style!css?modules&localIdentName=[path][name]__[local]!postcss!sass?sourceMap=true', 
                exclude: [/node_modules/,/styles/] 
            },
            { 
                test: /\.scss$/, 
                loader: 'style!css!sass?sourceMap=true', 
                include: /styles/ 
            }
        ]
    },
    postcss: [autoprefixer({ browsers: ['> 5%', 'last 2 versions'] })],

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};
