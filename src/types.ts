import { Command } from 'commander';

export interface IProgram extends Command {
}

export interface ILogger {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
}
