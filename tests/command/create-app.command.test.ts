import { describe, expect, test, vi } from 'vitest';
import { action, description, signature } from '../../src/command/create-app.command';
import { mkdir } from 'node:fs/promises';
import { download, extractTar } from '../../src/util';
import { Readable } from 'node:stream';

vi.mock('node:fs/promises');
vi.mock('../../src/util/download');
vi.mock('../../src/util/extract');

describe('Create App Command', function () {
    test('Command signature', function () {
        expect(signature).toEqual('create <name>');
    });

    test('Command description', function () {
        expect(description).toEqual('Create a new KoalaTs app');
    });

    test('command action', async function () {
        const downloaded = new Readable();
        vi.mocked(download).mockResolvedValue(downloaded);

        await action('test-app');

        expect(mkdir).toHaveBeenCalledWith('test-app', { recursive: true });
        expect(download).toHaveBeenCalledWith('https://codeload.github.com/koala-ts/koala-ts/tar.gz/1.x');
        expect(extractTar).toHaveBeenCalledWith(downloaded, './test-app');
    });

    test('failure action', async function () {
        vi.mocked(mkdir).mockRejectedValue(new Error('Failed to create directory'));

        await action('test-app');

        expect(mkdir).toHaveBeenCalledWith('test-app', { recursive: true });
        expect(download).not.toHaveBeenCalled();
        expect(extractTar).not.toHaveBeenCalled();
    });
});
