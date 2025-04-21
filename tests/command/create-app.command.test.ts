import { describe, expect, test, vi } from 'vitest';
import { action, description, signature } from '../../src/command/create-app.command';
import { mkdir } from 'node:fs/promises';
import { download, extractTar } from '../../src/util';

vi.mock('node:fs/promises', () => ({
    mkdir: vi.fn(),
}));

vi.mock('../../src/util/download', () => ({
    download: vi.fn().mockResolvedValue('mock-tarball'),
}));

vi.mock('../../src/util/extract', () => ({
    extractTar: vi.fn(),
}));

describe('Create App Command', function () {
    test('Command signature', function () {
        expect(signature).toEqual('create <name>');
    });

    test('Command description', function () {
        expect(description).toEqual('Create a new KoalaTs app');
    });

    test('command action', async function () {
        await action('test-app');

        expect(mkdir).toHaveBeenCalledWith('test-app', { recursive: true });
        expect(download).toHaveBeenCalledWith('https://codeload.github.com/koala-ts/koala-ts/tar.gz/1.x');
        expect(extractTar).toHaveBeenCalledWith('mock-tarball', './test-app');
    });
});
