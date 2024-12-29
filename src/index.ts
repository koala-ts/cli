#!/usr/bin/env node
import { Command as Program } from 'commander';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as process from 'node:process';
import meta from '../package.json';
import { IProgram } from './types';

const program: IProgram = new Program();

program
    .name('KoalaTs CLI')
    .description('KoalaTs CLI is a command line interface for KoalaTs')
    .version(meta.version);

const rootDir = dirname(fileURLToPath(import.meta.url));
const commandFiles: string[] = readdirSync(`${rootDir}/command`);
const commands = commandFiles.filter(file => file.endsWith('.command.js') || file.endsWith('.command.ts'));

for (const command of commands) {
    const commandModule = await import(`./command/${command}`);
    const commandFn = commandModule.default;
    commandFn(program);
}

program.parse(process.argv);
