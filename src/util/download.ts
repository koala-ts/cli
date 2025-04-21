import { Readable } from 'node:stream';
import type streamWeb from 'node:stream/web';

export async function download(url: string): Promise<Readable> {
	const response = (await fetch(url)) as {
		body: streamWeb.ReadableStream;
	};

	return Readable.fromWeb(response.body);
}
