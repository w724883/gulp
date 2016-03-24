var gulp = require('gulp'),
	// runSequence = require('run-sequence'),
	concat = require('gulp-concat'),
	sass = require('gulp-ruby-sass'),
	files = require('gulp-group-files'),
	rev = require('gulp-rev'),
	collector = require('gulp-rev-collector'),
	uglify = require('gulp-uglify'),
	// rename = require('gulp-rename'),
	// browserify = require('browserify'),
	// babelify = require('babelify'),
	// source = require('vinyl-source-stream'),
	includer = require('gulp-content-includer'),
	// jsx = require('gulp-jsx'),
	react = require('gulp-react');
	// browserSync = require('browser-sync'),
	// spritesmith = require('grunt-spritesmith'),
	// reactify = require ( 'reactify' );


// concat html
function concatCb(){
	var options = {
		competitionLeaflet:{
			src:['rev-manifest.json','html/header.html','html/modules/competitionLeaflet.html','html/footer.html'],
			dest:'competitionLeaflet.html'
		},
		competition:{
			src:['rev-manifest.json','html/header.html','html/modules/competition.html','html/footer.html'],
			dest:'competition.html'
		}
	}
	for(var key in options){
		gulp.src(options[key].src)
			.pipe(includer({
	    		includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
	        }))
			.pipe(collector())
			.pipe(concat(options[key].dest))
			.pipe(gulp.dest('../'));
	}
}

// sass
function sassCb(){
	return files({
		common:{
			src:'sass/common.scss',
			dest:'../css'
		},
		competition:{
			src:'sass/competition.scss',
			dest:'../css'
		},
		index:{
			src:'sass/index.scss',
			dest:'../css'
		}
	},function(key,value){
		return sass(value.src,{
			sourcemap:true,
			// sourcemapPath:'./sass',
			style:'compressed',
			// compass:true
		}).on('error', function (err) {
                console.error('compile sass file error: %s', err.message);
        })
        .pipe(rev())
        .pipe(gulp.dest(value.dest))
        .pipe(rev.manifest({
        	base: './',
        	merge: true
        }))
        .pipe(gulp.dest('./'));
	})();
}

// js
function uglifyCb(){
	gulp.src('js/**/*.js')
    // .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('../js'))
    .pipe(rev.manifest({
       	base: './',
    	merge: true
    }))
    .pipe(gulp.dest('./'));
}

// 编译jsx
function jsxCb(){
	gulp.src('jsx/**')
	.pipe(react())
	.pipe(gulp.dest('js/'));
	// return browserify('jsx/modules/competition.js')
 //         .transform(babelify)
 //         .bundle()
 //         .pipe(source('competition.js'))
 //         .pipe(gulp.dest('js/modules'));
}

// MD5版本号
// gulp.task('revHtml',function(){
// 	gulp.src(['rev/**/*.json', 'src/css/*.sass'])
//     	.pipe(collector())
//     	.pipe(gulp.dest());
// });

// gulp.task('watch',['concat'],function(){
// 	setTimeout(function(){
// 		gulp.watch('sass/*',['sass']);
// 		gulp.watch('html/**',['concat']);
// 		gulp.watch('jsx/**',['jsx']);
// 		gulp.watch('js/**',['uglify']);
// 	},1000);
	
// });
gulp.task('concat',['sass','uglify'],concatCb);
gulp.task('sass',sassCb);
gulp.task('uglify',['jsx'],uglifyCb);
gulp.task('jsx',jsxCb);

gulp.watch('sass/*',sassCb);
gulp.watch('html/**',concatCb);
gulp.watch('jsx/**',jsxCb);
gulp.watch('js/**',uglifyCb);

gulp.task('dev',['concat']);



