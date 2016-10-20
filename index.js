'use strict';

const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
const webpackOptions = {
    noInfo: true,
    publicPath: config.output.publicPath
};

app.use(express.static('public/'));
app.use(webpackDevMiddleware(compiler, webpackOptions));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => {
    console.log('Server start and listening at http://localhost:%s', 8080);
});