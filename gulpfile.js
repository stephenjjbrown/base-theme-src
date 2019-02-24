const tools = require("@pendulum/gulp-tools");

// Change these according to the development environment
// WARNING: Everything in dev. deploy path may be overwritten ***************
const devDeployPath = "../../Hosts/wvalleyfiber/wp-content/themes/wvalleyfiber-theme";

const dist = "./dist";
const temp = "./temp";

module.exports = tools.createGulpfile({
    include: {
        clean: [dist, temp],
        ts: {
            src: "./src/ts/**/*.{ts,tsx}",
            dest: temp + "/js",
            rollup: {
                src: [temp + "/js/main.js", temp + "/js/editor.js", temp + "/js/theme-settings.js"],
                dest: dist + "/js"
            },
            declarations: { // Putting declarationDir in typescript config helps with typescript using Dist folder for types and causing build problems
                src: temp + "/js/**/*.d.ts",
                dest: dist + "/js"
            },
            clean: temp
        },
        deploy: { // Deploy is only for quicker testing, not for prod
            src: dist + "/js/theme-settings.js",
            dest: devDeployPath
        }
    }
});