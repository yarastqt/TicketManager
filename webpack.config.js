const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const postcssProcessors = [
    require('autoprefixer')({
        browsers: ['last 2 versions']
    }),
    require('postcss-svg')({
        paths: ['public/assets/i/icons/'],
        svgo: true
    })
];

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/js/index.js',
        './client/sass/index.sass'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin,
        new webpack.HotModuleReplacementPlugin,
        new ExtractTextPlugin('css/bundle.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [
            {
                loaders: ['react-hot', 'babel'],
                test: /\.js$/,
                plugins: ['transform-runtime'],
                include: [
                    path.resolve(__dirname, 'client'),
                ]
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!import-glob'),
            }
        ]
    },
    postcss: postcssProcessors
};