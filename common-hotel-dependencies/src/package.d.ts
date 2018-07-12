/**
 * Package json information.
 * This is based: https://github.com/YousefED/typescript-json-schema
 * - This file buils the "package.schema.json" file in the compilation route "./dist"
 * - The command for generates the "package.schema.json" file is "npm run package-schema"
 */
export interface Package {
    /**
     * Repository name from package.
     */
    name: string;

    /**
     * Current version from package.
     */
    version: string;

    /**
     * Title of application.
     */
    title: string;

    /**
     * General description of application.
     */
    description: string;

    /**
     * Code of license.
     * @example "MIT"
     */
    license: string;

    /**
     * Name of main author.
     */
    author: string;

    /**
     * Contact email.
     */
    email: string;

    /**
     * General configuration for application.
     */
    app: {
        /**
         * Path of builds, this is important for the construction of packages and artefacts.
         * @example "./dist"
         */
        dist: string;

        /**
         * Main host of application or service with port.
         * @example "localhost:3000"
         */
        host: string;

        /**
         * Port, default number
         * @type {number}
         * @TJS-type integer
         */
        port: number;

        /**
         * Description of the terms of the supplier service.
         */
        termsOfService: string;

        /**
         * Url with specific description of the license.
         */
        licenseUrl: string;

        /**
         * Typescript application program files.
         * This is for swagger documentation.
         * This is for gets the main files from general application or api.
         * @type {string}
         * @default ./src/modules/**\/*.ts
         */
        tsAppProgramFiles: string;

        /**
         * Section for external documentation related with the application.
         */
        externalDocs: {
            /**
             * Description external documentation.
             */
            description: string;
            /**
             * Url with external documentation.
             */
            url: string;
        },

        /**
         * Section for swagger documentation related with the application.
         */
        swaggerDocs: {
            /**
             * Description swagger documentation.
             */
            description: string;
            /**
             * Url with swagger documentation.
             */
            url: string;
        },
    };

    /**
     * scripts
     * @type {Object}
     * @memberof Package
     */
    scripts?: Object;

    /**
     * dependencies
     * @type {Object}
     * @memberof Package
     */
    dependencies?: Object;

    /**
     * devDependencies
     * @type {Object}
     * @memberof Package
     */
    devDependencies?: Object;
}
