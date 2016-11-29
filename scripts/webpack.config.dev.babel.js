import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './webpack.config.shared';

export default {
    ...config,
    devtool: 'source-map',
    entry: [
        ...config.entry,
        'webpack-hot-middleware/client',
    ],
    output: {
        ...config.output,
        public: '/assets/'
    },
    plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin,
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            ...config.module.loaders,
            {
                loaders: ['react-hot', 'babel'],
                test: /\.js$/,
                plugins: ['transform-runtime'],
                include: [
                    path.resolve(__dirname, '..', 'src'),
                ]
            }
        ]
    }
};