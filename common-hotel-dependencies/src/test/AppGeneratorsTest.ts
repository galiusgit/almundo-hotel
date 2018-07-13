// ---- imports
import { suite, test } from 'mocha-typescript';
import { AppGenerators } from '../AppGenerators';
import { LoggerUtil } from '../shared-module/core/util/LoggerUtil';
import { Glob } from 'glob';
import * as fs from 'fs';
import * as assert from 'assert';

// ----------- requires
const globRegex = require('glob-to-regexp') as GlobToRegexFunction;

// ---- tyes
type GlobToRegexFunction = (str: string, options?: { extended: boolean }) => GlobToRegexpTest;
interface GlobToRegexpTest {
    test(caseValue: string): boolean;
}

const logger: LoggerUtil = new LoggerUtil('AppGeneratorsTest', __filename);

/**
 * AppGeneratorsTest
 * @export
 * @class AppGeneratorsTest
 */
@suite export class AppGeneratorsTest {
    /**
     * MAIN_PATH
     * @private
     * @static
     * @memberof AppGeneratorsTest
     */
    private static MAIN_PATH = './example-module';

    /**
     * Regex for search typescript file models from main application, valid cases.
     * @public
     * @memberof AppGeneratorsTest
     */
    @test('Regex for search typescript file models from main application, valid cases.')
    public regexForSearchTsFileModelsFromMainApplication() {
        const validPathModelCases = [
            AppGeneratorsTest.MAIN_PATH + '/folder/Caso1model.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Caso2Model.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Caso1Response.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Caso2Request.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Caso1response.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Caso2request.ts',
        ];
        const regexHelpper = globRegex(AppGeneratorsTest.MAIN_PATH + AppGenerators.REGEX_FOR_SEARCH_MODELS_APP, { extended: true });
        for (const indexModelCase in validPathModelCases) {
            if (validPathModelCases[indexModelCase]) {
                const modelCase = validPathModelCases[indexModelCase];
                if (!regexHelpper.test(modelCase)) {
                    assert.fail('The REGEX_FOR_SEARCH_MODELS_APP for the file model list cases should accept: ' + modelCase);
                }
            }
        }
    }

    /**
     * Regex for search typescript file models from main application, invalid cases.
     * @memberof AppGeneratorsTest
     */
    @test('Regex for search typescript file models from main application, invalid cases.')
    public regexForSearchTsFileModelsFromMainApplicationInvalidCases() {
        const invalidPathModelCases = [
            AppGeneratorsTest.MAIN_PATH + '/folder/Model.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/model.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Response.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/response.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Request.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/request.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/example1.ts',
            AppGeneratorsTest.MAIN_PATH + '/folder/Example.ts',
        ];
        const regexHelpper = globRegex(AppGeneratorsTest.MAIN_PATH + AppGenerators.REGEX_FOR_SEARCH_MODELS_APP, { extended: true });
        for (const indexModelCase2 in invalidPathModelCases) {
            if (invalidPathModelCases[indexModelCase2]) {
                const modelCase = invalidPathModelCases[indexModelCase2];
                if (regexHelpper.test(modelCase)) {
                    assert.fail('The REGEX_FOR_SEARCH_MODELS_APP is not valid for the file model list cases: ' + modelCase);
                }
            }
        }
    }

    /**
     * Gets the module list of main application.
     * @memberof AppGeneratorsTest
     */
    @test('Gets the module list of main application.')
    public getTheModuleListOfMainApplication(): void{
        const pattern1 = AppGeneratorsTest.MAIN_PATH + '/modules/*';

        const result = fs.readdirSync(pattern1);

        logger.log('---> pattern1: ', pattern1);
        logger.log('---> result: ', result);
        const pathModels = new Glob(pattern1, { mark: true, sync: true });
        if (pathModels.error) {
            logger.error('There was an error getting the the module list. ', pathModels.error);
            throw new Error(pathModels.error);
        }
        logger.log('---> pathModels.found: ', pathModels.found);
    }

}