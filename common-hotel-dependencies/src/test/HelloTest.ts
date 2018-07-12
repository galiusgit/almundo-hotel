import { suite, test } from 'mocha-typescript';
import * as assert from 'assert';

/**
 * HelloTest
 * @export
 * @class HelloTest
 */
@suite export class HelloTest {

    /**
     * world
     * @protected
     * @memberof HelloTest
     */
    @test protected world() {
        const compareTwo = 2;
        const two = 2;
        assert.equal(compareTwo, two, 'Expected one to equal two.');
    }
}