import { NestFactory } from '@nestjs/core';
import { JsonSwaggerDocument } from './JsonSwaggerDocument';
import { SwaggerConfig } from './SwaggerConfig';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerUtil } from '../../core/util/LoggerUtil';
import * as TJS from 'typescript-json-schema';
import * as fs from 'fs';

/**
 * The SwaggerResponse
 * @interface SwaggerResponse
 * @extends {Object}
 */
interface SwaggerResponse extends Object {
    type: string;
    isArray: boolean;
    schema: {
        type: string;
        $ref: string;
        items: {
            type?: string;
            $ref?: string;
        };
    };
}

/**
 * The SwaggerHttpMehods
 * @interface SwaggerHttpMehods
 * @extends {Object}
 */
interface SwaggerHttpMehods extends Object {
    responses: Object;
    summary: string;
    description: string;
    operationId: string;
    produces: string[];
    consumes: string[];
}

let swaggerGenerator: SwaggerGenerator;

/**
 * The class SwaggerGenerator
 * @export
 * @class SwaggerGenerator
 */
export class SwaggerGenerator {

    /**
     * STRINGFY_SPACE
     * @private
     * @static
     * @memberof SwaggerGenerator
     */
    private static STRINGFY_SPACE = 2;

    /**
     * logger
     * @private
     * @type {LoggerUtil}
     * @memberof SwaggerGenerator
     */
    private logger: LoggerUtil = new LoggerUtil('SwaggerGenerator', __filename);

    /**
     * Optionally pass argument to schema generator
     * @private
     * @type {TJS.PartialArgs}
     * @memberof SwaggerGenerator
     */
    private settings: TJS.PartialArgs = {
        required: true,
    };
    /**
     * Optionally pass ts compiler options
     * @private
     * @type {TJS.CompilerOptions}
     * @memberof SwaggerGenerator
     */
    private compilerOptions: TJS.CompilerOptions = {
        strictNullChecks: true,
    };

    /**
     * The swagger configuration.
     */
    private swaggerConfig: SwaggerConfig;

    /**
     * Swagger generator for Nest Application
     * @param nestApplicationModule {Object} complext object wit the server application
     * @param pathModels {Array<string>}
     */
    constructor(
        nestApplicationModule: any,
        swaggerConfig: SwaggerConfig) {
        // ----
        swaggerGenerator = this;
        this.logger.info('Init generator for: ', swaggerConfig.info.title);
        // ----
        this.swaggerConfig = swaggerConfig;
        // config the typescript (ts) list files to generates the json schema models.
        const tsProgram = TJS.getProgramFromFiles(this.swaggerConfig.pathModels, this.compilerOptions);
        // We can either get the schema for one file and one type...
        // const schema = TJS.generateSchema(program, 'Shape', settings);
        // ... or a generator that lets us incrementally get more schemas
        const jsonSchemaGenerator = TJS.buildGenerator(tsProgram, this.settings);
        // init the json schemas from assigned models
        this.buildSchemas(nestApplicationModule, tsProgram, jsonSchemaGenerator);
        this.writeJsonSchemaFileModels(tsProgram, jsonSchemaGenerator);
    }
    /**
     * Gets the swagger configuration
     */
    public getSwaggerConfig(): SwaggerConfig {
        return this.swaggerConfig;
    }

    /**
     * Builds the json schema by Ts program files.
     * @param nestApplicationModule nestApplicationModule {Object} complext object wit the server application
     * @param tsProgram {Program} - typescript program configuration by model files.
     * @param jsonSchemaGenerator {JsonSchemaGenerator}
     */
    private async buildSchemas(nestApplicationModule: any, tsProgram, jsonSchemaGenerator: TJS.JsonSchemaGenerator) {
        const app = await NestFactory.create(nestApplicationModule);
        const swaggerDocument: JsonSwaggerDocument = SwaggerModule.createDocument(app, this.swaggerConfig);
        // ---
        this.validatesCompleteSwaggerDocument(swaggerDocument);
        // ---
        if (swaggerDocument.definitions == null) {
            const mainFiles = jsonSchemaGenerator.getMainFileSymbols(tsProgram);
            const mainDefinition = jsonSchemaGenerator.getSchemaForSymbols(mainFiles);
            if (mainDefinition.definitions == null) {
                swaggerDocument.definitions = {};
            } else {
                swaggerDocument.definitions = mainDefinition.definitions;
            }
        }
        // ---
        this.updateSwaggerDocumentWithModels(swaggerDocument);
        // ---
        this.writeSwaggerJsonSchemaFile(swaggerDocument);
    }

