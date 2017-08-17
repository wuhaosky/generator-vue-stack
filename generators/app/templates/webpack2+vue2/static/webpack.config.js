"use strict";

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var STATIC_SRC = require("./ciconfig")["static-src"];
var DIST_PATH = require('./ciconfig').dist;
var HTML_PATH = require('./ciconfig').output;
var env = require("./ciconfig").env;
var PUBLIC_PATH = require('./ciconfig').urlPrefix + STATIC_SRC + '/';

var plugins = [
    new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname),
        verbose: true,
        dry: false
    }),
    new CopyWebpackPlugin([
        {
            from: './html',
            to: '../'
        }
    ]),
    new ExtractTextPlugin({
        filename: "[name].css",
        disable: false,
        allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                Autoprefixer({
                    browsers: ['> 1%']
                })
            ]
        }
    })
];

if (env == "product") {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
    // 参考 https://doc.webpack-china.org/guides/migrating/#uglifyjsplugin-sourcemap
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        // sourceMap: true
    }));
    // 参考 https://doc.webpack-china.org/guides/migrating/#uglifyjsplugin-loaders
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true
    }));
}

var cssOption = {
    use: [
        'css-loader',
        'postcss-loader'
    ],
    fallback: 'vue-style-loader'
};
var lessOption = {
    use: [
        'css-loader',
        'postcss-loader',
        'less-loader'
    ],
    fallback: 'vue-style-loader'
};
var vueloadRule = {};
if (env == "dev") {
    vueloadRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
            loaders: {
                'css': "vue-style-loader!css-loader!postcss-loader",
                'less': "vue-style-loader!css-loader!postcss-loader!less-loader"
            }
        }
    };
} else {
    vueloadRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
            loaders: {
                'css': ExtractTextPlugin.extract(cssOption),
                'less': ExtractTextPlugin.extract(lessOption)
            }
        }
    };
}
module.exports = {
    entry: {
        'index': ['./src/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, DIST_PATH, STATIC_SRC),
        publicPath: PUBLIC_PATH,
        chunkFilename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    //devtool: 'source-map',
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.es6', '.json', '.jsx', '.vue']
    },
    module: {
        rules: [
            vueloadRule,
            {
                test: /\.(es6|js)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: env == "dev"
                    }
                }],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(cssOption)
            }, {
                test: /\.woff|ttf|woff2|eot$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(lessOption)
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 25000
                    }
                }]
            }
        ]
    },
    target: "web",
    plugins: plugins,
    devServer: {
        contentBase: HTML_PATH,
        historyApiFallback: false,
        hot: true,
        port: 8080,
        disableHostCheck: true,  // 失能域名检查
        publicPath: PUBLIC_PATH,
        noInfo: false
    }
};
