//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var handlebars = require('gulp-handlebars');
    wrap = require('gulp-wrap'),
    concat = require('gulp-concat'),
    declare = require('gulp-declare')

// 定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
gulp.task('default',['hbs'], function() {})

// 编译hbs
gulp.task('hbs', function() {
    //该任务针对的文件
    return gulp.src('dist/hbs/*.hbs')
        // 监测改变
        // .pipe(watch('dist/hbs/*.hbs'))
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'tempHtml',
            noRedeclare: true,
        }))
        // 合并
        .pipe(concat('templates.js'))
        // 输出
        .pipe(gulp.dest('dist/hbs/temp/'))
})

// 自动重启
gulp.task('nodemon', function() {
	nodemon({
		"script": "gulp"
	})
})


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
