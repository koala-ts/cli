import { describe, expect, test, vi } from 'vitest';
import { download } from '../../src/util/download';
import { Readable } from 'node:stream';

describe('Downloader util', () => {
    test('it should download a URL as a readable', async function () {
        global.fetch = vi.fn().mockResolvedValue({ body: new ReadableStream() });

        const result = await download('https://github.com/koala-ts');

        expect(result).toBeInstanceOf(Readable);
    });
});
