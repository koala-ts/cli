import { afterEach, describe, expect, test } from 'vitest';
import { action, copyDirectoryContents, createDir, description, signature } from '../src/command/create-app.command';
import { readdirSync, rmdirSync, unlinkSync } from 'node:fs';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

function removeDirectory(dirPath: string) {
    if (existsSync(dirPath)) {
        readdirSync(dirPath).forEach((file) => {
            const currentPath = join(dirPath, file);
            if (existsSync(currentPath)) {
                unlinkSync(currentPath);
            }
        });
        rmdirSync(dirPath);
    }
}

describe('Create App Command', () => {
    afterEach(() => {
        removeDirectory('test-app');
    });

    test('signature', () => {
        expect(signature).toBe('create <name>');
    });

    test('description', () => {
        expect(description).toBe('Create a new KoalaTs app');
    });

    test('action creates a new application', () => {
        action('test-app');

        expect(existsSync('test-app')).toBe(true);
        expect(readdirSync('test-app')).toEqual(readdirSync('stub'));
    });

    test('it fails if directory is not empty', () => {
        const name = 'test-app';
        const projectDir = join(process.cwd(), name);
        createDir(projectDir);
        const stubDir = join(dirname(fileURLToPath(import.meta.url)), '/../stub');
        copyDirectoryContents(stubDir, projectDir);

        expect(() => action('test-app')).toThrowError();
    });
});
