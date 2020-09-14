'use strict';

import gulp, {series, paralle} from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import merge from 'merge-stream'; // stream 을 합쳐줌.. 
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
import Cache from 'gulp-file-cache';
import utils from 'gulp-clean/utils';
let cache = new Cache();

const SRC = {
	CONTROLLERS: 'routes/**/*.js',
	MODELS: 'models/**/*.js',
	UTILS: 'utils/**/*.js',
    APP: 'app.js',
    SOCKET: 'socket.js',
    SERVER: ['routes/**/*.js', 'models/**/*.js', 'utils/**/*.js', 'app.js', 'socket.js']
}
const DEST = {
	CONTROLLERS: 'server/routes',
	MODELS: 'server/models',
	UTILS: 'server/utils',
	SERVER: 'server'
};
const CLEAN = {
	WORK_FOLDER: "server",
	CACHE_FILE:".gulp-cache"
}

function gulpClean(){
    var c1 = gulp.src(CLEAN.WORK_FOLDER, {read :false}).pipe(clean());
    var c2 = gulp.src(CLEAN.CACHE_FILE, {read : false}).pipe(clean());
    return merge(c1,c2)
}

function start(){
    return nodemon({
        script : './bin/www',
        watch : DEST.SERVER
    });
}

function watchApp(done){
    let watcher = {
        controllers : gulp.watch(SRC.CONTROLLERS, babelBuild),
        models : gulp.watch(SRC.MODELS, babelBuild),
        utils : gulp.watch(SRC.UTILS, babelBuild),
        app : gulp.watch(SRC.APP, babelBuild),
        socket : gulp.watch(SRC.SOCKET, babelBuild),
        // server : gulp.watch(SRC.SERVER,babelBuild) 로 대체 가능 
    }

    let notify = (path,status) => {
		gutil.log('File', gutil.colors.yellow(path), 'was', gutil.colors.magenta('changed'));
	};

	for(let key in watcher) {
		watcher[key].on('change', notify);
	}

	done()

}


// /app.js
function babelApp(){
    return gulp.src(SRC.APP)
            .pipe(cache.filter())
            .pipe(babel({
                presets : ['es2015']
            }))
            .pipe(cache.cache())
            .pipe(gulp.dest(DEST.SERVER));
}

function babelBuild(){
    //server es6 문법 사용 처리
   var controller = gulp.src(SRC.CONTROLLERS)
                        .pipe(cache.filter())
                        .pipe(babel({
                            presets : ['es2015']
                        }))
                        .pipe(cache.cache())
                        .pipe(gulp.dest(DEST.CONTROLLERS));

    var models = gulp.src(SRC.MODELS)
                        .pipe(cache.filter())
                        .pipe(babel({
                            presets : ['es2015']
                        }))
                        .pipe(cache.cache())
                        .pipe(gulp.dest(DEST.MODELS));                
                        
    var utils = gulp.src(SRC.UTILS)
                        .pipe(cache.filter())
                        .pipe(babel({
                            presets : ['es2015']
                        }))
                        .pipe(cache.cache())
                        .pipe(gulp.dest(DEST.UTILS));
    return merge(controller,models,utils);

}

function babelSocket(){
    return gulp.src(SRC.SOCKET)
            .pipe(cache.filter())
            .pipe(babel({
                presets : ['es2015']
            }))
            .pipe(cache.cache())
            .pipe(gulp.dest(DEST.SERVER));
}


exports.clean = gulpClean;
exports.build = series(babelApp , babelSocket , babelBuild);
exports.babelApp = babelApp;
exports.babelBuild = babelBuild;
exports.babelSocket = babelSocket;
exports.watch = watchApp;
exports.default = series(babelBuild , babelApp , babelSocket , watchApp , start )