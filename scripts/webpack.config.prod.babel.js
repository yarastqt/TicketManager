import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from './webpack.config.shared';

export default {
    ...config,
    output: {
        ...config.output,
        filename: '/assets/js/bundle.[hash].js'
    },
    plugins: [
        ...config.plugins,
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('/assets/css/bundle.[hash].css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.prod.html'),
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                sortAttributes: true,
                useShortDoctype: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyJS: true
            }
        })
    ],
    module: {
        loaders: [
            ...config.module.loaders,
            {
                loaders: ['babel'],
                test: /\.js$/,
                plugins: [
                    'transform-runtime',
                    'transform-react-remove-prop-types',
                    'transform-react-constant-elements',
                    'transform-react-inline-elements',
                    { mode: 'wrap' }
                ],
                include: [
                    path.resolve(__dirname, '../src')
                ]
            }
        ]
    }
};