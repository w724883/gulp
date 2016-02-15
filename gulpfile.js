var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
gulp.task('js', function () {	//gulp.task('build', ['css', 'js', 'imgs']); 指定任务
	/*
	*	gulp.task('css', ['greet'], function () {});	指定任务依赖，css在greet完成后执行
	*/
  	return gulp.src('base.js')	//['a.js','b.js']多个文件
    .pipe(jshint())
    .pipe(uglify())
    .pipe(rename('min.js'))
    // .pipe(concat('select2.js'))
    .pipe(gulp.dest('build'));	//可配置第二个参数{cwd: './app',mode: '0644'}
});