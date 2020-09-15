'use strict'

import gulp,{series,parallel} from 'gulp'
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import merge from 'merge-stream';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';
import babel from 'gulp-babel';


let cache = new Cache();

const SRC = {
    CONTROLLERS : "routes/**/*.js",
    UTILS : "utils/**/*.js",
    APP : "app.js",
}

const DEST = {
    CONTROLLERS : "server/routes",
    UTILS : "server/utils",
    SERVER : "server"
}

const CLEAN = {
    WORK_FOLDER : "server",
    CACHE_FILE : ".gulp-cache"
}

function gulpClean() {
    var c1 = gulp.src(CLEAN.WORK_FOLDER,{read : false })
                .pipe(clean());
    var c2 = gulp.src(CLEAN.CACHE_FILE,{read : false})
                .pipe(clean());
    return merge(c1,c2);
}

function babelBuild(){
    var c =  gulp.src(SRC.CONTROLLERS)
            .pipe(cache.filter())
            .pipe(babel({
                presets : ["es2015"]
            }))
            .pipe(cache.cache())
            .pipe(gulp.dest(DEST.CONTROLLERS));

    var u = gulp.src(SRC.UTILS)
            .pipe(cache.filter())
            .pipe(babel({
                presets : ["es2015"]
            }))
            .pipe(cache.cache())
            .pipe(gulp.dest(DEST.UTILS));      
    return merge(c,u);
}

function start(){
    return nodemon({
        script : "./bin/www",
        watch : DEST.SERVER
    })
}

function babelApp(){
    return gulp.src(SRC.APP)
            .pipe(cache.filter())
            .pipe(babel({
                presets : ["es2015"]
            }))
            .pipe(cache.cache())
            .pipe(gulp.dest(DEST.SERVER));
}


function watch(done){
    let watcher = {
        server : gulp.watch(SRC.CONTROLLERS, babelBuild),
        app : gulp.watch(SRC.APP, babelApp)
    }

    let notify = (path, stats) => {
		gutil.log('File', gutil.colors.yellow(path), 'was', gutil.colors.magenta("changed"));
	};

	for(let key in watcher) {
		watcher[key].on('change', notify);
    }
    done();
}

exports.clean = gulpClean;
exports.build = series(babelBuild, babelApp);
exports.default = series(babelBuild, babelApp, watch, start);

