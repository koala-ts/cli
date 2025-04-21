import type { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import * as tar from 'tar';

export async function extractTar(src: Readable, cwd: string): Promise<void> {
	await pipeline(
		src,
		tar.extract({
			cwd: cwd,
			strip: 1,
		}),
	);
}
