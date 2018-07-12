import { TypeDocOptions } from './typedoc/TypeDocOptions';
import * as gulp from 'gulp';
import tslint from 'gulp-tslint';
import typedoc = require('gulp-typedoc');
import jsdoc = require('gulp-jsdoc3');

/**
 * Gulp enum task
 * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gulp/test/index.ts  (examples - test)
 * @enum GulpTask
 */
export enum AppGeneralGulpTask {
    /** TYPEDOC */
    TYPEDOC = 'typedoc',
    /** TYPEDOC_MARKDOWN */
    TYPEDOC_MARKDOWN = 'typedoc-markdown',
    /** JSDOC */
    JSDOC = 'jsdoc',
    /** ALL_DOCS */
    ALL_DOCS = 'all_docs',
    /** TS_LINT */
    TS_LINT = 'tslint',
}

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
export class AppGeneralTasks {

    /**
     * Typedoc options
     * @private
     * @type {TypeDocOptions}
     * @memberof Gulp
     */
    private typeDocOptions: TypeDocOptions = {
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
    private typeDocMarkdownOptions: TypeDocOptions = {
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

    /**
     * jsDoc JSON configuration
     * @private
     * @type {*}
     * @memberof AppGeneralTasks
     */
    private jsDocConfig: any;

    /**
     * Creates an instance of AppGeneralTasks.
     * @memberof AppGeneralTasks
     */
    constructor(jsDocConfig: any) {
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
    private addTypeDocTask() {
        gulp.task(AppGeneralGulpTask.TYPEDOC, () => {
            return gulp
                .src(['gulpfile.ts', 'src/**/*.ts'])
                .pipe(typedoc(this.typeDocOptions));
        });
    }

    /**
     * Add typedoc markdown task.
     * @private
     * @memberof AppGeneralTasks
     */
    private addTypeDocMarkdowTask() {
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
    private addJsDocTask() {
        gulp.task(AppGeneralGulpTask.JSDOC, (callback) => {
            const srcCode = ['README.md', './gulpfile.js',
                './dist/modules/**/*.js', './dist/shared-module/**/*.js'];
            gulp.src(srcCode, { read: false })
                .pipe(jsdoc(this.jsDocConfig, callback));
        });
    }
    /**
     * Add all docs tasks
     * @private
     * @memberof AppGeneralTasks
     */
    private addAllDocsTask() {
        gulp.task(AppGeneralGulpTask.ALL_DOCS, [AppGeneralGulpTask.TYPEDOC, AppGeneralGulpTask.JSDOC, AppGeneralGulpTask.TYPEDOC_MARKDOWN],
            (done) => {
                // do more stuff
                done();
            });
    }

    /**
     * Add the tslint application task
     * @private
     * @memberof AppGeneralTasks
     */
    private addTslintApplication() {
        gulp.task(AppGeneralGulpTask.TS_LINT, () => {
            gulp.src(['gulpfile.ts', 'src/**/*.ts'])
                .pipe(tslint({
                    formatter: 'verbose',
                }))
                .pipe(tslint.report());
        });
    }
}