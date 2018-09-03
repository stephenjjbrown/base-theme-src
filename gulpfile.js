const gulp = require("gulp");
const sass = require("gulp-sass");

// Gulp Helpers
const watchTask = (glob, taskName) => gulp.task(taskName + ":watch", [taskName], () => gulp.watch(glob, [taskName]));
const watchableTask = (taskName, glob, callback, dependencies) => {
    gulp.task(taskName, dependencies || [], () => callback(gulp.src(glob)));
    watchTask(glob, taskName);
};

watchableTask("sass", "./src/scss/style.scss", src => src
    .pipe(sass())
    .pipe(gulp.dest("dist"))
);

watchableTask("static", "./static/**/*", src => src
    .pipe(gulp.dest("dist"))
);

watchableTask("deploy", "./dist/**/*", src => src
    .pipe(gulp.dest("../../wp-content/themes/base-theme"))
);

gulp.task("watch", ["sass:watch", "static:watch", "deploy:watch"]);

gulp.task("default", ["watch"]);