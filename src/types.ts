import type { Command } from 'commander';

export interface IProgram extends Command {}

export interface ILogger {
	info: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
	debug: (...args: unknown[]) => void;
}
