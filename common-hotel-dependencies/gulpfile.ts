import { AppGeneralTasks, AppGeneralGulpTask } from './src/shared-module/gulp/AppGeneralTasks';
import * as gulp from 'gulp';

/** jsDocConfig */
const jsDocConfig = require('./jsdoc.json');

/**
 * Gulp enum task
 * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gulp/test/index.ts  (examples - test)
 * @enum GulpTask
 */
export enum GulpTask {
    DEFAULT = 'default',
}

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
export class GulpFile extends AppGeneralTasks {

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
    private addDefaultTask() {
        gulp.task(GulpTask.DEFAULT, [AppGeneralGulpTask.TS_LINT]);
    }
}
new GulpFile();