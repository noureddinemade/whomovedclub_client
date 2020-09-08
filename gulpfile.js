const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourceMap     = require('gulp-sourcemaps');
const del           = require('del');

sass.compiler       = require('node-sass');

//

const devDir    = './_dev/';
const srcDir    = './src/assets/';
const pubDir    = './public/assets/';
const buildDir  = './build/**/*';

const dev = {

    js:     devDir +'js/**/*.js',
    sass:   devDir +'sass/**/*.sass',
    font:   devDir +'font/**/*'

}
const src = {

    js:     srcDir +'js',
    css:    srcDir +'css',
    font:   srcDir +'font'

}
const pub = {

    css: pubDir +'css',
    font: pubDir +'font'

}

//

const prep = {

    js:         () => { return del(src.js+'/**/*') },
    devcss:     () => { return del(pub.css+'/**/*') },
    buildcss:   () => { return del(src.css+'/**/*') },
    font:       () => { return del(src.font+'/**/*') }

}

//

function doFont(cb) {

    // Move fonts

    return gulp.src(dev.font)
        .pipe(gulp.dest(src.font))
        .pipe(gulp.dest(pub.font));

    cb();

}

function doJSClient(cb) {

    // Move javascript.

    return gulp.src(dev.js)
        .pipe(gulp.dest(src.js))

    cb();

}

function doCSS(cb) {

    // Get Sass and turn into CSS, create sourcemaps and then move to public

    return gulp.src(dev.sass)
        .pipe(sourceMap.init())
        .pipe(sass())
        .pipe(sourceMap.write())
        .pipe(gulp.dest(pub.css))

    cb();

}

function buildCSS(cb) {

    return gulp.src(dev.sass)
        .pipe(sass())
        .pipe(gulp.dest(src.css))

    cb();

}

function watchAll() {
    
    gulp.watch(dev.js, gulp.series(prep.js, doJSClient));

    gulp.watch(dev.sass, gulp.series(prep.buildcss, prep.devcss, doCSS, buildCSS));

    gulp.watch(dev.font, gulp.series(prep.font, doFont));

}

//

exports.default = function() {

    watchAll();

}

exports.buildcss = buildCSS;