import gulp from 'gulp';
import clean from 'gulp-clean';
import svgmin from 'gulp-svgmin';
import sequence from 'run-sequence';
import webpack from 'webpack';
import ftp from 'vinyl-ftp';
import { argv } from 'yargs';

import webpackConfig from './webpack.config.prod.babel';

gulp.task('clean', () => {
    return gulp.src('../build/', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('webpack', (callback) => {
    webpack(webpackConfig, callback);
});

gulp.task('copy-public', () => {
    return gulp.src(['../public/**', '!../public/assets/i/icons', '!../public/assets/i/icons/**', '../public/.htaccess'])
        .pipe(gulp.dest('../build/'));
});

gulp.task('svgmin', () => {
    return gulp.src('../build/assets/i/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('../build/assets/i'));
});

gulp.task('deploy', (callback) => {
    const { default: config } = require('./ftp.config');
    const connection = ftp.create(config);

    connection.rmdir('prom/', (e) => {
        if (!e) {
            gulp.src(['../build/**', '../build/.htaccess'], { buffer: false })
                .pipe(connection.dest('prom/'));
        }
    });
});

gulp.task('default', () => {
    if (argv.endpoint === 'local') {
        sequence('clean', 'webpack', 'copy-public', 'svgmin');
    } else if (argv.endpoint === 'ftp') {
        sequence('clean', 'webpack', 'copy-public', 'svgmin', 'deploy');
    }
});
