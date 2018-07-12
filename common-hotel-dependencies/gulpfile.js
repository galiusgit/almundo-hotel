"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppGeneralTasks_1 = require("./src/shared-module/gulp/AppGeneralTasks");
const gulp = require("gulp");
/** jsDocConfig */
const jsDocConfig = require('./jsdoc.json');
/**
 * Gulp enum task
 * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gulp/test/index.ts  (examples - test)
 * @enum GulpTask
 */
var GulpTask;
(function (GulpTask) {
    GulpTask["DEFAULT"] = "default";
})(GulpTask = exports.GulpTask || (exports.GulpTask = {}));
/**
 * The gulp class configuration.
 * Configuration from package.json
 * "scripts": {
 *      "start": "{ gulp watch & node server.js & }"
 * }
 *   To disable logging, too:
 *
 *  "scripts": {
 *       "start": "{ gulp watch --silent & node server.js & }"
 *  }
 * @class GulpFile
 */
class GulpFile extends AppGeneralTasks_1.AppGeneralTasks {
    /**
     * Creates an instance of GulpFile.
     * @memberof GulpFile
     */
    constructor() {
        super(jsDocConfig);
        this.addDefaultTask();
    }
    /**
     * Add the default task to gulp configuration.
     * @private
     * @memberof GulpFile
     */
    addDefaultTask() {
        gulp.task(GulpTask.DEFAULT, [AppGeneralTasks_1.AppGeneralGulpTask.TS_LINT]);
    }
}
exports.GulpFile = GulpFile;
new GulpFile();
