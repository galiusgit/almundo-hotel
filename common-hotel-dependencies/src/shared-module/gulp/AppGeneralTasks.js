"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const gulp_tslint_1 = require("gulp-tslint");
const typedoc = require("gulp-typedoc");
const jsdoc = require("gulp-jsdoc3");
/**
 * Gulp enum task
 * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gulp/test/index.ts  (examples - test)
 * @enum GulpTask
 */
var AppGeneralGulpTask;
(function (AppGeneralGulpTask) {
    /** TYPEDOC */
    AppGeneralGulpTask["TYPEDOC"] = "typedoc";
    /** TYPEDOC_MARKDOWN */
    AppGeneralGulpTask["TYPEDOC_MARKDOWN"] = "typedoc-markdown";
    /** JSDOC */
    AppGeneralGulpTask["JSDOC"] = "jsdoc";
    /** ALL_DOCS */
    AppGeneralGulpTask["ALL_DOCS"] = "all_docs";
    /** TS_LINT */
    AppGeneralGulpTask["TS_LINT"] = "tslint";
})(AppGeneralGulpTask = exports.AppGeneralGulpTask || (exports.AppGeneralGulpTask = {}));
/**
 * The gulp app general tasks configuration.
 * Configuration from package.json
 * "scripts": {
 *      "start": "{ gulp watch & node server.js & }"
 * }
 *   To disable logging, too:
 *
 *  "scripts": {
 *       "start": "{ gulp watch --silent & node server.js & }"
 *  }
 * @class AppGeneralTasks
 */
class AppGeneralTasks {
    /**
     * Creates an instance of AppGeneralTasks.
     * @memberof AppGeneralTasks
     */
    constructor(jsDocConfig) {
        /**
         * Typedoc options
         * @private
         * @type {TypeDocOptions}
         * @memberof Gulp
         */
        this.typeDocOptions = {
            module: 'commonjs',
            target: 'es6',
            readme: 'README.md',
            out: 'dist/ts-docs/',
            json: 'dist/ts-docs/tsdocs.json',
            name: 'Typecript Docs',
            experimentalDecorators: true,
            includeDeclarations: true,
            version: true,
        };
        /**
         * Typedoc markdow options documentation.
         * @private
         * @type {TypeDocOptions}
         * @memberof AppGeneralTasks
         */
        this.typeDocMarkdownOptions = {
            module: 'commonjs',
            target: 'es6',
            out: 'dist/ts-markdown/',
            json: 'dist/ts-markdown/tsmarkdown.json',
            name: 'Typecript markdown Docs',
            theme: 'markdown',
            experimentalDecorators: true,
            includeDeclarations: true,
            version: true,
        };
        this.jsDocConfig = jsDocConfig;
        this.addTslintApplication();
        this.addTypeDocMarkdowTask();
        this.addJsDocTask();
        this.addTypeDocTask();
        this.addAllDocsTask();
    }
    /**
     * Add the typedoc task (typescript documentation generator).
     * @private
     * @memberof AppGeneralTasks
     */
    addTypeDocTask() {
        gulp.task(AppGeneralGulpTask.TYPEDOC, () => {
            return gulp
                .src(['gulpfile.ts', 'src/**/*.ts', '../almundo-hotel-content/src/**/*.ts', '../almundo-hotel-api/src/**/*.ts'])
                .pipe(typedoc(this.typeDocOptions));
        });
    }
    /**
     * Add typedoc markdown task.
     * @private
     * @memberof AppGeneralTasks
     */
    addTypeDocMarkdowTask() {
        gulp.task(AppGeneralGulpTask.TYPEDOC_MARKDOWN, () => {
            return gulp
                .src(['gulpfile.ts', 'src/**/*.ts'])
                .pipe(typedoc(this.typeDocMarkdownOptions));
        });
    }
    /**
     * Add the js docs. (Javascript documentation generator)
     * TODO: arreglar la tarea jsdocs, algo pasa con la generación, comando: gulp typedoc && gulp jsdoc
     * quizas la dependencia "jsdoc": "^3.5.5", sobre el package no sea necesaria.
     * @private
     * @memberof AppGeneralTasks
     */
    addJsDocTask() {
        gulp.task(AppGeneralGulpTask.JSDOC, (callback) => {
            const srcCode = ['README.md', './gulpfile.js',
                './dist/modules/**/*.js', './dist/shared-module/**/*.js',
                '../almundo-hotel-content/dist/**/*.js', '../dist/almundo-hotel-api/src/**/*.js'];
            gulp.src(srcCode, { read: false })
                .pipe(jsdoc(this.jsDocConfig, callback));
        });
    }
    /**
     * Add all docs tasks
     * @private
     * @memberof AppGeneralTasks
     */
    addAllDocsTask() {
        gulp.task(AppGeneralGulpTask.ALL_DOCS, [AppGeneralGulpTask.TYPEDOC, AppGeneralGulpTask.JSDOC, AppGeneralGulpTask.TYPEDOC_MARKDOWN], (done) => {
            // do more stuff
            done();
        });
    }
    /**
     * Add the tslint application task
     * @private
     * @memberof AppGeneralTasks
     */
    addTslintApplication() {
        gulp.task(AppGeneralGulpTask.TS_LINT, () => {
            gulp.src(['gulpfile.ts', 'src/**/*.ts'])
                .pipe(gulp_tslint_1.default({
                formatter: 'verbose',
            }))
                .pipe(gulp_tslint_1.default.report());
        });
    }
}
exports.AppGeneralTasks = AppGeneralTasks;
