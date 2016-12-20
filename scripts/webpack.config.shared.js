import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const postcssProcessors = [
    require('autoprefixer')({
        browsers: ['last 2 versions']
    }),
    require('postcss-svg')({
        paths: ['public/assets/i/icons/'],
        svgo: true
    })
];

export default {
    entry: [
        path.join(__dirname, '../src/js/index.js'),
        path.join(__dirname, '../src/sass/index.sass')
    ],
    output: {
        path: path.join(__dirname, '../build'),
        public: '/assets/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!import-glob')
            }
        ]
    },
    stats: {
        colors: true
    },
    resolve: {
        root: path.join(__dirname, '../src/js')
    },
    postcss: postcssProcessors
};