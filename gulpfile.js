const gulp          = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const sourceMap     = require('gulp-sourcemaps');
const imagemin      = require('gulp-imagemin');
const del           = require('del');

//

const srcDir = './src/';
const pubDir = './public/';

const d = {

    dev: {

        sass:   srcDir + 'sass/**/*.sass'

    },

    src: {

        css:    srcDir + 'css'

    },

    pub: {

        css:    pubDir + 'assets/css'

    }

}

//

const prep = {

    devcss:     () => { return del(d.pub.css+'/**/*') },
    buildcss:   () => { return del(d.src.css+'/**/*') }

}

function doCSS(cb) {

    // Get Sass and turn into CSS, create sourcemaps and then move to public

    return gulp.src(d.dev.sass)
        .pipe(sourceMap.init())
        .pipe(sass())
        .pipe(sourceMap.write())
        .pipe(gulp.dest(d.src.css))
        .pipe(gulp.dest(d.pub.css))

    cb();

}

function buildCSS(cb) {

    return gulp.src(d.dev.sass)
        .pipe(sass())
        .pipe(gulp.dest(d.src.css))
        .pipe(gulp.dest(d.pub.css))

    cb();

}

function watchAll() {

    gulp.watch(d.dev.sass, gulp.series(prep.buildcss, prep.devcss, doCSS, buildCSS));

}

//

exports.default = function() {

    watchAll();

}

exports.buildcss = buildCSS;