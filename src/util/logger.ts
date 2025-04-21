import { gray, green, red, yellow } from 'yoctocolors';
import { ILogger } from '../types';

const logger: ILogger = {
    info: (...args: unknown[]) => console.log(green(args.join(' '))),
    warn: (...args: unknown[]) => console.warn(yellow(args.join(' '))),
    error: (...args: unknown[]) => console.error(red(args.join(' '))),
    debug: (...args: unknown[]) => console.debug(gray(args.join(' '))),
};

export const silentLogger: ILogger = {
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
    debug: () => undefined,
};

const exportedLogger = process.env.NODE_ENV === 'test' ? silentLogger : logger;

export default exportedLogger;
