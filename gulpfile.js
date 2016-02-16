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


/*
*	gulp.watch('templates/*.tmpl.html', function (event) {});	回调函数代替任务执行
*	
*
	var watcher = gulp.watch('base.js', ['js']);
	watcher.on('change', function (event) {});	
	//end：回调函数运行完毕时触发。
	//error：发生错误时触发。
	//ready：当开始监听文件时触发。
	//nomatch：没有匹配的监听文件时触发。
	//watcher.end()：停止watcher对象，不会再调用任务或回调函数。
	//watcher.files()：返回watcher对象监视的文件。
	//watcher.add(glob)：增加所要监视的文件，它还可以附件第二个参数，表示回调函数。
	//watcher.remove(filepath)：从watcher对象中移走一个监视的文件。
*/
gulp.task('watch', function () {
   gulp.watch('base.js', ['js']);
});

/*
	var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();
    gulp.task('js', function () {
       return gulp.src('js/*.js')
          .pipe(plugins.jshint())
          .pipe(plugins.jshint.reporter('default'))
          .pipe(plugins.uglify())
          .pipe(plugins.concat('app.js'))
          .pipe(gulp.dest('build'));
    });
*/