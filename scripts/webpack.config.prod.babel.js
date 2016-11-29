import webpack from 'webpack';
import path from 'path';

import config from './webpack.config.shared';

export default {
    ...config,
    output: {
        ...config.output,
        public: '/assets/'
    },
    plugins: [
        ...config.plugins,
        new webpack.optimize.DedupePlugin(),
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
                    path.resolve(__dirname, '..', 'src'),
                ]
            }
        ]
    }
};