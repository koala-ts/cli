import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import * as tar from 'tar';
import { describe, expect, test, vi } from 'vitest';
import { extractTar } from '../../src/util/extract';

vi.mock('node:stream/promises', () => ({
	pipeline: vi.fn(),
}));

vi.mock('tar', () => ({
	extract: vi.fn((options) => options),
}));

describe('Describe util', () => {
	test('it should extract the tarball into the specified directory', async () => {
		const mockReadable = new Readable();
		const mockCwd = '/mock/destination';

		await extractTar(mockReadable, mockCwd);

		expect(pipeline).toHaveBeenCalledWith(
			mockReadable,
			expect.objectContaining({
				cwd: mockCwd,
				strip: 1,
			}),
		);
		expect(tar.extract).toHaveBeenCalledWith({
			cwd: mockCwd,
			strip: 1,
		});
	});
});
