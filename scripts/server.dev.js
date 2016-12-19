import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.dev.babel';

const port = 8080;
const app = express();
const compiler = webpack(config);
const webpackOptions = {
    noInfo: true,
    publicPath: config.output.publicPath
};

app.use(express.static('public/'));
app.use(webpackDevMiddleware(compiler, webpackOptions));
app.use(webpackHotMiddleware(compiler));

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../src/index.dev.html'));
});

app.listen(port, () => {
    console.log(`Server is running and listening on http://localhost:${port}`);
});