#!/usr/bin/env node
import { Command } from 'commander';
import { createApp } from './command/create-app.command';

const program = new Command();

program
    .name('KoalaTs CLI')
    .description('KoalaTs CLI is a command line interface for KoalaTs')
    .version('1.0.0');

program
    .command('create <name>')
    .description('Create a new KoalaTs app')
    .action(createApp);


program.parse(process.argv);
