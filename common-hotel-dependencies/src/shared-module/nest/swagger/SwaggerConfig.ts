import { SwaggerBaseConfig } from '@nestjs/swagger/interfaces';

/**
 * SwaggerConfig
 * @export
 * @interface SwaggerConfig
 * @extends {SwaggerBaseConfig}
 */
export interface SwaggerConfig extends SwaggerBaseConfig{
    /**
     * Array path models from application.
     * @example ['./src/modules/employees/model/employes.model.employe.ts']
     */
    pathModels: Array<string>;
    /**
     * The json swagger file destination.
     * @example 'dist/swagger.json'
     */
    jsonSwaggerFileDestination: string;
    /**
     * The json shema definitions destination.
     * @example 'dist/json-shema-definitions.json'
     */
    jsonShemaDefinitionsDestination: string;
}