import logger from '../util/logger';
import { download, extractTar } from '../util';
import { mkdir } from 'node:fs/promises';

export const signature = 'create <name>';
export const description = 'Create a new KoalaTs app';

export async function action(name: string) {
    try {
        await mkdir(name, { recursive: true });
        const tar = await download('https://codeload.github.com/koala-ts/koala-ts/tar.gz/1.x');
        await extractTar(tar, `./${name}`);

        logger.info(`✨ Your app has been successfully created in: ./${name}`);
        logger.info(`📂 Navigate to the project directory: "cd ${name}"`);
        logger.warn(`📦 Install dependencies: "npm install"`);
        logger.warn(`🚀 Start the application: "npm start"`);
    } catch (error) {
        logger.error('Error creating app:', error);
    }
}
