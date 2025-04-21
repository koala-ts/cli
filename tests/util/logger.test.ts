import { describe, expect, test, vi } from 'vitest';
import { colorFormat, createLogger } from '../../src/util';
import { gray, green, red, yellow } from 'yoctocolors';

describe('Logger', function () {
    describe('Color formatting', function () {
        test('info is green', function () {
            const actual = colorFormat('info', 'test');

            expect(actual).toBe(green('test'));
        });

        test('warn is yellow', function () {
            const actual = colorFormat('warn', 'test');

            expect(actual).toBe(yellow('test'));
        });

        test('error is red', function () {
            const actual = colorFormat('error', 'test');

            expect(actual).toBe(red('test'));
        });

        test('debug is gray', function () {
            const actual = colorFormat('debug', 'test');

            expect(actual).toBe(gray('test'));
        });
    });

    describe('Create logger helper', function () {
        test('it should return a silent logger in test mode', function () {
            const logger = createLogger('info', console.log, 'test');
            const actual = logger('test');

            expect(actual).toBe(undefined);
        });

        test('it should return a colored logger in default mode', function () {
            const logFunction = vi.fn();
            const logger = createLogger('info', logFunction, 'default');

            const actual = logger('test');

            expect(logFunction).toHaveBeenCalledWith(green('test'));
        });
    });
});
