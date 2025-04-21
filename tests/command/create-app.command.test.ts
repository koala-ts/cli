import { mkdir } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { describe, expect, test, vi } from 'vitest';
import {
	action,
	description,
	signature,
} from '../../src/command/create-app.command';
import { download, extractTar } from '../../src/util';

vi.mock('node:fs/promises');
vi.mock('../../src/util/download');
vi.mock('../../src/util/extract');

describe('Create App Command', () => {
	test('Command signature', () => {
		expect(signature).toEqual('create <name>');
	});

	test('Command description', () => {
		expect(description).toEqual('Create a new KoalaTs app');
	});

	test('command action', async () => {
		const downloaded = new Readable();
		vi.mocked(download).mockResolvedValue(downloaded);

		await action('test-app');

		expect(mkdir).toHaveBeenCalledWith('test-app', {
			recursive: true,
		});
		expect(download).toHaveBeenCalledWith(
			'https://codeload.github.com/koala-ts/koala-ts/tar.gz/1.x',
		);
		expect(extractTar).toHaveBeenCalledWith(downloaded, './test-app');
	});

	test('failure action', async () => {
		vi.mocked(mkdir).mockRejectedValue(new Error('Failed to create directory'));

		await action('test-app');

		expect(mkdir).toHaveBeenCalledWith('test-app', {
			recursive: true,
		});
		expect(download).not.toHaveBeenCalled();
		expect(extractTar).not.toHaveBeenCalled();
	});
});
