import { describe, expect, test, vi } from 'vitest';
import { gray, green, red, yellow } from 'yoctocolors';
import { colorFormat, createLogger } from '../../src/util/logger';

describe('Logger', () => {
	describe('Color formatting', () => {
		test('info is green', () => {
			const actual = colorFormat('info', 'test');

			expect(actual).toBe(green('test'));
		});

		test('warn is yellow', () => {
			const actual = colorFormat('warn', 'test');

			expect(actual).toBe(yellow('test'));
		});

		test('error is red', () => {
			const actual = colorFormat('error', 'test');

			expect(actual).toBe(red('test'));
		});

		test('debug is gray', () => {
			const actual = colorFormat('debug', 'test');

			expect(actual).toBe(gray('test'));
		});
	});

	describe('Create logger helper', () => {
		test('it should return a silent logger in test mode', () => {
			const logger = createLogger('info', console.log, 'test');
			const actual = logger('test');

			expect(actual).toBe(undefined);
		});

		test('it should return a colored logger in default mode', () => {
			const logFunction = vi.fn();
			const logger = createLogger('info', logFunction, 'default');

			const actual = logger('test');

			expect(logFunction).toHaveBeenCalledWith(green('test'));
		});
	});
});
