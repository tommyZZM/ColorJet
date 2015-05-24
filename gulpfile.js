/**
 * Created by tommyZZM on 2015/5/24.
 */
var gulp = require('gulp');

var alcedo = require("alcedo");

gulp.task('default', ["colorjet"]);

gulp.task('startserver', function() {
    gulp.src("./")
        .pipe(alcedo.server({port:3210,index:"./demo/index.html",bowser:"chrome"}));
});

new alcedo.ProjectCreater({
    projectid:"colorjet",
    src:"./src/**/*.ts",
    outdir:"./demo/script",
    outfile:"colorjet.js",
    reqdts:"./demo/require/**/*.d.ts"
});