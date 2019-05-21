var gulp = require('gulp');
var cssmin = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

/*
 * //建立任务
 * //利用sass插件把所有的sass文件编译成压缩后的对应的css文件
 * //使用pipe来串流来源档案，并合并到一个新的文件重新命名
 * //gulp.dest用来设定目的路径
 */
//编译sass文件和压缩css文件
gulp.task('minifyCSS', function() {
    return sass('./src/sass/*.scss', {
        style: 'compressed'
    }).pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/style/'));
})

//压缩js任务
gulp.task('minifyJS', function() {
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'));
})

//压缩图片
gulp.task('minifyImage', function() {
    return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));
})

//压缩html以及重命名
gulp.task('minifyHtml', function() {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename(function(path) {
        path.basename += "2";
        path.extname = ".html";
    }))
    .pipe(gulp.dest('./dist/'));
})

//及时刷新浏览器
gulp.task('reloadCSS', ['minifyCSS'], function() {
    return gulp.src('./main.html')
    .pipe(connect.reload());
});
gulp.task('reloadJS', ['minifyJS'], function() {
    return gulp.src('./main.html')
    .pipe(connect.reload());
});
gulp.task('reloadImage', ['minifyImage'], function() {
    return gulp.src('./main.html')
    .pipe(connect.reload());
});
gulp.task('reloadHtml', ['minifyHtml'], function() {
    return gulp.src('./main.html')
    .pipe(connect.reload());
});

//开启自动刷新服务（监听数据的变化）
gulp.task('default', ['reloadCSS', 'reloadJS', 'reloadImage', 'reloadHtml'], function() {
    connect.server({
        livereload: true
    });
    gulp.watch('./src/sass/*.scss', ['reloadCSS']);
    gulp.watch('./src/js/*.js', ['reloadJS']);
    gulp.watch('./src/images/*', ['reloadImage']);
    gulp.watch('./*.html', ['reloadHtml']);
})