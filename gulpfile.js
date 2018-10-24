const gulp = require("gulp");
const sass = require("gulp-sass");

const typescript = require("gulp-typescript");
const tsProject = typescript.createProject("tsconfig.json");

const rollup = require("gulp-better-rollup");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonJs = require("rollup-plugin-commonjs");

const { log } = require("gulp-util");


/**
 * PHP
 */
gulp.task("php", () => {
    return gulp.src("./src/php/**/*.php")
        .pipe(gulp.dest("dist"));
});
gulp.task("php:watch", ["php"], () => gulp.watch("./src/php/**/*.php", ["php"]));


/**
 * Typescript
 */
gulp.task("typescript", () => {
    return gulp.src("./src/ts/**/*.{ts,tsx}")
        .pipe(tsProject())
        .on('error', log)
        .pipe(gulp.dest("build/js"));
});


/**
 * Rollup
 */
gulp.task("rollup", ["typescript"], () => {
    return gulp.src(["./build/js/main.js", "./build/js/editor.js"])
        .pipe(rollup({
            plugins: [
                commonJs({
                    namedExports: {
                        'lodash': [
                            'isEqual',
                            'cloneDeep',
                            'merge',
                            'times',
                            'memoize'
                        ]
                    }
                }),
                nodeResolve()
            ]
        }, {
            format: "iife" // Specifying the output format on this line instead of the first fixes some resolution problems
        }))
        .on('error', log)
        .pipe(gulp.dest("dist/js"))
});
gulp.task("rollup:watch", ["rollup"], () => gulp.watch("./src/ts/**/*.{ts,tsx}", ["rollup"]));


/**
 * Sass
 */
gulp.task("sass-theme", () => {
    return gulp.src("./src/scss/style.scss")
        .pipe(sass())
        .on('error', log)
        .pipe(gulp.dest("dist"))
});
gulp.task("sass-editor", () => {
    return gulp.src("./src/scss/editor.scss")
        .pipe(sass())
        .on('error', log)
        .pipe(gulp.dest("dist/css"))
});
gulp.task("sass:watch", ["sass-theme", "sass-editor"], () => gulp.watch("./src/scss/**/*.scss", ["sass-theme", "sass-editor"]));


/**
 * Static files
 */
gulp.task("static", () => {
    return gulp.src("./static/**/*")
        .pipe(gulp.dest("dist"))
});
gulp.task("static:watch", ["static"], () => gulp.watch("./static/**/*", ["static"]));


/**
 * Deploy to WordPress
 */
gulp.task("deploy", () => {
    return gulp.src("./dist/**/*")
        .pipe(gulp.dest("../../wp-content/themes/base-theme"))
});
gulp.task("deploy:watch", ["php:watch", "sass:watch", "static:watch", "rollup:watch"], () => gulp.watch("./dist/**/*", ["deploy"]));


/**
 * Publish to Github to release update to theme
 */
gulp.task("publish", () => {
    return gulp.src("./dist/**/*")
        .pipe(gulp.dest("../base-theme-dist"))
});

/**
 * Default Task
 */
gulp.task("default", ["deploy:watch"]);