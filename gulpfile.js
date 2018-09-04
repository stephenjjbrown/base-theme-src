const gulp = require("gulp");
const sass = require("gulp-sass");

const typescript = require("gulp-typescript");
const tsProject = typescript.createProject("tsconfig.json");

const rollup = require("gulp-better-rollup");

gulp.task("typescript", () => {
    return gulp.src("./src/ts/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("build/js"));
});

gulp.task("rollup", ["typescript"], () => {
    return gulp.src("./build/js/main.js")
        .pipe(rollup({
            "format": "iife"
        }))
        .pipe(gulp.dest("dist/js"))
});

gulp.task("sass", () => {
    return gulp.src("./src/scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist"))
})

gulp.task("static", () => {
    return gulp.src("./static/**/*")
        .pipe(gulp.dest("dist"))
});

gulp.task("deploy", ["static", "sass", "rollup"], () => {
    return gulp.src("./dist/**/*")
        .pipe(gulp.dest("../../wp-content/themes/base-theme"))
});

gulp.task("default", ["deploy"]);