    /**
     * Validates and complete the swagger document.
     * @param swaggerDocument {JsonSwaggerDocument}
     */
    private validatesCompleteSwaggerDocument(swaggerDocument: JsonSwaggerDocument): void {
        if (swaggerDocument == null) {
            throw new Error('Fail reading the initial swagger file.');
        }
        swaggerDocument.consumes = [
            'application/json',
        ];
        swaggerDocument.produces = [
            'application/json',
        ];
        swaggerDocument.swagger = '2.0';
    }

    /**
     * Writes swagger the json schema file.
     * @param swaggerDocument {JsonSwaggerDocument}
     */
    private writeSwaggerJsonSchemaFile(swaggerDocument: JsonSwaggerDocument): void {
        fs.writeFile(this.swaggerConfig.jsonSwaggerFileDestination, JSON.stringify(swaggerDocument, null, SwaggerGenerator.STRINGFY_SPACE), 'utf8',
            function callback(err) {
                if (err) {
                    swaggerGenerator.logger.error('Fail writing the json schemas (definitions) to swagger config file: ', err.message);
                    throw err;
                } else {
                    swaggerGenerator.logger.info('The swagger json file with the schema models is created successfully:',
                        swaggerGenerator.swaggerConfig.jsonSwaggerFileDestination);
                }
            });
    }

    /**
     * Updates the swagger document with new json schema models.
     * @param swaggerDocument {Object - JSON}
     */
    private updateSwaggerDocumentWithModels(swaggerDocument: JsonSwaggerDocument): JsonSwaggerDocument {
        for (const httpMehodsKey in swaggerDocument.paths) {
            if (swaggerDocument.paths[httpMehodsKey]) {
                const httpMehods = swaggerDocument.paths[httpMehodsKey] as Object;
                if (!httpMehods) {
                    continue;
                }
                for (const methodKey in httpMehods) {
                    // TODO: es necesario mapear los requests
                    // responses mapper
                    if (httpMehods[methodKey] && httpMehods[methodKey].hasOwnProperty('responses')) {
                        const httpMehod = httpMehods[methodKey] as SwaggerHttpMehods;
                        for (const responseKey in httpMehod.responses) {
                            // loop responses
                            if (httpMehods[methodKey].responses) {
                                const response = httpMehods[methodKey].responses[responseKey] as SwaggerResponse;
                                if (response && response.hasOwnProperty('type')) {
                                    const typeSysmbol: string = response.type;
                                    if (swaggerDocument.definitions.hasOwnProperty(typeSysmbol)) {
                                        if (response.isArray) {
                                            response.schema.type = 'array';
                                            response.schema.items = {};
                                            response.schema.items.type = typeSysmbol;
                                            response.schema.items.$ref = '#/definitions/' + typeSysmbol;
                                        } else {
                                            response.schema.$ref = '#/definitions/' + typeSysmbol;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return swaggerDocument;
    }

    /**
     * Writes the json schema result file models
     * @param tsProgram {Program} - typescript program configuration by model files.
     * @param jsonSchemaGenerator {JsonSchemaGenerator}
     */
    private writeJsonSchemaFileModels(tsProgram, jsonSchemaGenerator: TJS.JsonSchemaGenerator): void {
        const allSymbols = jsonSchemaGenerator.getMainFileSymbols(tsProgram);
        const allJsonSchemaDocument = jsonSchemaGenerator.getSchemaForSymbols(allSymbols);
        fs.writeFile(this.swaggerConfig.jsonShemaDefinitionsDestination,
            JSON.stringify(allJsonSchemaDocument, null, SwaggerGenerator.STRINGFY_SPACE), 'utf8', function callback(err) {
                if (err) {
                    swaggerGenerator.logger.error('Fail writing all json schemas definitions: ', err.message);
                    throw err;
                } else {
                    swaggerGenerator.logger.info('The json file with the schema models is created successfully:',
                        swaggerGenerator.swaggerConfig.jsonShemaDefinitionsDestination);
                }
            });
    }
    // ---

}