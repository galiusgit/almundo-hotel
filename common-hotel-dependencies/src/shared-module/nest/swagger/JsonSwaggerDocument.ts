import { SwaggerDocument } from '@nestjs/swagger/interfaces';

/**
 * JsonSwaggerDocument
 * @export
 * @interface JsonSwaggerDocument
 * @extends {SwaggerDocument}
 */
export interface JsonSwaggerDocument extends SwaggerDocument {
    consumes?: Array<string>;
    produces?: Array<string>;
    /**
     * The swagger version
     * @example '2.0'
     */
    swagger?: string;
}