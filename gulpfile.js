////引入gulp
var gulp=require('gulp');
//js压缩
var uglify=require("gulp-uglify");
//引入gulp-rename 文件改名
var rename=require('gulp-rename');
//引入gulp-scss
var sass=require('gulp-sass');
//引入gulp-clean 删除
var clean=require('gulp-clean');
//引入gulp-autoprefixer css前后缀
var autoprefixer=require('gulp-autoprefixer');
//引入gulp-connect 服务器
var webconnect=require('gulp-connect');
/*
* gulp常用的关键字
* 1.task 创建任务
* 2.src 源文件路径
* 3.pipe 管道
* 4.dest 目标路径
* 5.watch 实时监听
*/
//配置压缩任务
gulp.task('yasuo',function() {
 gulp.src('./src/js/*.js')
       .pipe(uglify())
       .pipe(rename({
   			suffix:".min"//suffix后面添加
        }))
       .pipe(gulp.dest('./dist/js'))

})


//编译sass->css

gulp.task('sasstocss',function() {
	return gulp.src('./src/css/*.scss')
	    .pipe(sass())
	    .pipe(rename({
			prefix:'abc-'//prefix前面添加
	     }))
	    
	    .pipe(gulp.dest('./dist/css'))

})
//删除/dist/css目录
 gulp.task('del',function(){
 	gulp.src('./dist/css')
 	    .pipe(clean())
 })
 //自动加css3前缀  -webkit-,-moz-,-ms-,-o
 
 gulp.task('add',['sasstocss'],function(){
 	gulp.src('./dist/css/*.css')
 	.pipe(autoprefixer({
	           browsers: ['> 5%','Firefox <= 20'],
			   cascade: true
	
	    }))
	.pipe(gulp.dest('./dist/css2')) 
 })

 //创建一个静态web服务器
 gulp.task('connect',function(){
 	webconnect.server({
 		root:'./src/view',//站点根目录
 		livereload:true, // 实时刷新浏览器
 		port:9999//端口
 	})
 })
 gulp.task('watch', function () {
  gulp.watch(['./src/view/*.html'], ['html'])
});
 

gulp.task('html', function () {
  gulp.src('./src/view/*.html')
    .pipe(webconnect.reload())
});
 


gulp.task('default', ['connect', 'watch'])