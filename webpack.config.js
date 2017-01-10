var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var argv = require('yargs').argv;
var myPath = '';
var env = '';

if (argv.e === 'prod') {
    myPath = './dist';
    env = 'production';
} else {
    myPath = './build'
    env = 'development';
}

var packPath = path.join(__dirname, myPath);

module.exports = {
    devtool: 'cheap-source-map',
    entry: "app/index.js",

    output: {
        filename: 'bundles/[name]-[hash].js',
        chunkFilename: env ===  'development' ? 'modules/[id].[name].chunk.js' : 'modules/[id].[name].chunk.[chunkhash:8].js',
        path: packPath,
        pathinfo: env === 'development'
    },
    resolve: {
        modulesDirectories: [
            'app',
            'node_modules'
        ],
        alias: {
            app: path.join(__dirname, './app'),
            common: path.join(__dirname, './app/common'),
            modules: path.join(__dirname, './app/modules')
        },
        extensions: ['', '.js', '.jsx', '.scss', '.sass', '.css', '.json']
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
                query: { 
                    presets: ['es2015', 'react'],
                    plugins: ["add-module-exports"],
                } 
            },
            { 
                test: /\.scss$/,  
                loader: ExtractTextPlugin.extract('style','css?modules&localIdentName=[path][name]__[local]!postcss!sass?sourceMap=true'),
                exclude: [/node_modules/,/styles/]
            },
            { 
                test: /\.scss$/, 
                loader: 'style!css!sass?sourceMap=true', 
                include: /styles/ 
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'images/[name]-[hash:8].[ext]'
                }
            }, {
                test: /\.(woff|svg|eot|ttf)$/,
                exclude: /node_modules/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name]-[hash:8].[ext]'
                }
            }
        ]
    },
    postcss: [
        //样式添加兼容前缀
        //http://browserl.ist/?q=Last+5+versions
        autoprefixer({add: false, browsers: []}),
        autoprefixer({
            browsers: ['> 1%', 'last 5 versions']
        })
    ],

    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            filename: 'index.html',
        }),
        new ExtractTextPlugin("style-[contenthash].css", {
          allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(packPath, {
          root: __dirname,
          verbose: true, 
          dry: false
        }),
        new webpack.ProvidePlugin({
            ReactRouter: 'react-router',
            React: 'react',
            ReactDOM: 'react-dom',

            //非业务相关类
            // Common: path.join(__dirname, './app/common/js/common.js'),
            bindActions: path.join(__dirname, './app/actions/bind.js'),
            ErrorCode: path.join(__dirname, './app/common/ErrorCode.js'),
            Global: path.join(__dirname, './app/common/Global.js'),
            Util: path.join(__dirname, './app/common/Utils.js')
        }),
    ],

    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};
