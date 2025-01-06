import { dirname, join } from 'path';
import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import logger from '../util/logger';

export const signature = 'create <name>';

export const description = 'Create a new KoalaTs app';

export function action(name: string) {
    const projectDir = join(process.cwd(), name);
    createDir(projectDir);

    const stubDir = join(dirname(fileURLToPath(import.meta.url)), '/../../stub');
    copyDirectoryContents(stubDir, projectDir);
    addGitIgnore(projectDir);

    logger.info(`✨ Your app has been successfully created in: ./${name}`);
    logger.info(`📂 Navigate to the project directory: "cd ${name}"`);

    logger.warn(`📦 Install dependencies: "npm install"`);
    logger.warn(`🚀 Start the application: "npm start"`);
}

export function createDir(dirPath: string): void {
    if (!isEmptyDir(dirPath)) {
        throw new Error('Directory "' + dirPath + '" is not empty');
    }

    mkdirSync(dirPath, { recursive: true });
}

function isEmptyDir(dirPath: string): boolean {
    if (!existsSync(dirPath)) {
        return true;
    }

    const files = readdirSync(dirPath);
    return files.length === 0;
}

export function copyDirectoryContents(srcDir: string, destDir: string) {
    if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
    }

    const files = readdirSync(srcDir);
    files.forEach(file => {
        const srcFile = join(srcDir, file);
        const destFile = join(destDir, file);

        if (lstatSync(srcFile).isDirectory()) {
            copyDirectoryContents(srcFile, destFile);
        } else {
            copyFileSync(srcFile, destFile);
        }
    });
}

function addGitIgnore(projectDir: string) {
    const gitIgnorePath = join(projectDir, '.gitignore');
    const gitIgnoreContent = `
node_modules/
coverage/
dist/
    `;
    writeFileSync(gitIgnorePath, gitIgnoreContent);
}
