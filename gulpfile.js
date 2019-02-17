const gulp = require("gulp");
const sass = require("gulp-sass");

const typescript = require("gulp-typescript");
const tsProject = typescript.createProject("tsconfig.json");

const rollup = require("gulp-better-rollup");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonJs = require("rollup-plugin-commonjs");

const babel = require("rollup-plugin-babel");
const externalHelpers = require("@babel/plugin-external-helpers")

const cache = require("gulp-cache");

const sftp = require("gulp-sftp");

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
    return gulp.src(["./build/js/main.js", "./build/js/editor.js", "./build/js/theme-settings.js"])
        .pipe(rollup({
            plugins: [
                babel({
                    babelrc: false,
                    comments: false,
                    presets: [['@babel/preset-env', {
                        targets: {
                            "ie": "11"
                        },
                        loose: true,
                        modules: false
                    }]]
                }),
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
                nodeResolve(),

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
        .pipe(cache(gulp.dest("dist")))
});
gulp.task("static:watch", ["static"], () => gulp.watch("./static/**/*", ["static"]));


/**
 * Deploy to WordPress
 */
gulp.task("deploy", ["rollup"], () => {
    return gulp.src("./dist/**/*")
        .pipe(cache(sftp({
            host: 'wvalleyfiber.stagingsite.design',
            user: 'dh_85c5kg',
            pass: 'QJ2PwpxV',
            remotePath: '/home/dh_85c5kg/wvalleyfiber.stagingsite.design/wp-content/themes/base-theme/'
        })))

        //.pipe(cache(gulp.dest("/Users/stephenbrown/Library/Group Containers/G69SCX94XU.duck/Library/Application Support/duck/Volumes/Willamette Valley Fiber Staging/wvalleyfiber.stagingsite.design/wp-content/themes/base-theme/")))
        //.pipe(gulp.dest("/Users/stephenbrown/Library/Group Containers/G69SCX94XU.duck/Library/Application Support/duck/Volumes/Willamette Valley Fiber Staging-1/wvalleyfiber.stagingsite.design/wp-content/themes/base-theme/"))
        //.pipe(gulp.dest("../../wp-content/themes/base-theme"))
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
 * 
 */
gulp.task("clear", () => {
    return cache.clearAll();
})

/**
 * Default Task
 */
gulp.task("default", ["deploy:watch"]);