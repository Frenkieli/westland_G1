const gulp = require('gulp');
// 宣告gulp就是要求gulp
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('template', function () {
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));
})


// sass

gulp.task('sass', function () {
    return gulp.src('dev/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS({ compatibility: 'ie8' })) // 上線記得這段要取消註釋
        .pipe(gulp.dest('./dest/css'));
});

gulp.task('moveJs', function () {
    gulp.src(["dev/js/*.js", "dev/js/*/*.js"])
        .pipe(gulp.dest('dest/js'))
});

gulp.task('movePlugin_css', function () {
    gulp.src(["dev/plugin_css/*.css"])
        .pipe(gulp.dest('dest/css'))
});

gulp.task('moveImg', function () {
    gulp.src(["dev/images/*", "dev/images/*/*", "dev/images/*/*/*" ])
        .pipe(gulp.dest('dest/images'))
});

gulp.task('movePhp', function () {
    gulp.src(["dev/php/*", "dev/php/*/*"])
        .pipe(gulp.dest('dest/php'))
});

gulp.task('moveBackend', function () {
    gulp.src(["dev/westland_Backend/*", "dev/westland_Backend/*/*", "dev/westland_Backend/*/*/*" ])
        .pipe(gulp.dest('dest/westland_Backend'))
});


gulp.task('default', function () {
    gulp.src(["dev/westland_Backend/*", "dev/westland_Backend/*/*", "dev/westland_Backend/*/*/*" ])
    .pipe(gulp.dest('dest/westland_Backend'));
    gulp.src(["dev/images/*", "dev/images/*/*", "dev/images/*/*/*"])
        .pipe(gulp.dest('dest/images'));
    gulp.src(["dev/plugin_css/*.css"])
        .pipe(gulp.dest('dest/css'));
    gulp.src(["dev/js/*.js", "dev/js/*/*.js"])
        .pipe(gulp.dest('dest/js'));
    gulp.src('dev/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS({ compatibility: 'ie8' })) // 上線記得這段要取消註釋
        .pipe(gulp.dest('./dest/css'));
    gulp.src(["dev/php/*", "dev/php/*/*"])
        .pipe(gulp.dest('dest/php'));
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));

    browserSync.init({
        server: {
            //根目錄
            baseDir: "./dest",
            // 瀏覽器上的首頁
            index: "index.html"
        }
    });

    gulp.watch(["dev/*.html", "dev/template/*.html"], ['template']).on('change', reload);
    gulp.watch(["dev/sass/*.scss", "dev/sass/*/*"], ['sass']).on('change', reload);
    gulp.watch(["dev/js/*.js", "dev/js/*/*"], ['moveJs']).on('change', reload);
    gulp.watch(["dev/images/*/*"], ["moveImg"]).on('change', reload);
    gulp.watch(["dev/php/*/*","dev/php/*"], ["movePhp"]).on('change', reload);
    gulp.watch(["dev/plugin_css/*.css"], ["movePlugin_css"]).on('change', reload);
    gulp.watch(["dev/westland_Backend/js/*"], ["moveBackend"]).on('change', reload);

});