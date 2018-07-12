// ---- imports
import { suite, test, slow, timeout } from 'mocha-typescript';
import { AppGenerators } from '../AppGenerators';
import { LoggerUtil } from '../shared-module/core/util/LoggerUtil';
import * as assert from 'assert';

// ----------- requires
const globRegex = require('glob-to-regexp') as GlobToRegexFunction;

// ---- tyes
type GlobToRegexFunction = (str: string, options?: { extended: boolean }) => GlobToRegexpTest;
interface GlobToRegexpTest {
    test(caseValue: string): boolean;
}

const logger: LoggerUtil = new LoggerUtil('AppGeneratorsTest', __filename);

const timeout_test = 3000;
const slow_test = 1000;

/**
 * AppGeneratorsTest
 * @export
 * @class AppGeneratorsTest
 */
@suite(timeout(timeout_test), slow(slow_test))
export class AppGeneratorsTest {
    /**
     * MAIN_PATH
     * @private
     * @static
     * @memberof AppGeneratorsTest
     */
    private static MAIN_PATH = './src/test/example-module';

    /**
     * App generators test.
     * @private
     * @type {AppGenerators}
     * @memberof AppGeneratorsTest
     */
    private appGeneratorsTest: AppGenerators;

    /**
     * Creates an instance of AppGeneratorsTest.
     * @memberof AppGeneratorsTest
     */
    constructor(){
        this.appGeneratorsTest = new AppGenerators(AppGeneratorsTest.MAIN_PATH);
    }

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
        const expectedListDirectories: Array<string> = [
            'src\\test\\example-module\\modules\\example',
            'src\\test\\example-module\\modules\\otro',
        ];
        const listDirectoriesResult = this.appGeneratorsTest.getModuleDirectories();
        logger.info('module list expected: ', expectedListDirectories);
        logger.info('module list result: ', listDirectoriesResult);
        for (const expectedDirectoryIndex in expectedListDirectories){
            if (expectedListDirectories[expectedDirectoryIndex]) {
                const expectedDirectory = expectedListDirectories[expectedDirectoryIndex];
                if (listDirectoriesResult.indexOf(expectedDirectory) < 0){
                    assert.fail('The directory of module: ' + expectedDirectory + ', was not found.');
                }
            }
        }
    }

}