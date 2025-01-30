import simpleGit from 'simple-git';
import logger from '../util/logger';

export const signature = 'create <name>';
export const description = 'Create a new KoalaTs app';

export async function action(name: string) {
  const git = simpleGit();

  try {
    await git.clone('https://github.com/koala-ts/koala-ts.git', `./${name}`);
    logger.info(`✨ Your app has been successfully created in: ./${name}`);
    logger.info(`📂 Navigate to the project directory: "cd ${name}"`);
    logger.warn(`📦 Install dependencies: "npm install"`);
    logger.warn(`🚀 Start the application: "npm start"`);
  } catch (error) {
    logger.error('Failed to clone the repository:', error);
  }
}
