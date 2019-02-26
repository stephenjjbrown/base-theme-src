const tools = require("@pendulum/gulp-tools");

// Change these according to the development environment
// WARNING: Everything in dev. deploy path may be overwritten ***************
//const devDeployPath = "../../Hosts/wvalleyfiber/wp-content/themes/wvalleyfiber-theme/base-theme/";
const devDeployPath = "../wvalleyfiber-theme-src/node_modules/@pendulum/base-theme/lib";

const dist = "./dist";
const lib = "./lib";
const temp = "./temp";

module.exports = tools.createGulpfile({
    include: {
        clean: [dist, lib, temp],
        copy: {
            php: ["./src/php/**/*", "./dist/php"],
            monaco: ["./node_modules/monaco-editor/min/vs/**/*", "./dist/js/monaco-editor/vs"]
        },
        ts: {
            src: "./src/ts/**/*.{ts,tsx}",
            dest: temp + "/js",
            rollup: {
                main: {
                    src: [temp + "/js/main.js"],
                    dest: [lib + "/js"]
                },
                backend: {
                    src: [temp + "/js/editor.js", temp + "/js/theme-settings.js"],
                    dest: [dist + "/js"]
                }
            },
            declarations: { // Putting declarationDir in typescript config helps with typescript using Dist folder for types and causing build problems
                src: temp + "/js/**/*.d.ts",
                dest: lib + "/js"
            },
            clean: temp
        },
        deploy: { // Deploy is only for quicker testing, not for prod
            //src: dist + "/**/*",
            src: lib + "/**/*",
            dest: devDeployPath
        }
    }
});